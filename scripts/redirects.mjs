/* Buduje pliki przekierowań dla nginx i Apache z listy starych adresów WordPressa.
   Wejście: seo-migracja/stare-urls.txt (zrzut z sitemap_index.xml).
   Wyjście: seo-migracja/serwer/redirects.nginx.conf i redirects.htaccess
   Uruchomienie: node scripts/redirects.mjs */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const WEJSCIE = 'seo-migracja/stare-urls.txt';
const KATALOG = 'seo-migracja/serwer';

/* Kolejność ma znaczenie: pierwsza pasująca reguła wygrywa. */
const REGULY = [
  // --- endoskopia: najcenniejsze adresy w całej migracji
  [/^\/amicare\/badania-diagnostyczne\/kolonoskopia\/?$/, '/pracownia-endoskopii/kolonoskopia'],
  [/^\/amicare\/badania-diagnostyczne\/gastroskopia\/?$/, '/pracownia-endoskopii/gastroskopia'],

    // --- badania diagnostyczne 1:1
  [/^\/amicare\/badania-diagnostyczne\/([a-z0-9-]+)\/?$/, '/badania-diagnostyczne/$1'],
  [/^\/amicare\/badania-diagnostyczne\/?$/, '/badania-diagnostyczne'],

  // --- zespół: stare grupy spłaszczone do jednego poziomu
  [
    /^\/o-nas\/zespol\/(?:kadra-zarzadzajaca|koordynatorzy|pielegniarki|zespol-pielegniarski)\/([a-z0-9-]+)\/?$/,
    '/o-nas/zespol/$1',
  ],
  [
    /^\/o-nas\/zespol\/(?:kadra-zarzadzajaca|koordynatorzy|pielegniarki|zespol-pielegniarski)\/?$/,
    '/o-nas/zespol',
  ],
  [/^\/jestem-pacjentem\/gabinety-prywatne\/gabinet-gastroenterologiczny\/?$/, '/konsultacje-specjalistyczne/gastroenterologia'],
  [/^\/jestem-pacjentem\/gabinety-prywatne\/(?:mgr-paulina-kruk-dietetyczka|oliwia-scigalska-dietetyczka)\/?$/, '/konsultacje-specjalistyczne/dietetyka'],
  [/^\/jestem-pacjentem\/gabinety-prywatne\/([a-z0-9-]+)\/?$/, '/o-nas/zespol/$1'],
  [/^\/jestem-pacjentem\/gabinety-prywatne\/?$/, '/konsultacje-specjalistyczne'],

  // --- specjalizacje: 7 istniejących, reszta na listę
  [/^\/specjalizacja\/gastroenterologia-pl\/?$/, '/konsultacje-specjalistyczne/gastroenterologia'],
  [
    /^\/specjalizacja\/(chirurgia|reumatologia|kardiologia|psychologia|dietetyka|proktologia)\/?$/,
    '/konsultacje-specjalistyczne/$1',
  ],
  [/^\/specjalizacja\/[a-z0-9-]+\/?$/, '/konsultacje-specjalistyczne'],
  [/^\/konsultacje-specjalistyczne\/psychologia\/.*$/, '/konsultacje-specjalistyczne/psychologia'],

  // --- badania kliniczne: cała stara gałąź na jedną stronę
  [/^\/jestem-pacjentem\/co-oferujemy\/.*$/, '/badania-kliniczne'],
  [/^\/jestem-pacjentem\/co-oferujemy\/?$/, '/badania-kliniczne'],
  [/^\/amicare\/badania-kliniczne\/.*$/, '/badania-kliniczne'],
  [/^\/amicare\/badania-kliniczne\/?$/, '/badania-kliniczne'],
  [/^\/etapy-badan-klinicznych\/?$/, '/badania-kliniczne'],
  [/^\/prawa-pacjenta-w-badaniach-klinicznych\/?$/, '/badania-kliniczne'],
  [/^\/dziekujemy-za-zgloszenie\/?$/, '/badania-kliniczne'],

  // --- współpraca i partnerzy
  [/^\/wspolpracujemy\/?$/, '/o-nas/wspolpracujemy'],
  [/^\/amicare\/uslugi-swiadczone-dla-grupy-(?:luxmed|polmed)\/?$/, '/o-nas/wspolpracujemy'],
  [/^\/sponsorzy\/?$/, '/wspolpraca'],
  [/^\/wspolpraca\/?$/, '/wspolpraca'],

  // --- pozostałe strony
  [/^\/oferta\/?$/, '/konsultacje-specjalistyczne'],
  [/^\/amicare\/amicare-specjalizacje-.*$/, '/konsultacje-specjalistyczne'],
  [/^\/jestem-pacjentem\/?$/, '/konsultacje-specjalistyczne'],
  [/^\/dziekujemy-za-wiadomosc\/?$/, '/kontakt'],
  [/^\/o-nas\/gratulacje-dla-glownego-badacza-i-calego-zespolu\/?$/, '/o-nas'],

  // --- wersja angielska: nie wraca, całość na polskie odpowiedniki
  [/^\/en\/(?:home|home-2)\/?$/, '/'],
  [/^\/en\/about-us\/?$/, '/o-nas'],
  [/^\/en\/contact-us\/?$/, '/kontakt'],
  [/^\/en\/.*$/, '/badania-kliniczne'],

  // --- treści bez następcy
  [/^\/wp_jac_slide\/.*$/, 410],
  [/^\/amicare\/swiatowy-dzien-bez-tytoniu\/?$/, 410],

  // --- adresy, które istnieją po obu stronach
  [/^\/(o-nas|kontakt|pracownia-endoskopii|konsultacje-specjalistyczne)\/$/, '/$1'],
  [/^\/o-nas\/zespol\/$/, '/o-nas/zespol'],
];

