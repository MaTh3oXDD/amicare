<?php
/**
 * Odbiornik formularzy AmiCare.
 *
 * Obsluguje trzy formularze ze strony - kazdy wysyla POST na /api/formularz.php?typ=<klucz>:
 *   kontakt            - /kontakt oraz sekcja "Umow wizyte" na stronach placowek
 *   wywiad             - popup wywiadu wstepnego
 *   badanie-kliniczne  - zgloszenie do konkretnego badania
 *
 * Adres odbiorcy wyznacza serwer na podstawie typu i danych zgloszenia.
 * Frontend nigdy nie przysyla adresu - inaczej z formularza zrobilby sie relay do spamu.
 *
 * Odpowiada JSON-em: {"ok":true} albo {"ok":false,"error":"<kod>"}.
 */

declare(strict_types=1);

require __DIR__ . '/lib/smtp.php';

// ---------------------------------------------------------------------------
// Adresy odbiorcow
// ---------------------------------------------------------------------------

const REJESTRACJA = 'rejestracja@amicare.pl';
const KLINIKA = 'klinika@amicare.pl';
const BADANIA_KLINICZNE = 'a.gora@amicare.pl';
const OFFICE = 'office@amicare.pl';

/** Tematy formularza kontaktowego: klucz z frontendu -> etykieta w mailu. */
const TEMATY_KONTAKT = [
    'pacjent' => 'Jestem pacjentka/em i mam pytanie',
    'lekarz' => 'Jestem lekarzem, interesuje mnie wspolpraca',
    'wspolpraca' => 'Interesuje mnie wspolpraca',
    'opinia' => 'Przesylam moja opinie',
    'badania-kliniczne' => 'Prosze o wiecej informacji na temat badan klinicznych',
    'wizyta' => 'Umowienie wizyty',
];

/**
 * Definicje formularzy. Klucze musza sie zgadzac z TypFormularza
 * w src/app/services/formularze.ts.
 */
function formularze(): array
{
    return [
        'badanie-kliniczne' => [
            'to' => static fn(array $d): string => BADANIA_KLINICZNE,
            'temat' => static fn(array $d): string =>
                'Zgloszenie do badania klinicznego: ' . ($d['badanie'] !== '' ? $d['badanie'] : 'nieokreslone'),
            'wymagane' => ['imie', 'telefon'],
            'opcjonalne' => ['email', 'wiadomosc', 'badanie', 'miasto'],
            'etykiety' => [
                'imie' => 'Imie i nazwisko',
                'telefon' => 'Telefon',
                'email' => 'Email',
                'badanie' => 'Badanie',
                'miasto' => 'Miasto',
                'wiadomosc' => 'Wiadomosc',
            ],
        ],

        /* Popup wywiadu wstepnego. Wyskakuje wylacznie na /badania-kliniczne,
           wiec kazde zgloszenie stamtad nalezy do rekrutacji - takze gdy pacjent
           zostawi puste "Nie wiem / inne". */
        'wywiad' => [
            'to' => static fn(array $d): string => BADANIA_KLINICZNE,
            'temat' => static fn(array $d): string => 'Wywiad wstepny ze strony',
            'wymagane' => ['imie', 'telefon'],
            'opcjonalne' => ['badanie', 'opis'],
            'etykiety' => [
                'imie' => 'Imie i nazwisko',
                'telefon' => 'Telefon',
                'badanie' => 'Interesujace badanie',
                'opis' => 'Opis sprawy',
            ],
        ],

        // Formularz na /kontakt i na stronach placowek - adres zalezy od tematu i placowki
        'kontakt' => [
            'to' => static function (array $d): string {
                // Zapisy z osrodka w Jeleniej Gorze prowadzi biuro badan klinicznych
                if (stripos($d['placowka'], 'Jelenia') !== false) {
                    return OFFICE;
                }

                return [
                    'badania-kliniczne' => BADANIA_KLINICZNE,
                    'wizyta' => KLINIKA,
                ][$d['temat']] ?? REJESTRACJA;
            },
            'temat' => static fn(array $d): string =>
                'Wiadomosc ze strony: ' . (TEMATY_KONTAKT[$d['temat']] ?? 'kontakt'),
            'wymagane' => ['imie', 'email', 'temat', 'tresc'],
            // formularz na stronie placowki dokłada oddzial, z ktorego przyszlo zgloszenie
            'opcjonalne' => ['placowka'],
            'etykiety' => [
                'imie' => 'Imie i nazwisko',
                'email' => 'Email',
                'temat' => 'Temat',
                'placowka' => 'Placowka',
                'tresc' => 'Tresc wiadomosci',
            ],
            // 'temat' to klucz techniczny - w mailu pokazujemy etykiete
            'przeksztalc' => static fn(array $d): array =>
                array_merge($d, ['temat' => TEMATY_KONTAKT[$d['temat']] ?? $d['temat']]),
        ],
    ];
}

// ---------------------------------------------------------------------------
// Konfiguracja
// ---------------------------------------------------------------------------

