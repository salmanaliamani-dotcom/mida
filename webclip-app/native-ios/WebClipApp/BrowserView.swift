import SwiftUI
import WebKit

/// Native in-app browser (WKWebView) used for every tool. Mirrors the web app's browser:
/// close · title · favorite / progress / back · forward · home · reload · share.
struct BrowserView: View {
    @EnvironmentObject var model: AppModel
    @Environment(\.dismiss) private var dismiss
    let page: ToolPage
    @StateObject private var state = BrowserState()

    var body: some View {
        VStack(spacing: 0) {
            // Top bar
            HStack(spacing: 12) {
                circleButton("xmark") { dismiss() }
                Spacer(minLength: 0)
                VStack(spacing: 1) {
                    Text(state.title.isEmpty ? page.title : state.title).font(.subheadline.bold()).lineLimit(1)
                    Text(state.host ?? page.url.host ?? "").font(.caption2).foregroundStyle(.secondary).lineLimit(1)
                }
                Spacer(minLength: 0)
                circleButton((model.presented?.favorite ?? page.favorite) ? "heart.fill" : "heart",
                             tint: (model.presented?.favorite ?? false) ? Theme.green : .white) { model.toggleFavorite() }
            }
            .padding(.horizontal, 12).padding(.vertical, 8)
            .background(Theme.bar)

            // Progress
            GeometryReader { g in
                Rectangle().fill(Theme.green)
                    .frame(width: g.size.width * state.progress)
                    .shadow(color: Theme.green, radius: 4)
                    .opacity(state.isLoading ? 1 : 0)
                    .animation(.easeOut(duration: 0.25), value: state.progress)
            }
            .frame(height: 2)

            ZStack {
                ToolWebView(url: page.url, state: state, configuration: model.makeConfiguration())
                if state.isLoading && state.progress < 0.35 { loadingOverlay.transition(.opacity) }
                if let error = state.error {
                    ConnectionErrorView(offline: !model.isOnline) { state.webView?.reload(); state.error = nil }
                        .overlay(alignment: .bottom) { Text(error).font(.footnote).foregroundStyle(.secondary).padding() }
                }
            }
            .animation(.easeInOut(duration: 0.3), value: state.isLoading)

            // Bottom toolbar
            HStack {
                barButton("chevron.right", enabled: state.canGoBack) { state.webView?.goBack() }    // RTL: back points right
                barButton("chevron.left", enabled: state.canGoForward) { state.webView?.goForward() }
                barButton("house") { dismiss() }
                barButton("arrow.clockwise") { state.error = nil; state.webView?.reload() }
                if let current = state.webView?.url ?? Optional(page.url) {
                    ShareLink(item: current) { Image(systemName: "square.and.arrow.up").frame(maxWidth: .infinity, minHeight: 44) }
                }
            }
            .font(.system(size: 19, weight: .semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 8).padding(.top, 6)
            .background(Theme.bar.ignoresSafeArea(edges: .bottom))
        }
        .background(Theme.bg.ignoresSafeArea())
        .environment(\.layoutDirection, .rightToLeft)
    }

    private var loadingOverlay: some View {
        VStack(spacing: 14) {
            ZStack {
                AsyncImage(url: page.icon) { $0.resizable().scaledToFill() } placeholder: { Theme.green.opacity(0.25) }
                    .frame(width: 52, height: 52).clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                ProgressView().controlSize(.large).tint(Theme.green).scaleEffect(1.6).opacity(0.9)
            }
            .frame(width: 90, height: 90)
            Text("جارٍ التحميل…").font(.footnote).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Theme.bg)
    }

    private func circleButton(_ icon: String, tint: Color = .white, action: @escaping () -> Void) -> some View {
        Button { Haptics.play("light"); action() } label: {
            Image(systemName: icon).font(.system(size: 15, weight: .bold)).foregroundStyle(tint)
                .frame(width: 36, height: 36).background(Circle().fill(.white.opacity(0.08)))
        }
    }

    private func barButton(_ icon: String, enabled: Bool = true, action: @escaping () -> Void) -> some View {
        Button { Haptics.play("light"); action() } label: {
            Image(systemName: icon).frame(maxWidth: .infinity, minHeight: 44)
        }
        .disabled(!enabled).opacity(enabled ? 1 : 0.3)
    }
}

@MainActor
final class BrowserState: ObservableObject {
    @Published var progress: Double = 0
    @Published var isLoading = true
    @Published var canGoBack = false
    @Published var canGoForward = false
    @Published var title = ""
    @Published var host: String?
    @Published var error: String?
    weak var webView: WKWebView?
    var observers: [NSKeyValueObservation] = []
}

struct ToolWebView: UIViewRepresentable {
    let url: URL
    @ObservedObject var state: BrowserState
    let configuration: WKWebViewConfiguration

    func makeCoordinator() -> Coordinator { Coordinator(state: state) }

    func makeUIView(context: Context) -> WKWebView {
        let web = WKWebView(frame: .zero, configuration: configuration)
        web.allowsBackForwardNavigationGestures = true
        web.navigationDelegate = context.coordinator
        web.uiDelegate = context.coordinator
        web.isOpaque = false
        web.backgroundColor = UIColor(Theme.bg)
        state.webView = web
        state.observers = [
            web.observe(\.estimatedProgress) { [weak state] w, _ in Task { @MainActor in state?.progress = w.estimatedProgress } },
            web.observe(\.isLoading) { [weak state] w, _ in Task { @MainActor in state?.isLoading = w.isLoading } },
            web.observe(\.canGoBack) { [weak state] w, _ in Task { @MainActor in state?.canGoBack = w.canGoBack } },
            web.observe(\.canGoForward) { [weak state] w, _ in Task { @MainActor in state?.canGoForward = w.canGoForward } },
            web.observe(\.title) { [weak state] w, _ in Task { @MainActor in state?.title = w.title ?? "" } },
            web.observe(\.url) { [weak state] w, _ in Task { @MainActor in state?.host = w.url?.host } },
        ]
        web.load(URLRequest(url: url))
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
        let state: BrowserState
        init(state: BrowserState) { self.state = state }

        func webView(_ w: WKWebView, didFailProvisionalNavigation n: WKNavigation!, withError e: Error) { fail(e) }
        func webView(_ w: WKWebView, didFail n: WKNavigation!, withError e: Error) { fail(e) }
        func webView(_ w: WKWebView, didStartProvisionalNavigation n: WKNavigation!) { Task { @MainActor in state.error = nil } }

        private func fail(_ e: Error) {
            let ns = e as NSError
            if ns.code == NSURLErrorCancelled { return }
            Task { @MainActor in state.error = ns.localizedDescription }
        }

        // target=_blank links load in the same in-app browser instead of leaving the app.
        func webView(_ w: WKWebView, createWebViewWith c: WKWebViewConfiguration, for a: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if a.targetFrame == nil { w.load(a.request) }
            return nil
        }

        // tel:, mailto:, App Store links etc. are handed to iOS.
        func webView(_ w: WKWebView, decidePolicyFor a: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if let url = a.request.url, let scheme = url.scheme?.lowercased(), !["http", "https", "about", "data", "blob"].contains(scheme) {
                UIApplication.shared.open(url)
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.allow)
        }
    }
}
