<?php
/**
 * Shared helpers: config loading + Apple Configuration Profile (Web Clip) generation.
 * Used by profile.php (download endpoint) and frame-check.php.
 */

declare(strict_types=1);

const WEBCLIP_ROOT = __DIR__ . '/..';

function webclip_config(): array
{
    static $cfg = null;
    if ($cfg !== null) {
        return $cfg;
    }
    $raw = @file_get_contents(WEBCLIP_ROOT . '/config.json');
    if ($raw === false) {
        throw new RuntimeException('config.json not found');
    }
    $cfg = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    $cfg['APP_URL'] = webclip_resolve_app_url($cfg['APP_URL'] ?? '');
    return $cfg;
}

/**
 * While APP_URL still contains the "YOUR-DOMAIN" placeholder, derive it from the
 * current request so the project works immediately after upload.
 */
function webclip_resolve_app_url(string $url): string
{
    if ($url !== '' && stripos($url, 'YOUR-DOMAIN') === false) {
        return $url;
    }
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $host = preg_replace('/[^A-Za-z0-9.\-:\[\]]/', '', $host);
    $dir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
    return ($https ? 'https' : 'http') . '://' . $host . $dir . '/app/';
}

/** Stable RFC-4122-shaped UUID derived from a seed, so re-installing replaces the same profile. */
function webclip_uuid(string $seed): string
{
    $h = md5($seed);
    $h[12] = '4';
    $h[16] = dechex((hexdec($h[16]) & 0x3) | 0x8);
    return strtoupper(sprintf(
        '%s-%s-%s-%s-%s',
        substr($h, 0, 8), substr($h, 8, 4), substr($h, 12, 4), substr($h, 16, 4), substr($h, 20, 12)
    ));
}

function webclip_xml(string $s): string
{
    return htmlspecialchars($s, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}

/** Builds the unsigned .mobileconfig XML plist. */
function webclip_build_profile(array $cfg): string
{
    $id      = $cfg['PROFILE_IDENTIFIER'];
    $name    = $cfg['APP_NAME'];
    $url     = $cfg['APP_URL'];
    $full    = !empty($cfg['FULLSCREEN']) ? '<true/>' : '<false/>';
    $remov   = !empty($cfg['REMOVABLE']) ? '<true/>' : '<false/>';
    $ignore  = !empty($cfg['IGNORE_MANIFEST_SCOPE']) ? '<true/>' : '<false/>';
    $display = $cfg['PROFILE_DISPLAY_NAME'] ?? $name;
    $org     = $cfg['ORGANIZATION'] ?? $name;
    $desc    = $cfg['PROFILE_DESCRIPTION'] ?? '';

    $iconXml = '';
    $iconPath = WEBCLIP_ROOT . '/' . ltrim($cfg['APP_ICON'] ?? '', '/');
    if (is_file($iconPath)) {
        $icon = chunk_split(base64_encode((string) file_get_contents($iconPath)), 52, "\n\t\t\t");
        $iconXml = "\t\t\t<key>Icon</key>\n\t\t\t<data>\n\t\t\t" . rtrim($icon) . "\n\t\t\t</data>\n"
                 . "\t\t\t<key>Precomposed</key>\n\t\t\t<true/>\n";
    }

    $clipUuid = webclip_uuid($id . '.webclip');
    $rootUuid = webclip_uuid($id . '.profile');

    return '<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>FullScreen</key>
			' . $full . '
' . $iconXml . '			<key>IgnoreManifestScope</key>
			' . $ignore . '
			<key>IsRemovable</key>
			' . $remov . '
			<key>Label</key>
			<string>' . webclip_xml($name) . '</string>
			<key>PayloadDescription</key>
			<string>' . webclip_xml('Web Clip: ' . $name) . '</string>
			<key>PayloadDisplayName</key>
			<string>' . webclip_xml($name) . '</string>
			<key>PayloadIdentifier</key>
			<string>' . webclip_xml($id . '.webclip') . '</string>
			<key>PayloadType</key>
			<string>com.apple.webClip.managed</string>
			<key>PayloadUUID</key>
			<string>' . $clipUuid . '</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>URL</key>
			<string>' . webclip_xml($url) . '</string>
		</dict>
	</array>
	<key>PayloadDescription</key>
	<string>' . webclip_xml($desc) . '</string>
	<key>PayloadDisplayName</key>
	<string>' . webclip_xml($display) . '</string>
	<key>PayloadIdentifier</key>
	<string>' . webclip_xml($id) . '</string>
	<key>PayloadOrganization</key>
	<string>' . webclip_xml($org) . '</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>' . $rootUuid . '</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>
';
}

/**
 * Optionally signs the profile (CMS/PKCS#7, DER). Returns the unsigned profile on any failure.
 * A profile signed with a certificate trusted by iOS shows as "Verified".
 */
function webclip_sign_profile(string $xml, array $signing): string
{
    if (empty($signing['ENABLED']) || !function_exists('openssl_pkcs7_sign')) {
        return $xml;
    }
    $cert = $signing['CERT'] ?? '';
    $key  = $signing['KEY'] ?? '';
    $chain = $signing['CHAIN'] ?? '';
    if (!is_readable($cert) || !is_readable($key)) {
        error_log('[webclip] signing enabled but certificate/key not readable; serving unsigned profile');
        return $xml;
    }
    $in  = tempnam(sys_get_temp_dir(), 'wc_in');
    $out = tempnam(sys_get_temp_dir(), 'wc_out');
    try {
        file_put_contents($in, $xml);
        $ok = openssl_pkcs7_sign(
            $in, $out, 'file://' . realpath($cert), ['file://' . realpath($key), ''], [],
            PKCS7_BINARY, is_readable($chain) ? realpath($chain) : null
        );
        if (!$ok) {
            error_log('[webclip] openssl_pkcs7_sign failed: ' . openssl_error_string());
            return $xml;
        }
        // Output is S/MIME (headers + base64 body). Convert body to DER.
        $smime = (string) file_get_contents($out);
        $parts = preg_split("/\r?\n\r?\n/", $smime, 2);
        $der = base64_decode(trim($parts[1] ?? ''), true);
        return $der !== false && $der !== '' ? $der : $xml;
    } finally {
        @unlink($in);
        @unlink($out);
    }
}