/**
 * Sciezki przeszukiwane w poszukiwaniu pliku konfiguracyjnego, w kolejnosci.
 * Plik ma zwracac tablice - wzor w deploy/amicare-config.example.php.
 *
 * Kolejnosc od najbezpieczniejszej: najpierw katalog domowy (dwa poziomy nad
 * katalogiem strony, poza zasiegiem przegladarki niezaleznie od tego, gdzie
 * wskazuje katalog glowny domeny), potem katalog tuz nad strona, na koncu
 * sciezka systemowa dla wlasnego serwera.
 */
const CONFIG_PATHS = [
    __DIR__ . '/../../../amicare-config.php',
    __DIR__ . '/../../amicare-config.php',
    '/etc/amicare/config.php',
];

const DEFAULTS = [
    'mail_from' => 'formularz@amicare.pl',
    'mail_from_name' => 'Formularz AmiCare',
    'smtp_host' => 'localhost',
    'smtp_port' => 587,
    'smtp_encryption' => 'tls',
    'smtp_user' => 'formularz@amicare.pl',
    'smtp_pass' => '',
    'allowed_origins' => ['https://amicare.pl', 'https://www.amicare.pl'],
    'rate_limit_max' => 5,
    'rate_limit_window' => 3600,
    // Nadpisuje adresy odbiorcow na czas testow: ['*' => 'ja@example.com']
    'mail_to_override' => [],
    'debug' => false,
];

/** @return array<string,mixed> */
function loadConfig(): array
{
    $config = DEFAULTS;

    foreach (CONFIG_PATHS as $path) {
        if (is_readable($path)) {
            $loaded = require $path;
            if (is_array($loaded)) {
                $config = array_merge($config, $loaded);
            }
            break;
        }
    }

    // Zmienne srodowiskowe maja pierwszenstwo (np. z fastcgi_param w Plesku).
    foreach (['smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'mail_from'] as $key) {
        $env = getenv('AMICARE_' . strtoupper($key));
        if ($env !== false && $env !== '') {
            $config[$key] = $key === 'smtp_port' ? (int) $env : $env;
        }
    }

    return $config;
}

// ---------------------------------------------------------------------------
// Pomocnicze
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** @param array<string,mixed> $payload */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $code): void
{
    respond($status, ['ok' => false, 'error' => $code]);
}

/** Dlugosc tekstu; mbstring bywa wylaczony na tanich hostingach. */
function len(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function clientIp(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}

/** Usuwa znaki, ktorymi da sie wstrzyknac dodatkowe naglowki maila. */
function sanitizeHeaderValue(string $value): string
{
    return trim(str_replace(["\r", "\n", "\0", '%0a', '%0d'], '', $value));
}

/** Prosty limiter oparty o plik w katalogu tymczasowym. */
function rateLimitExceeded(string $ip, int $max, int $window): bool
{
    $file = sys_get_temp_dir() . '/amicare-form-' . sha1($ip) . '.json';
    $now = time();
    $hits = [];

    if (is_readable($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = array_values(array_filter(
                $decoded,
                static fn($ts): bool => is_int($ts) && $ts > $now - $window
            ));
        }
    }

    if (count($hits) >= $max) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);

    return false;
}

// ---------------------------------------------------------------------------
// Zadanie
// ---------------------------------------------------------------------------

$config = loadConfig();
$allowedOrigins = (array) $config['allowed_origins'];
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 86400');
    }
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST');
    fail(405, 'method_not_allowed');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    fail(403, 'forbidden_origin');
}
if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
}

$raw = file_get_contents('php://input') ?: '';

if (strpos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        fail(400, 'invalid_json');
    }
    $data = $decoded;
} else {
    $data = $_POST;
}

// Typ formularza: z query (?typ=kontakt) albo z ostatniego segmentu sciezki,
// gdy serwer przepisuje /api/formularz/kontakt na ten plik.
$typ = (string) ($_GET['typ'] ?? '');
if ($typ === '') {
    $sciezka = trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $segmenty = explode('/', $sciezka);
    $ostatni = end($segmenty);
    $typ = ($ostatni !== false && $ostatni !== 'formularz.php') ? $ostatni : '';
}

$definicje = formularze();
if (!isset($definicje[$typ])) {
    fail(404, 'unknown_form');
}
$def = $definicje[$typ];

// Honeypot: pole ukryte przed ludzmi, boty je wypelniaja. Udajemy sukces.
$honeypot = $data['firma'] ?? '';
if (is_string($honeypot) && trim($honeypot) !== '') {
    error_log('amicare: honeypot zlapal zgloszenie, IP ' . clientIp());
    respond(200, ['ok' => true]);
}

/** Wszystkie pola definicji sprowadzone do przycietych stringow. */
$pola = [];
foreach (array_merge($def['wymagane'], $def['opcjonalne']) as $klucz) {
    $wartosc = $data[$klucz] ?? '';
    $pola[$klucz] = is_string($wartosc) ? trim($wartosc) : '';
}

