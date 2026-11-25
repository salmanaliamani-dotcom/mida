import SwiftUI
import WebKit
import Network

@main
struct WebClipApp: App {
    @StateObject private var model = AppModel()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(model)
                .preferredColorScheme(.dark)
        }
    }
}

/// A tool page opened from the web app through the JS bridge.
struct ToolPage: Identifiable, Equatable {
    let id: String
    let url: URL
    let title: String
    let icon: URL?
    var favorite: Bool
}

@MainActor
final class AppModel: NSObject, ObservableObject, WKScriptMessageHandler {
    @Published var presented: ToolPage?
    @Published var isOnline = true

    /// Shared persistent data store → cookies & sessions survive between launches and are shared
    /// between the app shell and every tool page.
    let dataStore = WKWebsiteDataStore.default()
    weak var mainWebView: WKWebView?
    private let monitor = NWPathMonitor()

    override init() {
        super.init()
        monitor.pathUpdateHandler = { [weak self] path in
            Task { @MainActor in self?.isOnline = path.status == .satisfied }
        }
        monitor.start(queue: DispatchQueue(label: "net.monitor"))
    }

    func makeConfiguration() -> WKWebViewConfiguration {
        let c = WKWebViewConfiguration()
        c.websiteDataStore = dataStore
        c.allowsInlineMediaPlayback = true
        c.defaultWebpagePreferences.allowsContentJavaScript = true
        return c
    }

    // MARK: JS bridge  (window.webkit.messageHandlers.webclip.postMessage({...}))
    nonisolated func userContentController(_ ucc: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any], let action = body["action"] as? String else { return }
        Task { @MainActor in self.handle(action: action, body: body) }
    }

    private func handle(action: String, body: [String: Any]) {
        switch action {
        case "open":
            guard let s = body["url"] as? String, let url = URL(string: s) else { return }
            presented = ToolPage(
                id: body["id"] as? String ?? s,
                url: url,
                title: body["title"] as? String ?? "",
                icon: (body["icon"] as? String).flatMap(URL.init(string:)),
                favorite: body["favorite"] as? Bool ?? false
            )
        case "external":
            // Opens the page in a new in-app browser too — never leaves the app for Safari.
            guard let s = body["url"] as? String, let url = URL(string: s) else { return }
            presented = ToolPage(id: s, url: url, title: url.host ?? "", icon: nil, favorite: false)
        case "haptic":
            Haptics.play(body["style"] as? String ?? "light")
        default:
            break
        }
    }

    func toggleFavorite() {
        guard var page = presented else { return }
        let id = page.id.replacingOccurrences(of: "'", with: "\\'")
        mainWebView?.evaluateJavaScript("window.WebClipApp && WebClipApp.toggleFavorite('\(id)')")
        page.favorite.toggle()
        presented = page
        Haptics.play("medium")
    }
}

enum Haptics {
    static func play(_ style: String) {
        let s: UIImpactFeedbackGenerator.FeedbackStyle = style == "heavy" ? .heavy : style == "medium" ? .medium : .light
        let g = UIImpactFeedbackGenerator(style: s)
        g.prepare()
        g.impactOccurred()
    }
}
