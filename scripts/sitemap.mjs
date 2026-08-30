/* Generuje public/sitemap.xml z tras Angulara i danych w src/.
   Ręczne utrzymywanie sitemapy zawsze się rozjeżdża - poprzednia wersja gubiła
   podstrony endoskopii i całe /badania-diagnostyczne/:slug.
   Uruchomienie: node scripts/sitemap.mjs */
import { readFileSync, writeFileSync } from 'node:fs';

const DOMENA = 'https://amicare.pl';
const WYJSCIE = 'public/sitemap.xml';

/** Kopia src/app/utils/slug.ts - skrypt nie ma jak zaimportować TypeScriptu. */
const ZNAKI = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (z) => ZNAKI[z] ?? z)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const czytaj = (p) => readFileSync(p, 'utf8');
const wyciagnij = (plik, wzorzec) => [...czytaj(plik).matchAll(wzorzec)].map((m) => m[1]);

/* Trasy statyczne prosto z routera - bez parametrów i bez wildcardu. */
/* nie-znaleziono ma noindex - w sitemapie byłoby sprzecznym sygnałem. */
const POMIJANE = new Set(['**', 'nie-znaleziono']);
const trasyStatyczne = wyciagnij('src/app/app.routes.ts', /path: '([^']*)'/g).filter(
  (p) => !p.includes(':') && !POMIJANE.has(p),
);

const placowki = wyciagnij('src/app/models/placowka.ts', /slug: '([^']+)'/g);
const specjalizacje = wyciagnij(
  'src/app/pages/specjalizacja/models/specjalizacja-data.ts',
  /slug: '([^']+)'/g,
);
const diagnostyka = wyciagnij(
  'src/app/pages/badania-diagnostyczne/models/diagnostyka-data.ts',
  /slug: '([^']+)'/g,
);
/* Slug ma tylko badanie z opisem - pozostałe nie mają własnej strony. */
const badaniaKliniczne = wyciagnij(
  'src/app/pages/badania-kliniczne/models/study.ts',
  /^\s+slug: '([^']+)'/gm,
);
/* Dietetycy pokazują się na stronie specjalizacji, ale zespol-detail ich nie obsługuje -
   w sitemapie byłyby adresy bez strony. Bierzemy tylko grupy, które mają własne podstrony. */
const GRUPY_Z_PODSTRONAMI = ['LEKARZE', 'KADRA', 'KOORDYNATORZY', 'PIELEGNIARKI'];
const zrodloZespolu = czytaj('src/app/models/doctor.ts');
const lekarze = GRUPY_Z_PODSTRONAMI.flatMap((grupa) => {
  const start = zrodloZespolu.indexOf(`export const ${grupa}`);
  if (start === -1) return [];
  const nastepna = zrodloZespolu.indexOf('export const ', start + 1);
  const blok = zrodloZespolu.slice(start, nastepna === -1 ? undefined : nastepna);
  return [...blok.matchAll(/name: '([^']+)'/g)].map((m) => slugify(m[1]));
});

/* Priorytet zależy od tego, jak blisko konwersji jest strona. */
const priorytet = (sciezka) => {
  if (sciezka === '/') return '1.0';
  if (/^\/(cennik|kontakt|placowki|pracownia-endoskopii|konsultacje-specjalistyczne|badania-kliniczne)$/.test(sciezka))
    return '0.9';
  if (sciezka.startsWith('/pracownia-endoskopii/')) return '0.9';
  if (sciezka.startsWith('/konsultacje-specjalistyczne/')) return '0.8';
  if (sciezka.startsWith('/badania-kliniczne/')) return '0.9';
  if (sciezka.startsWith('/badania-diagnostyczne')) return '0.8';
  if (sciezka.startsWith('/placowki/')) return '0.8';
  if (sciezka.startsWith('/o-nas/zespol/')) return '0.5';
  if (/^\/(polityka-prywatnosci|regulamin-platnosci)$/.test(sciezka)) return '0.3';
  return '0.7';
};

const sciezki = [
  ...trasyStatyczne.map((p) => (p === '' ? '/' : `/${p}`)),
  ...placowki.map((s) => `/placowki/${s}`),
  ...specjalizacje.map((s) => `/konsultacje-specjalistyczne/${s}`),
  ...diagnostyka.map((s) => `/badania-diagnostyczne/${s}`),
  ...badaniaKliniczne.map((s) => `/badania-kliniczne/${s}`),
  ...lekarze.map((s) => `/o-nas/zespol/${s}`),
];

const unikalne = [...new Set(sciezki)].sort();
const data = new Date().toISOString().slice(0, 10);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...unikalne.map(
    (s) =>
      `  <url><loc>${DOMENA}${s}</loc><lastmod>${data}</lastmod><priority>${priorytet(s)}</priority></url>`,
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(WYJSCIE, xml, 'utf8');
console.log(`${WYJSCIE}: ${unikalne.length} adresów`);