const sciezka = (url) => new URL(url).pathname;

/* Adresy nowej strony - służą jako reguła zapasowa (stary URL różni się tylko
   końcowym ukośnikiem) i do sprawdzenia, czy każdy cel 301 naprawdę istnieje. */
const NOWE = new Set(
  [...readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    new URL(m[1]).pathname.replace(/\/$/, ''),
  ),
);

const dopasuj = (p) => {
  /* Ten sam adres, tylko z ukośnikiem na końcu - stary WordPress je dodawał. */
  const bezUkosnika = p.replace(/\/$/, '');
  if (p !== bezUkosnika && NOWE.has(bezUkosnika)) return { kod: 301, cel: bezUkosnika };

  for (const [wzorzec, cel] of REGULY) {
    const m = p.match(wzorzec);
    if (m) {
      if (cel === 410) return { kod: 410 };
      return { kod: 301, cel: cel.replace(/\$(\d)/g, (_, i) => m[Number(i)]) };
    }
  }
  return null;
};

const stare = readFileSync(WEJSCIE, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean)
  .map(sciezka)
  .filter((p) => p !== '/');

/* Cel, którego nie ma w nowej sitemapie (usunięta treść, osoba spoza zespołu),
   kierujemy na stronę nadrzędną - inaczej 301 prowadziłby w 404. */
const dosypNadrzedna = (cel) => {
  if (NOWE.has(cel) || cel === '/') return cel;
  const nadrzedna = cel.slice(0, cel.lastIndexOf('/'));
  return NOWE.has(nadrzedna) ? nadrzedna : '/';
};

const wynik = [...new Set(stare)].sort().map((p) => {
  const w = dopasuj(p) ?? { kod: 0 };
  return { p, ...w, ...(w.kod === 301 ? { cel: dosypNadrzedna(w.cel) } : {}) };
});
const nieobsluzone = wynik.filter((w) => w.kod === 0);

mkdirSync(KATALOG, { recursive: true });

const naglowek = (komentarz) => `${komentarz} Wygenerowane przez scripts/redirects.mjs
${komentarz} Źródło: seo-migracja/stare-urls.txt (${stare.length} adresów ze starej sitemapy)
${komentarz} Nie edytuj ręcznie - popraw REGULY w skrypcie i uruchom go ponownie.
`;

