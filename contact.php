<?php
// Contact form handler — emails submissions from /contact to the inbox below.
// The recipient lives only here (server side), so it never appears on the site.

const RECIPIENT    = 'egor@ascensionfestival.nl';
const FROM_ADDRESS = 'noreply@ascensionfestival.nl';
const MAX_PER_HOUR = 5;     // per IP address
const MIN_SECONDS  = 3;     // humans take longer than this to fill the form

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $error = '', int $status = 200): void {
    global $wantsJson;
    http_response_code($status);
    if ($wantsJson) {
        header('Content-Type: application/json');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    } else {
        // No-JavaScript fallback: send the visitor back to the contact page
        header('Location: /contact?' . ($ok ? 'sent=1' : 'error=' . rawurlencode($error)), true, 303);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed.', 405);
}

// Strip line breaks so nothing can be injected into mail headers
function clean_line(string $s): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $s));
}

$name    = clean_line($_POST['name'] ?? '');
$email   = clean_line($_POST['email'] ?? '');
$userSubject   = clean_line($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');
$honey   = $_POST['website'] ?? '';
$started = (int)($_POST['started'] ?? 0);

// Bots: silently pretend success when the hidden field is filled or the form was submitted instantly
if ($honey !== '' || ($started > 0 && time() - intdiv($started, 1000) < MIN_SECONDS)) {
    respond(true);
}

if ($name === '' || mb_strlen($name) > 100)            respond(false, 'Please enter your name.', 422);
if (!filter_var($email, FILTER_VALIDATE_EMAIL))        respond(false, 'Please enter a valid email address.', 422);
if (mb_strlen($message) < 10)                          respond(false, 'Please write a slightly longer message.', 422);
if (mb_strlen($message) > 5000)                        respond(false, 'Your message is too long (5,000 characters max).', 422);

if ($userSubject === '' || mb_strlen($userSubject) > 150)          respond(false, 'Please add a subject.', 422);

// Simple per-IP rate limit stored in the system temp directory
$ip      = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile  = sys_get_temp_dir() . '/af_contact_' . hash('sha256', $ip);
$now     = time();
$hits    = array_filter(
    is_file($rlFile) ? (array)json_decode((string)file_get_contents($rlFile), true) : [],
    fn($t) => is_int($t) && $t > $now - 3600
);
if (count($hits) >= MAX_PER_HOUR) respond(false, 'Too many messages — please try again later.', 429);

$subject = "[ascensionfestival.nl] $userSubject — $name";
$body    = "New message from the contact form on ascensionfestival.nl\n\n"
         . "Name:    $name\n"
         . "Email:   $email\n"
         . "Subject: $userSubject\n"
         . "Sent:    " . date('j M Y, H:i') . "\n\n"
         . "----------------------------------------\n\n"
         . $message . "\n";

$headers = [
    'From: Ascension Website <' . FROM_ADDRESS . '>',
    'Reply-To: "' . str_replace(['"', '\\'], '', $name) . '" <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: ascensionfestival.nl contact form',
];

$sent = mail(RECIPIENT, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f' . FROM_ADDRESS);

if (!$sent) respond(false, 'Your message could not be sent. Please try again in a moment.', 500);

$hits[] = $now;
@file_put_contents($rlFile, json_encode(array_values($hits)));
respond(true);
