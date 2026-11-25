import Foundation

/// Native wrapper settings. APP_URL must match APP_URL in config.json.
enum AppConfig {
    static let appURL = URL(string: "https://YOUR-DOMAIN.com/app/")!
    /// Hosts that stay inside the main app web view; everything else opens in the in-app browser.
    static var appHost: String { appURL.host ?? "" }
    static let messageHandler = "webclip"
}