const nginx = [
  naglowek('#'),
  '',
  '# Nagłówki bezpieczeństwa - formularze zbierają dane pacjentów.',
  'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;',
  'add_header X-Content-Type-Options "nosniff" always;',
  'add_header Referrer-Policy "strict-origin-when-cross-origin" always;',
  'add_header X-Frame-Options "SAMEORIGIN" always;',
  'add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;',
  '',
  '# Stara sitemapa Yoasta.',
  'location = /sitemap_index.xml { return 301 /sitemap.xml; }',
  '',
  '# Pozostałości po WordPressie - żadna z nich nie ma następcy.',
  'location ^~ /wp-content/ { return 410; }',
  'location ^~ /wp-includes/ { return 410; }',
  'location ^~ /wp-admin/ { return 410; }',
  'location = /wp-login.php { return 410; }',
  'location = /xmlrpc.php { return 410; }',
  '',
  '# Przekierowania ze starych adresów.',
  ...wynik
    .filter((w) => w.kod !== 0)
    .map((w) =>
      w.kod === 410
        ? `location = ${w.p} { return 410; }`
        : `location = ${w.p} { return 301 ${w.cel}; }`,
    ),
  '',
  '# Build z prerenderem daje katalog na trasę: /cennik -> cennik/index.html.',
  '# Adres spoza listy tras kończy na prawdziwym 404, nie na stronie głównej.',
  'error_page 404 /404.html;',
  'location / {',
  '  # Jedna konwencja adresu: bez ukośnika na końcu, zgodnie z canonicalem.',
  '  # Reguły "location =" wyżej mają pierwszeństwo, więc stare adresy WP nadal łapią swoje 301.',
  '  rewrite ^/(.+)/$ /$1 permanent;',
  '  try_files $uri $uri/index.html =404;',
  '}',
  '',
].join('\n');

/* Adres, ktory po obcieciu ukosnika jest identyczny z celem, nie moze dostac
   reguly lapiacej obie formy - Apache wpadlby w petle 301 na samego siebie.
   Taki przypadek zalatwia ogolna regula obcinajaca ukosnik na koncu pliku. */
const regulaApache = (w) => {
  const bezUkosnika = w.p.replace(/\/$/, '');
  const wzorzec = bezUkosnika.replace(/^\//, '');
  if (w.kod === 410) return `  RewriteRule ^${wzorzec}/?$ - [G,L]`;
  if (w.cel === bezUkosnika)
    return `  # ${w.p} -> ${w.cel} (obsluguje ogolna regula obcinajaca ukosnik)`;
  return `  RewriteRule ^${wzorzec}/?$ ${w.cel} [R=301,L]`;
};

const apache = [
  naglowek('#'),
  '',
  '<IfModule mod_headers.c>',
  '  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"',
  '  Header always set X-Content-Type-Options "nosniff"',
  '  Header always set Referrer-Policy "strict-origin-when-cross-origin"',
  '  Header always set X-Frame-Options "SAMEORIGIN"',
  '  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"',
  '</IfModule>',
  '',
  '# RewriteRule, nie RedirectMatch: mod_rewrite wykonuje sie przed mod_alias,',
  '# wiec tylko tak stare adresy lapia 301 przed obcieciem ukosnika.',
  '<IfModule mod_rewrite.c>',
  '  RewriteEngine On',
  '',
  '  RewriteRule ^sitemap_index\\.xml$ /sitemap.xml [R=301,L]',
  '  RewriteRule ^wp-(content|includes|admin)/ - [G,L]',
  '  RewriteRule ^(wp-login\\.php|xmlrpc\\.php)$ - [G,L]',
  '',
  ...wynik.filter((w) => w.kod !== 0).map(regulaApache),
  '',
  '  # Jedna konwencja adresu: bez ukosnika na koncu, zgodnie z canonicalem.',
  '  # Na samym koncu - wczesniej obcielaby ukosnik starym adresom przed ich regulami.',
  '  RewriteRule ^(.+)/$ /$1 [R=301,L]',
  '</IfModule>',
  '',
].join('\n');

writeFileSync(`${KATALOG}/redirects.nginx.conf`, nginx, 'utf8');
writeFileSync(`${KATALOG}/redirects.htaccess`, apache, 'utf8');

console.log(`Stare adresy: ${stare.length}`);
console.log(`Przekierowań 301: ${wynik.filter((w) => w.kod === 301).length}`);
console.log(`Zwrotów 410: ${wynik.filter((w) => w.kod === 410).length}`);
const bledneCele = wynik.filter((w) => w.kod === 301 && !NOWE.has(w.cel) && w.cel !== '/');
if (bledneCele.length) {
  console.log(`
CELE SPOZA SITEMAPY (${bledneCele.length}) - sprawdź, czy taka strona istnieje:`);
  for (const w of bledneCele) console.log(`  ${w.p} -> ${w.cel}`);
}
if (nieobsluzone.length) {
  console.log(`\nBEZ REGUŁY (${nieobsluzone.length}) - dopisz je do REGUL:`);
  for (const w of nieobsluzone) console.log('  ' + w.p);
}
