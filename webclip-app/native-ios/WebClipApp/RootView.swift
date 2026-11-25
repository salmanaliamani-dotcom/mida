import SwiftUI
import WebKit

/// Hosts the web app (same UI as the Web Clip) full-screen, and presents tool pages natively.
struct RootView: View {
    @EnvironmentObject var model: AppModel
    @State private var failed = false

    var body: some View {
        ZStack {
            Color(red: 3/255, green: 8/255, blue: 6/255).ignoresSafeArea()
            MainWebView(model: model, failed: $failed).ignoresSafeArea()
            if failed {
                ConnectionErrorView(offline: !model.isOnline) {
                    failed = false
                    model.mainWebView?.load(URLRequest(url: AppConfig.appURL))
                }
            }
        }
        .fullScreenCover(item: $model.presented) { page in
            BrowserView(page: page).environmentObject(model)
        }
    }
}

struct MainWebView: UIViewRepresentable {
    let model: AppModel
    @Binding var failed: Bool

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    func makeUIView(context: Context) -> WKWebView {
        let config = model.makeConfiguration()
        config.userContentController.add(model, name: AppConfig.messageHandler)
        let web = WKWebView(frame: .zero, configuration: config)
        web.isOpaque = false
        web.backgroundColor = .black
        web.scrollView.backgroundColor = .black
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.scrollView.bounces = false
        web.allowsBackForwardNavigationGestures = false
        web.navigationDelegate = context.coordinator
        web.uiDelegate = context.coordinator
        model.mainWebView = web
        web.load(URLRequest(url: AppConfig.appURL))
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
        let parent: MainWebView
        init(_ p: MainWebView) { parent = p }

        // Links to other hosts never replace the app shell: they open in the in-app browser.
        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if let url = action.request.url, action.targetFrame?.isMainFrame == true,
               let host = url.host, host != AppConfig.appHost, ["http", "https"].contains(url.scheme) {
                decisionHandler(.cancel)
                Task { @MainActor in
                    parent.model.presented = ToolPage(id: url.absoluteString, url: url, title: host, icon: nil, favorite: false)
                }
                return
            }
            decisionHandler(.allow)
        }

        // window.open / target=_blank
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                     for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if let url = action.request.url {
                Task { @MainActor in
                    parent.model.presented = ToolPage(id: url.absoluteString, url: url, title: url.host ?? "", icon: nil, favorite: false)
                }
            }
            return nil
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation n: WKNavigation!, withError error: Error) {
            Task { @MainActor in parent.failed = true }
        }
    }
}

struct ConnectionErrorView: View {
    let offline: Bool
    let retry: () -> Void

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: offline ? "wifi.slash" : "exclamationmark.triangle")
                .font(.system(size: 40, weight: .semibold))
                .foregroundStyle(Theme.green)
                .frame(width: 84, height: 84)
                .background(Circle().fill(Theme.green.opacity(0.12)))
                .shadow(color: Theme.green.opacity(0.35), radius: 24)
            Text(offline ? "لا يوجد اتصال بالإنترنت" : "تعذّر فتح الصفحة").font(.title3.bold())
            Text("تحقق من الاتصال ثم أعد المحاولة.").foregroundStyle(.secondary)
            Button("إعادة المحاولة", action: retry)
                .buttonStyle(.borderedProminent).tint(Theme.green).foregroundStyle(.black)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Theme.bg.ignoresSafeArea())
        .environment(\.layoutDirection, .rightToLeft)
    }
}

enum Theme {
    static let bg = Color(red: 3/255, green: 8/255, blue: 6/255)
    static let bar = Color(red: 7/255, green: 19/255, blue: 13/255)
    static let green = Color(red: 34/255, green: 224/255, blue: 122/255)
}
