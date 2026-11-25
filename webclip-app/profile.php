<?php
/**
 * Serves the Apple Configuration Profile containing the Web Clip payload.
 *
 * Safari on iPhone recognises the MIME type below and shows the native iOS prompt
 * ("This website is trying to download a configuration profile…" → Ignore / Allow).
 * Nothing is installed until the user installs it manually in Settings.
 */

declare(strict_types=1);
require __DIR__ . '/lib/profile-lib.php';

try {
    $cfg = webclip_config();
} catch (Throwable $e) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Configuration error';
    exit;
}

$profile = webclip_sign_profile(webclip_build_profile($cfg), $cfg['SIGNING'] ?? []);
$filename = preg_replace('/[^A-Za-z0-9._-]/', '-', $cfg['PROFILE_FILENAME'] ?? 'webclip.mobileconfig');

header('Content-Type: application/x-apple-aspen-config');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . strlen($profile));
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
echo $profile;
