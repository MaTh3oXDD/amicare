import express from 'express';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

const REJESTRACJA = 'rejestracja@amicare.pl';
const KLINIKA = 'klinika@amicare.pl';
const BADANIA_KLINICZNE = 'a.gora@amicare.pl';

// Tematy formularza kontaktowego: klucz z frontendu -> etykieta w mailu.
// Klucze muszą się zgadzać z src/app/pages/kontakt/components/formularz-kontaktowy/formularz-kontaktowy.ts
const TEMATY_KONTAKT = {
  pacjent: 'Jestem pacjentką/em i mam pytanie',
  lekarz: 'Jestem lekarzem, interesuje mnie współpraca',
  wspolpraca: 'Interesuje mnie współpraca',
  opinia: 'Przesyłam moją opinię',
  'badania-kliniczne': 'Proszę o więcej informacji na temat badań klinicznych',
  wizyta: 'Umówienie wizyty',
};

const FORMULARZE = {
  // Formularz zgłoszeniowy na podstronach /badania-kliniczne/:slug
  'badanie-kliniczne': {
    to: () => BADANIA_KLINICZNE,
    temat: (d) => `Zgłoszenie do badania klinicznego: ${d.badanie || 'nieokreślone'}`,
    wymagane: ['imie', 'telefon'],
    opcjonalne: ['email', 'wiadomosc', 'badanie', 'miasto'],
    etykiety: {
      imie: 'Imię i nazwisko',
      telefon: 'Telefon',
      email: 'Email',
      badanie: 'Badanie',
      miasto: 'Miasto',
      wiadomosc: 'Wiadomość',
    },
  },

  /* Popup wywiadu wstępnego. Wyskakuje wyłącznie na /badania-kliniczne
     (SCIEZKA_ANKIETY w entry-survey.ts), więc każde zgłoszenie stamtąd należy
     do rekrutacji - także gdy pacjent zostawi puste „Nie wiem / inne". */
  wywiad: {
    to: () => BADANIA_KLINICZNE,
    temat: () => 'Wywiad wstępny ze strony',
    wymagane: ['imie', 'telefon'],
    opcjonalne: ['badanie', 'opis'],
    etykiety: {
      imie: 'Imię i nazwisko',
      telefon: 'Telefon',
      badanie: 'Interesujące badanie',
      opis: 'Opis sprawy',
    },
  },

  // Formularz na /kontakt - adres zależy od wybranego tematu
  kontakt: {
    to: (d) => ({ 'badania-kliniczne': BADANIA_KLINICZNE, wizyta: KLINIKA }[d.temat] ?? REJESTRACJA),
    temat: (d) => `Wiadomość ze strony: ${TEMATY_KONTAKT[d.temat] ?? 'kontakt'}`,
    wymagane: ['imie', 'email', 'temat', 'tresc'],
    opcjonalne: [],
    etykiety: {
      imie: 'Imię i nazwisko',
      email: 'Email',
      temat: 'Temat',
      tresc: 'Treść wiadomości',
    },
    // 'temat' to klucz techniczny - w mailu pokazujemy etykietę
    przeksztalc: (d) => ({ ...d, temat: TEMATY_KONTAKT[d.temat] ?? d.temat }),
  },
};

// Bez SMTP_HOST nic nie wychodzi na zewnątrz - maile lądują w konsoli.
// Tryb do testów lokalnych; na produkcji SMTP_HOST musi być ustawiony.
const trybTestowy = !process.env.SMTP_HOST;
if (trybTestowy) {
  console.warn('UWAGA: brak SMTP_HOST - tryb testowy, maile tylko w konsoli.');
}

const transport = nodemailer.createTransport(
  trybTestowy
    ? { jsonTransport: true }
    : {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
);

const NADAWCA = process.env.MAIL_FROM ?? '"Formularz Amicare" <formularz@amicare.pl>';

const app = express();
app.set('trust proxy', 1); // stoi za nginxem - inaczej rate limit widzi tylko 127.0.0.1
app.use(express.json({ limit: '32kb' }));

// CORS - potrzebny tylko wtedy, gdy front stoi pod inną domeną niż API
// (np. strona na GitHub Pages, API na api.amicare.pl). Lista domen po przecinku.
const DOZWOLONE_ORIGINY = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (DOZWOLONE_ORIGINY.length) {
  app.use((req, res, next) => {
    const origin = req.get('Origin');
    if (origin && DOZWOLONE_ORIGINY.includes(origin)) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Vary', 'Origin');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  // limit osobno dla każdego formularza - spam na rekrutacji nie blokuje pacjentom kontaktu
  keyGenerator: (req) => `${req.ip}:${req.params.typ ?? 'brak'}`,
  message: { ok: false, blad: 'limit' },
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/formularz/:typ', limiter, async (req, res) => {
  const cfg = FORMULARZE[req.params.typ];
  if (!cfg) return res.status(404).json({ ok: false, blad: 'nieznany-formularz' });

  const { firma, zgoda, ...dane } = req.body ?? {};

  // honeypot: boty wypełniają ukryte pole. Odpowiadamy sukcesem, żeby nie uczyć ich omijania.
  if (firma) return res.json({ ok: true });

  if (zgoda !== true) return res.status(400).json({ ok: false, blad: 'brak-zgody' });

  const brakuje = cfg.wymagane.filter((p) => !String(dane[p] ?? '').trim());
  if (brakuje.length) return res.status(400).json({ ok: false, blad: 'brak-pol', brakuje });

  if (dane.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(dane.email)) {
    return res.status(400).json({ ok: false, blad: 'zly-email' });
  }

  const to = cfg.to(dane);
  const widoczne = cfg.przeksztalc ? cfg.przeksztalc(dane) : dane;

  const tresc = [...cfg.wymagane, ...cfg.opcjonalne]
    .filter((p) => String(widoczne[p] ?? '').trim())
    .map((p) => `${cfg.etykiety[p] ?? p}: ${widoczne[p]}`)
    .join('\n');

  try {
    await transport.sendMail({
      from: NADAWCA,
      to,
      // odpowiedź z klienta pocztowego trafia prosto do pacjenta
      replyTo: dane.email ? `${dane.imie} <${dane.email}>` : undefined,
      subject: cfg.temat(widoczne),
      text: `${tresc}\n\n--\nWysłane z formularza na amicare.pl`,
    });
  } catch (err) {
    // Nie logujemy treści zgłoszenia - to dane pacjenta. Tylko fakt błędu.
    console.error(`[formularz:${req.params.typ}] wysyłka nieudana:`, err.message);
    return res.status(502).json({ ok: false, blad: 'wysylka' });
  }

  console.log(`[formularz:${req.params.typ}] wysłano na ${to}`);
  res.json({ ok: true });
});

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, '127.0.0.1', () => console.log(`amicare-api na 127.0.0.1:${PORT}`));
