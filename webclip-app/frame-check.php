<?php
/**
 * Reports which configured tool websites can be displayed inside the in-app browser.
 *
 * Many websites forbid being embedded (X-Frame-Options / CSP frame-ancestors). The app
 * calls this once at launch; blocked tools are opened in the iOS in-app Safari sheet
 * instead of showing a blank page. Only URLs from config.json are checked (no open proxy).
 *
 * GET frame-check.php  →  {"tool-01": true, "tool-02": false, ...}
 */

declare(strict_types=1);
require __DIR__ . '/lib/profile-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$cfg = webclip_config();
$appHost = parse_url($cfg['APP_URL'], PHP_URL_HOST) ?: ($_SERVER['HTTP_HOST'] ?? '');
$cacheFile = sys_get_temp_dir() . '/webclip-frame-' . md5(json_encode($cfg['categories'])) . '.json';

if (is_file($cacheFile) && filemtime($cacheFile) > time() - 6 * 3600) {
    readfile($cacheFile);
    exit;
}

function fetch_headers(string $url): ?array
{
    if (!preg_match('#^https?://#i', $url)) {
        return null;
    }
    $ctx = stream_context_create([
        'http' => [
            'method' => 'GET',
            'follow_location' => 1,
            'max_redirects' => 5,
            'timeout' => 6,
            'ignore_errors' => true,
            'header' => "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1\r\nRange: bytes=0-0\r\n",
        ],
    ]);
    $h = @get_headers($url, true, $ctx);
    return $h === false ? null : array_change_key_case($h, CASE_LOWER);
}

function last_value($v): string
{
    return is_array($v) ? (string) end($v) : (string) $v;
}

function is_frameable(?array $h, string $appHost): bool
{
    if ($h === null) {
        return true; // unknown → let the client try; it has a fallback button
    }
    if (isset($h['x-frame-options'])) {
        $xfo = strtolower(last_value($h['x-frame-options']));
        if (str_contains($xfo, 'deny') || str_contains($xfo, 'sameorigin')) {
            return false;
        }
    }
    if (isset($h['content-security-policy'])) {
        $csp = strtolower(last_value($h['content-security-policy']));
        if (preg_match('/frame-ancestors([^;]*)/', $csp, $m)) {
            $src = trim($m[1]);
            if ($src === "'none'" || $src === "'self'") {
                return false;
            }
            if (!str_contains($src, '*') && !str_contains($src, strtolower($appHost))) {
                return false;
            }
        }
    }
    return true;
}

$result = [];
foreach ($cfg['categories'] as $cat) {
    foreach ($cat['tools'] as $tool) {
        $result[$tool['id']] = is_frameable(fetch_headers($tool['url']), $appHost);
    }
}

$json = json_encode($result, JSON_UNESCAPED_SLASHES);
@file_put_contents($cacheFile, $json);
echo $json;
