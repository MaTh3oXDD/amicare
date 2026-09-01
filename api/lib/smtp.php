<?php
/**
 * Minimalny klient SMTP: EHLO, opcjonalny STARTTLS, AUTH LOGIN, MAIL FROM, RCPT TO, DATA.
 * Bez zależności zewnętrznych - hosting nie ma Composera, a strona to statyczny build Angulara.
 */

declare(strict_types=1);

final class SmtpException extends RuntimeException
{
}

final class SmtpMailer
{
    /** @var resource|null */
    private $socket = null;

    private string $host;
    private int $port;
    private string $username;
    private string $password;
    private string $encryption;
    private int $timeout;

    /** @var string[] Log dialogu z serwerem, przydatny przy diagnozie. */
    private array $transcript = [];

    public function __construct(
        string $host,
        int $port,
        string $username,
        string $password,
        string $encryption = 'tls',
        int $timeout = 15
    ) {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->encryption = $encryption;
        $this->timeout = $timeout;
    }

    /**
     * @param array<string,string> $headers Nagłówki poza From/To/Subject/Date.
     * @throws SmtpException
     */
    public function send(
        string $fromEmail,
        string $fromName,
        string $toEmail,
        string $subject,
        string $body,
        array $headers = []
    ): void {
        $this->connect();

        try {
            $this->expect($this->readResponse(), 220, 'powitanie serwera');

            $hostname = $this->clientHostname();
            $this->command('EHLO ' . $hostname, 250, 'EHLO');

            if ($this->encryption === 'tls') {
                $this->command('STARTTLS', 220, 'STARTTLS');
                $this->enableCrypto();
                // Po STARTTLS trzeba powtorzyc EHLO na zaszyfrowanym kanale.
                $this->command('EHLO ' . $hostname, 250, 'EHLO po STARTTLS');
            }

            $this->command('AUTH LOGIN', 334, 'AUTH LOGIN');
            $this->command(base64_encode($this->username), 334, 'login');
            $this->command(base64_encode($this->password), 235, 'haslo');

            $this->command('MAIL FROM:<' . $fromEmail . '>', 250, 'MAIL FROM');
            $this->command('RCPT TO:<' . $toEmail . '>', 250, 'RCPT TO');
            $this->command('DATA', 354, 'DATA');

            $this->write($this->buildMessage($fromEmail, $fromName, $toEmail, $subject, $body, $headers));
            $this->write('.');
            $this->expect($this->readResponse(), 250, 'zakonczenie DATA');

            $this->command('QUIT', 221, 'QUIT');
        } finally {
            $this->disconnect();
        }
    }

    /** @return string[] */
    public function transcript(): array
    {
        return $this->transcript;
    }

    private function connect(): void
    {
        $prefix = $this->encryption === 'ssl' ? 'ssl://' : '';
        $errno = 0;
        $errstr = '';

        $socket = @stream_socket_client(
            $prefix . $this->host . ':' . $this->port,
            $errno,
            $errstr,
            $this->timeout,
            STREAM_CLIENT_CONNECT
        );

        if ($socket === false) {
            throw new SmtpException(
                sprintf('Polaczenie z %s:%d nieudane (%d %s)', $this->host, $this->port, $errno, $errstr)
            );
        }

        stream_set_timeout($socket, $this->timeout);
        $this->socket = $socket;
    }

    private function disconnect(): void
    {
        if (is_resource($this->socket)) {
            @fclose($this->socket);
        }
        $this->socket = null;
    }

    private function enableCrypto(): void
    {
        $method = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
            $method |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        }
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
            $method |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
        }

        if (@stream_socket_enable_crypto($this->socket, true, $method) !== true) {
            throw new SmtpException('Nie udalo sie zestawic TLS po STARTTLS');
        }
    }

    private function command(string $line, int $expected, string $label): string
    {
        $this->write($line);
        $response = $this->readResponse();
        $this->expect($response, $expected, $label);

        return $response;
    }

    private function write(string $line): void
    {
        if (!is_resource($this->socket)) {
            throw new SmtpException('Brak polaczenia z serwerem SMTP');
        }

        // Dlugie linie (dane logowania, tresc maila) skracamy w transkrypcie.
        $this->transcript[] = '> ' . (strlen($line) > 120 ? substr($line, 0, 40) . '...' : $line);

        if (@fwrite($this->socket, $line . "\r\n") === false) {
            throw new SmtpException('Zapis do gniazda SMTP nieudany');
        }
    }

    private function readResponse(): string
    {
        if (!is_resource($this->socket)) {
            throw new SmtpException('Brak polaczenia z serwerem SMTP');
        }

        $response = '';

        while (($line = fgets($this->socket, 515)) !== false) {
            $response .= $line;
            // Odpowiedz wieloliniowa ma myslnik po kodzie: "250-", ostatnia ma spacje.
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }

        $meta = stream_get_meta_data($this->socket);
        if (!empty($meta['timed_out'])) {
            throw new SmtpException('Serwer SMTP nie odpowiedzial w ' . $this->timeout . ' s');
        }

        $this->transcript[] = '< ' . trim($response);

        return $response;
    }

    private function expect(string $response, int $code, string $label): void
    {
        if (strncmp($response, (string) $code, 3) !== 0) {
            throw new SmtpException(
                sprintf('%s: oczekiwano %d, dostano "%s"', $label, $code, trim($response))
            );
        }
    }

    /**
     * @param array<string,string> $extraHeaders
     */
    private function buildMessage(
        string $fromEmail,
        string $fromName,
        string $toEmail,
        string $subject,
        string $body,
        array $extraHeaders
    ): string {
        $headers = [
            'Date' => date('r'),
            'From' => self::encodeHeader($fromName) . ' <' . $fromEmail . '>',
            'To' => '<' . $toEmail . '>',
            'Subject' => self::encodeHeader($subject),
            'Message-ID' => '<' . bin2hex(random_bytes(12)) . '@' . $this->senderDomain($fromEmail) . '>',
            'MIME-Version' => '1.0',
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Content-Transfer-Encoding' => '8bit',
        ];

        foreach ($extraHeaders as $name => $value) {
            $headers[$name] = $value;
        }

        $lines = [];
        foreach ($headers as $name => $value) {
            $lines[] = $name . ': ' . $value;
        }
        $lines[] = '';

        foreach (preg_split('/\r\n|\r|\n/', $body) as $line) {
            // Dot-stuffing: linia zaczynajaca sie kropka zakonczylaby DATA.
            $lines[] = (isset($line[0]) && $line[0] === '.') ? '.' . $line : $line;
        }

        return implode("\r\n", $lines);
    }

    private function senderDomain(string $email): string
    {
        $at = strrpos($email, '@');

        return $at === false ? 'localhost' : substr($email, $at + 1);
    }

    private function clientHostname(): string
    {
        $host = gethostname();

        return is_string($host) && $host !== '' ? $host : 'localhost';
    }

    public static function encodeHeader(string $value): string
    {
        // Czysty ASCII nie wymaga kodowania i czyta sie lepiej w logach.
        if (preg_match('/^[\x20-\x7E]*$/', $value) === 1) {
            return $value;
        }

        return '=?UTF-8?B?' . base64_encode($value) . '?=';
    }
}