$braki = [];
foreach ($def['wymagane'] as $klucz) {
    if ($pola[$klucz] === '' || len($pola[$klucz]) > 5000) {
        $braki[] = $klucz;
    }
}

// Zgoda na przetwarzanie danych jest wymagana wszedzie, gdzie formularz ja pokazuje.
if (array_key_exists('zgoda', $data) && !filter_var($data['zgoda'], FILTER_VALIDATE_BOOLEAN)) {
    $braki[] = 'zgoda';
}

if (isset($pola['email']) && $pola['email'] !== '' && !filter_var($pola['email'], FILTER_VALIDATE_EMAIL)) {
    $braki[] = 'email';
}

if ($braki !== []) {
    error_log('amicare: walidacja odrzucila pola [' . implode(', ', $braki) . '], IP ' . clientIp());
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $braki]);
}

if (rateLimitExceeded(clientIp(), (int) $config['rate_limit_max'], (int) $config['rate_limit_window'])) {
    fail(429, 'rate_limited');
}

// --- Wysylka ---------------------------------------------------------------

if ($config['smtp_pass'] === '') {
    error_log('amicare: brak hasla SMTP - sprawdz plik konfiguracyjny');
    fail(500, 'send_failed');
}

$odbiorca = ($def['to'])($pola);
$override = (array) $config['mail_to_override'];
if (isset($override['*'])) {
    $odbiorca = (string) $override['*'];
} elseif (isset($override[$odbiorca])) {
    $odbiorca = (string) $override[$odbiorca];
}

$temat = sanitizeHeaderValue(($def['temat'])($pola));

/* Kto sie zglasza - doklejane do tematu, zeby na liscie w skrzynce bylo widac
   nazwisko i kontakt bez otwierania maila. */
$kontaktNadawcy = array_filter([
    sanitizeHeaderValue($pola['imie'] ?? ''),
    sanitizeHeaderValue($pola['email'] ?? ''),
    sanitizeHeaderValue($pola['telefon'] ?? ''),
]);
if ($kontaktNadawcy !== []) {
    $temat .= ' - ' . implode(', ', $kontaktNadawcy);
}

$doMaila = isset($def['przeksztalc']) ? ($def['przeksztalc'])($pola) : $pola;

$linie = ['Nowe zgloszenie ze strony amicare.pl', ''];
foreach ($def['etykiety'] as $klucz => $etykieta) {
    $wartosc = $doMaila[$klucz] ?? '';
    $linie[] = $etykieta . ': ' . ($wartosc !== '' ? $wartosc : '-');
}
$linie[] = '';
$linie[] = '---';
$linie[] = 'Formularz: ' . $typ;
$linie[] = 'IP: ' . clientIp();
$linie[] = 'Data: ' . date('Y-m-d H:i:s');
$linie[] = 'User-Agent: ' . sanitizeHeaderValue((string) ($_SERVER['HTTP_USER_AGENT'] ?? '-'));

$tresc = implode("\r\n", $linie);

$imiePacjenta = sanitizeHeaderValue($pola['imie'] ?? '');

$naglowki = [];
if (isset($pola['email']) && $pola['email'] !== '') {
    // Odpowiedz w kliencie pocztowym idzie prosto do pacjenta, nie do nas.
    $naglowki['Reply-To'] = SmtpMailer::encodeHeader($imiePacjenta)
        . ' <' . sanitizeHeaderValue($pola['email']) . '>';
}

/* Adres nadawcy musi zostac nasza skrzynka - serwer pocztowy odrzuca wysylke
   z cudzej domeny (SPF/DKIM). Podmieniamy za to nazwe wyswietlana: imie i adres
   pacjenta, zeby lista w skrzynce czytala sie jak lista zgloszen, a nie jak
   kolejne maile od formularza. Adres celowo bez nawiasow ostrych - klienty
   pocztowe oznaczaja taki zapis jako probe podszycia. */
$nazwaNadawcy = $imiePacjenta !== ''
    ? trim($imiePacjenta . ' · ' . ($pola['email'] ?? $pola['telefon'] ?? ''), " ·")
    : (string) $config['mail_from_name'];

$mailer = new SmtpMailer(
    (string) $config['smtp_host'],
    (int) $config['smtp_port'],
    (string) $config['smtp_user'],
    (string) $config['smtp_pass'],
    (string) $config['smtp_encryption']
);

try {
    $mailer->send(
        (string) $config['mail_from'],
        $nazwaNadawcy,
        $odbiorca,
        $temat,
        $tresc,
        $naglowki
    );
} catch (SmtpException $e) {
    error_log('amicare: SMTP - ' . $e->getMessage());

    if (!empty($config['debug'])) {
        respond(500, [
            'ok' => false,
            'error' => 'send_failed',
            'detail' => $e->getMessage(),
            'transcript' => $mailer->transcript(),
        ]);
    }

    fail(500, 'send_failed');
}

respond(200, ['ok' => true]);
