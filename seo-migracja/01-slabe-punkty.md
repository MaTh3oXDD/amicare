# Słabe punkty — nowa strona (Angular)

Priorytety: **KRYTYCZNY** blokuje indeksację · **WYSOKI** psuje pozycje · **ŚREDNI** traci potencjał · **NISKI** kosmetyka.

---

## KRYTYCZNE

### 1. ~~Brak SSR / prerenderu~~ — NAPRAWIONE, patrz sekcja UKONCZONE
`src/main.ts` robi zwykły `bootstrapApplication`, `src/index.html` ma w `<body>` samo `<app-root></app-root>`.
Tytuł, opis, canonical i JSON-LD dokłada dopiero `src/app/services/seo.ts` po starcie aplikacji.

Skutki:
- Googlebot renderuje JS, ale z opóźnieniem i bez gwarancji — dla strony medycznej (YMYL) to ryzyko.
- Boty bez JS widzą pustą stronę: Bingbot, GPTBot, PerplexityBot, ClaudeBot, Facebook/LinkedIn (podgląd linku
  weźmie tylko statyczne `og:` z `index.html`, czyli dla każdej podstrony ten sam opis strony głównej).
- Każdy adres oddaje ten sam pusty HTML — dla crawlera bez JS serwis ma jedną stronę.

Naprawa: `ng add @angular/ssr` i prerender wszystkich tras. Trasy są statyczne — slugi lekarzy,
specjalizacji, badań i placówek siedzą w kodzie (`src/app/models/placowka.ts`,
`src/app/pages/*/models/*-data.ts`, `zespol-detail.ts`), więc `getPrerenderParams` zbierze je bez API.
Efekt: gotowy HTML per adres, hostowany dalej jako statyk.

### 2. ~~Zero przekierowań~~ — REGUŁY WYGENEROWANE, zostaje wdrożenie na serwerze
Sitemapa WP zawiera ~190 adresów w strukturze, której w nowej stronie nie ma:
`/jestem-pacjentem/...`, `/amicare/badania-kliniczne/...`, `/amicare/badania-diagnostyczne/...`,
`/specjalizacja/...`, `/o-nas/zespol/kadra-zarzadzajaca/...`, `/en/...`.

Do tego `src/app/app.routes.ts` kończy się na:

```ts
{ path: '**', redirectTo: '' }
```

Każdy stary link oddaje stronę główną z kodem **HTTP 200**. Google zobaczy ~190 soft 404 zamiast
przeniesionej treści — moc linkowa ze starych adresów przepada w całości.

Naprawa: mapa 301 na poziomie serwera (`02-mapa-przekierowan.md`) plus `**` na osobny komponent 404
(docelowo prawdziwy status 404 z serwera).

### 3. Hosting: GitHub Pages nie uniesie tej migracji — DECYZJA PO TWOJEJ STRONIE
`angular.json` w konfiguracji `github-pages` ustawia `baseHref: "/amicare/"`, a canonicale i sitemapa
wskazują `https://amicare.pl/`. Do tego `scripts/pages-404.mjs` kopiuje `index.html` na `404.html` —
GitHub Pages oddaje go z **kodem 404**, więc każde wejście prosto na `/cennik` to dla bota strona nieznaleziona.
Pages nie potrafi też zrobić 301.

Naprawa: wypuścić stronę na tym samym nginx/Plesk, na którym stoi dziś WordPress.
`dist/amicare/browser/.htaccess` ma już poprawny fallback SPA i wymuszenie HTTPS — dla nginx trzeba
odpowiednika (`try_files $uri $uri/ /index.html;`) plus bloku z przekierowaniami.
Budować z `baseHref: "/"`, nie `/amicare/`.

### 4. ~~Wersja angielska~~ — ZDECYDOWANE: EN nie wraca
Polylang obsługiwał ~30 adresów `/en/...`. Nowa strona jest wyłącznie polska, `hreflang` nie jest
potrzebny - jeden język to brak alternatywnych wersji do zadeklarowania.

Wszystkie stare adresy EN mają przekierowania 301 w wygenerowanej konfiguracji serwera:
`/en/home/` i `/en/home-2/` na `/`, `/en/about-us/` na `/o-nas`, `/en/contact-us/` na `/kontakt`,
reszta (opisy jednostek chorobowych) na `/badania-kliniczne`.

Konsekwencja przyjęta świadomie: ruch z zapytań anglojęzycznych znika. Sponsorzy i CRO, którzy
korzystali z EN, trafią na polskie `/wspolpraca`.

---

## WYSOKIE

### 5. ~~Canonical nie zgadza sie z realnym adresem~~ - NAPRAWIONE po obu stronach

**W kodzie:** 23 wywolania `seo.set()` maja `path` bez koncowego ukosnika - statyczne
(`path: '/cennik'`) i dynamiczne (`` path: `/o-nas/zespol/${slug}` ``). Sprawdzone w zbudowanym
HTML-u: canonical, adres w routerze i wpis w sitemapie mowia to samo.

**Na serwerze:** sam canonical nie wystarcza. Prerender zapisuje kazda trase jako katalog
(`cennik/index.html`), wiec bez dodatkowej reguly `/cennik/` i `/cennik` oddawalyby to samo
z kodem 200 - dwa adresy, jedna tresc. Wygenerowane konfiguracje wymuszaja jedna forme:

```nginx
location / {
  rewrite ^/(.+)/$ /$1 permanent;
  try_files $uri $uri/index.html =404;
}
```

```apache
RewriteRule ^(.+)/$ /$1 [R=301,L]
```

Kolejnosc jest tu istotna i dlatego zmienilem sposob generowania regul dla Apache:

- Stare adresy WordPressa **koncza sie ukosnikiem**. Gdyby regula obcinajaca ukosnik zadzialala
  pierwsza, `/oferta/` stalby sie `/oferta` i przestal pasowac do wlasnej reguly 301 - konczylby 404.
- W Apache `mod_rewrite` wykonuje sie **przed** `mod_alias`, wiec mieszanie `RedirectMatch`
  z `RewriteRule` dawalo nieprzewidywalna kolejnosc. Caly plik uzywa teraz `RewriteRule`,
  a regula obcinajaca ukosnik stoi na samym koncu.
- W nginx `location = /oferta/` (dopasowanie dokladne) ma pierwszenstwo nad prefiksowym
  `location /`, wiec obciecie ukosnika siedzi wewnatrz fallbacku i nie wyprzedza regul 301.

Do tego generator wykrywa **petle 301 na samego siebie**: adres w rodzaju `/wspolpraca/`, ktory po
obcieciu ukosnika jest identyczny z celem, nie dostaje wlasnej reguly - zalatwia go regula ogolna.
Bez tego `RewriteRule ^wspolpraca/?$ /wspolpraca` przekierowywalby w kolko.

### 6. ~~Brak `<h1>`~~ — nieaktualne, sprawdzone błędnie
Pierwsza wersja tego audytu twierdziła, że `<h1>` brakuje na 26 szablonach. To był artefakt wyszukiwania:
`<h1>` renderuje komponent `app-page-hero` (`src/app/components/page-hero/page-hero.ts`), którego
używa 20 stron. Bez `<h1>` są tylko cztery pliki i słusznie — to okna dialogowe i widżety
(`zgloszenie-dialog`, `biogram-dialog`, `formularz-kontaktowy`, `aktualnosci`), nie osobne strony.

Zostaje jedna uwaga: `page-hero` renderuje też okruszki (`nav.hero__crumbs`), ale bez `BreadcrumbList`
w JSON-LD. Google nie zobaczy ich w wynikach. Rozwiązane, patrz sekcja „Ukończone".

### 7. ~~Sitemapa gubi 20+ adresów i ma połamane slugi~~ - NAPRAWIONE
Sitemapę generuje `scripts/sitemap.mjs` z tras i plików danych. Slugi przechodzą przez `slugify()`.
Stan: 90 adresów, każdy ma prerenderowaną stronę (sprawdzone diffem sitemapy z katalogiem `dist/`).

### 8. ~~16 obrazów bez `alt`~~ — nieaktualne, sprawdzone błędnie
Ponowne sprawdzenie parserem HTML zamiast `grep`: **każdy `<img>` w projekcie ma `alt`**.
Trzy przypadki używają wiązania `[alt]` (`aktualnosci.html:16`, `biogram-dialog.html:15`,
`zespol-detail.html:53`), reszta ma atrybut statyczny rozbity na kolejną linię — dlatego
poprzednie wyszukiwanie ich nie złapało.

### 9. ~~`og:image` jeden na całą stronę~~ - NAPRAWIONE
`seo.set()` przyjmuje `image`; lekarze mają swoje zdjęcie, placówki zdjęcie budynku.
Doszły `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

---

## ŚREDNIE

### 10. Schema.org - ZROBIONE poza `FAQPage`
Jest: `MedicalOrganization`, `MedicalClinic` (z `openingHoursSpecification`, `geo`, `hasMap`,
`postalCode`, `priceRange`), `Physician` (z `url`, `image`, `sameAs`, `description`),
`MedicalProcedure` na 6 stronach zabiegów (z `Offer` i ceną z cennika), `BreadcrumbList`
na wszystkich stronach zagnieżdżonych, `CollectionPage` + `ItemList` na „Współpracujemy".

Zostaje `FAQPage` - treść pytań i odpowiedzi musi pochodzić od kliniki.

### 11. Wydajność - CZĘŚCIOWO
Zrobione:
- `Bez tytułu.png` (992 KB) i `images/graphify-out/` przestały trafiać do buildu,
- three.js usunięty z zależności - nic go nie importowało,
- initial bundle: 68 KB (`main` + `polyfills`), z zapasem pod budżet 500 KB.

Zostaje:
- **Fonty Google** ładowane z zewnętrznego hosta blokują pierwszy render. Do zhostowania lokalnie
  (Archivo, Source Serif 4, IBM Plex Mono - wszystkie na OFL).
- **`wejscie-parking.webp` 298 KB** - element LCP strony głównej. Rekompresja nic nie da:
  przy q=85 plik rośnie, przy q=75 schodzi o 12% kosztem jakości. Realny zysk dałoby zmniejszenie
  wymiarów (dziś 1800×1201) albo `srcset` z wariantem 1200 px.
- **`amicare-bg.webp` 297 KB, 2560×1806** - nic go nie importuje. Do usunięcia po potwierdzeniu.

### 12. ~~Nagłówki bezpieczeństwa~~ - GOTOWE, czeka na wdrożenie
HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` i `Permissions-Policy`
są w `public/.htaccess` oraz w obu wygenerowanych plikach w `seo-migracja/serwer/`.
Zadziałają w momencie postawienia strony na docelowym serwerze.

### 13. Gotowość pod AI (GEO) - CZĘŚCIOWO
Zrobione: prerender (boty AI nie wykonują JS, więc bez niego widziałyby pustą stronę),
`llms.txt` z mapą treści, konkretne dane w schemacie - ceny, godziny, adresy, współrzędne.

Zostaje: sekcje pytań i odpowiedzi na stronach zabiegów (cytowalne akapity 40-60 słów).

---

## NISKIE - ZROBIONE
- `robots.txt` podmieniony: wskazuje `/sitemap.xml`, blokuje resztki WordPressa.
  Stara `sitemap_index.xml` dostaje 301 w konfiguracji serwera.
- `favicon.ico` zadeklarowany w `index.html` obok wariantu SVG.
- `theme-color` (#1d3f78) i `manifest.webmanifest` dodane.

---

## UKOŃCZONE

Zmiany wprowadzone w kodzie 2026-08-29. Build produkcyjny przechodzi
(`npx ng build --configuration production`), zostają tylko wcześniejsze ostrzeżenia o budżecie SCSS.

### ✅ Slugi lekarzy — ASCII zamiast kropek i polskich znaków
Nowy plik `src/app/utils/slug.ts` z funkcją `slugify()`. Podpięta w dwóch miejscach:
`zespol.ts` (generowanie linków) i `zespol-detail.ts` (dopasowanie po slugu z URL-a).

Efekt: `/o-nas/zespol/dr-n.med.-adam-rafał-poliwczak` → `/o-nas/zespol/dr-n-med-adam-rafal-poliwczak`.
Ten sam zapis miał stary WordPress, więc przekierowania 301 mapują się 1:1.

### ✅ Canonicale bez końcowego ukośnika
23 wywołania `seo.set()` — statyczne (`path: '/cennik'`) i dynamiczne
(`path: \`/o-nas/zespol/${slug}\``). Canonical, adres w routerze i wpis w sitemapie mówią teraz to samo.

### ✅ `og:image` i karty Twittera per strona
`src/app/services/seo.ts` przyjmuje opcjonalne `image` (ścieżka względna albo pełny URL)
i ustawia `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
Bez podanego obrazu wraca do `centrum-020.webp`. Domena wyciągnięta do stałej `DOMENA`.

Rozszerzone w rundzie 2: `image` przekazują `zespol-detail` i `placowka-detail`.

### ✅ `BreadcrumbList` w JSON-LD
`seo.setBreadcrumbs([{ nazwa, sciezka }])` buduje okruszki z „Strona główna" na początku.
Użyte na nowej stronie „Współpracujemy".

Rozszerzone w rundzie 2 na wszystkie strony zagnieżdżone: lekarzy, placówki, specjalizacje,
badania diagnostyczne i 6 podstron endoskopii.

### ✅ Sitemapa generowana skryptem
`scripts/sitemap.mjs` czyta trasy z `app.routes.ts` i slugi z plików danych
(`placowka.ts`, `specjalizacja-data.ts`, `diagnostyka-data.ts`, `doctor.ts`), po czym zapisuje
`public/sitemap.xml` z `lastmod` i priorytetami.

**59 → 90 adresów.** Doszły wszystkie podstrony endoskopii, wszystkie strony diagnostyczne,
poprawione slugi lekarzy i nowa strona „Współpracujemy".

Wpięte w `npm run build` i `npm run build:pages` w rundzie 2.

### ✅ Drobiazgi w `index.html`
`favicon.ico` zadeklarowany obok SVG, `theme-color` (#1d3f78, kolor z palety),
statyczny `canonical`, `twitter:card` i `twitter:image` dla botów, które nie wykonują JS.

### ✅ Nowa zakładka: O nas → Współpracujemy
Trasa `/o-nas/wspolpracujemy`, komponent w `src/app/pages/wspolpracujemy/`,
dane partnerów w `models/partnerzy.ts`. Podlinkowana z menu (grupa „O nas"), ze stopki
i z akapitu na `/o-nas`.

Zawartość: dwie grupy partnerów, JSON-LD `CollectionPage` + `ItemList` z organizacjami,
okruszki, linki wewnętrzne do cennika, endoskopii, diagnostyki, placówki na Romanowskiej
i strony `/wspolpraca`. Linki zewnętrzne z `target="_blank" rel="noopener"`.

**Ubezpieczyciele i operatorzy medyczni** (ze zrzutu): Allianz, Generali Zdrowie, JP Medica,
LUX MED, Medicover, POLMED, PZU Zdrowie, Saneo, Telemedi.

**Partnerzy w Łodzi:** Ostoja Seniora (apartamenty senioralne na Romanowie — kilka minut od
placówki przy Romanowskiej 55N), DASMED (transport medyczny 24/7 i opieka nad seniorami).

Adresy sprawdzone pod kątem tego, czy odpowiadają na żywo:

| Partner | Adres |
|---|---|
| Allianz | https://www.allianz.pl/ |
| Generali Zdrowie | https://www.generali.pl/ |
| JP Medica | https://jpmedica.com.pl/ |
| LUX MED | https://www.luxmed.pl/ |
| Medicover | https://www.medicover.pl/ |
| POLMED | https://www.polmed.pl/ |
| PZU Zdrowie | https://zdrowie.pzu.pl/ |
| Saneo | **brak — do uzupełnienia** |
| Telemedi | https://www.telemedi.com/ |
| Ostoja Seniora | https://ostoja-seniora.pl/ |
| DASMED | https://dasmed.pl/ |

Saneo zostawiłem bez linku — żadna z prób (`saneo.pl`, `saneo.com.pl`, `saneo.eu`) nie odpowiada
stroną firmy. Kafelek renderuje samą nazwę, wystarczy dopisać `url` w `partnerzy.ts`.

**Logo partnerów:** pole `logo` w `Partner` jest gotowe, ale puste — kafelki pokazują teraz nazwę
i opis. Żeby dodać grafiki, wrzuć pliki do `public/images/partnerzy/` i uzupełnij pole.
Przed publikacją cudzych znaków towarowych sprawdź warunki użycia u każdego partnera.

---

## UKOŃCZONE — runda 2 (2026-08-29)

### ✅ SSR / prerender — 91 tras jako gotowy HTML
Największa pozycja z listy krytycznych. Zrobione:

- `@angular/ssr` i `@angular/platform-server` w zależnościach; cały zestaw Angulara przypięty
  do wersji 20.3.26 (`-E`), bo mieszanka 20.3.26 i 20.3.30 blokowała instalację.
- `src/main.server.ts` — bootstrap z `BootstrapContext` (bez niego prerender wywala `NG0401`).
- `src/app/app.config.server.ts` — `provideServerRendering(withRoutes(serverRoutes))`.
- `src/app/app.routes.server.ts` — `RenderMode.Prerender` dla wszystkich tras, `getPrerenderParams`
  czyta slugi z tych samych plików danych co reszta aplikacji.
- `angular.json` — `outputMode: "static"`, `server: "src/main.server.ts"`.

Build daje katalog na trasę: `dist/amicare/browser/cennik/index.html` itd. Sprawdzone w wyniku:
`<h1>`, `<title>`, `description`, canonical i JSON-LD są w statycznym HTML-u, przed uruchomieniem JS.

Trzy rzeczy trzeba było odciąć od serwera, bo prerender wykonuje `ngAfterViewInit`:

| Miejsce | Problem | Rozwiązanie |
|---|---|---|
| `badania-kliniczne.ts` | `setInterval` karuzeli - aplikacja nigdy nie osiągała stanu stabilnego | `isPlatformBrowser` |
| `autolink-badania.ts` | `document` i `getComputedStyle` | pomijane na serwerze, dokłada się po hydracji |
| 6 stron endoskopii | `IntersectionObserver` (podświetlanie spisu treści) | `typeof IntersectionObserver === 'undefined'` |

Autolinkowanie „kolonoskopia"/„gastroskopia" nie trafia do prerenderowanego HTML-a. To wzbogacenie
tekstu, nie jego nośnik - właściwe linki kontekstowe są w treści stron. Gdyby miało być widoczne
dla botów, trzeba przepisać dyrektywę bez pomiaru układu.

### ✅ Prawdziwe 404 zamiast przekierowania na stronę główną
Nowy komponent `src/app/pages/nie-znaleziono/` z `noindex, follow` i listą sekcji, których pacjenci
szukają najczęściej. Trasa `**` prowadzi teraz do niego, nie na `/`.

`seo.set()` przy każdej normalnej stronie przywraca `robots: index, follow` - bez tego `noindex`
zostawałby po nawigacji z 404 na zwykłą podstronę.

`scripts/pages-404.mjs` kopiuje na `404.html` prerenderowaną stronę błędu, a nie stronę główną.

### ✅ Konfiguracja serwera generowana ze skryptu
`scripts/redirects.mjs` (`npm run redirects`) czyta `stare-urls.txt`, stosuje reguły i zapisuje:

- `seo-migracja/serwer/redirects.nginx.conf`
- `seo-migracja/serwer/redirects.htaccess`

Wynik: **181 starych adresów, 178 przekierowań 301, 3 zwroty 410, zero adresów bez reguły.**
Skrypt sprawdza też każdy cel względem nowej sitemapy - żadne 301 nie prowadzi w 404
(adresy osób spoza obecnego zespołu i usunięta spirometria lecą na strony nadrzędne).

Oba pliki zawierają nagłówki bezpieczeństwa (HSTS, `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy`) oraz 410 dla resztek WordPressa (`/wp-content/`,
`/wp-admin/`, `wp-login.php`, `xmlrpc.php`) i 301 ze starej `sitemap_index.xml`.

### ✅ Serwowanie prerenderu — `public/.htaccess` przepisany
Poprzednia wersja przepisywała każdy adres na `index.html`, co po włączeniu prerenderu oddawałoby
stronę główną zamiast właściwej podstrony. Teraz:

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.*?)/?$ /$1/index.html [L]
ErrorDocument 404 /404.html
```

Odpowiednik dla nginx w wygenerowanym pliku: `try_files $uri $uri/index.html $uri/ =404;`.
Adres spoza listy tras kończy prawdziwym 404, nie stroną główną z kodem 200.

### ✅ Schema.org — druga warstwa
- `BreadcrumbList` na wszystkich stronach zagnieżdżonych: lekarze, placówki, specjalizacje,
  badania diagnostyczne, 6 podstron endoskopii, „Współpracujemy".
- `MedicalProcedure` na każdej stronie zabiegu (`src/app/utils/schema-zabieg.ts`): `bodyLocation`,
  `preparation`, `howPerformed`, `provider` z pełnym adresem placówki na Romanowskiej.
- `MedicalClinic` w placówkach: doszły `openingHoursSpecification` (Google czyta ten format,
  nie samo `openingHours`) i `postalCode` wyciągany z adresu; `url` bez końcowego ukośnika.
- `Physician`: doszły `url`, `image`, `sameAs` (profil ZnanyLekarz), `description` i `availableService`;
  `medicalSpecialty` zamienione na `jobTitle`, bo pole trzyma opis stanowiska, nie kod specjalizacji.

### ✅ `og:image` na stronach szczegółowych
Lekarze dostają swoje zdjęcie, placówki - zdjęcie budynku. Wcześniej każdy udostępniony link
pokazywał to samo `centrum-020.webp`.

### ✅ llms.txt
`public/llms.txt` - mapa treści dla asystentów AI: sekcje, adresy, godziny otwarcia placówek,
telefon do rejestracji, zastrzeżenie o charakterze informacyjnym.

### ✅ robots.txt
Doszły blokady resztek WordPressa (`/wp-admin/`, `/wp-content/`, `/wp-includes/`).

### ✅ 992 KB zbędnego pliku przestało trafiać do buildu
`angular.json` ignorował `Bez tytułu.png` ze zwykłą spacją, a plik ma w nazwie spację niedzielącą
(U+00A0) - dlatego wzorzec nigdy nie pasował. Wpis poprawiony na faktyczną nazwę.

### ✅ Generowanie sitemapy wpięte w build
`npm run build` i `npm run build:pages` uruchamiają teraz `npm run sitemap`. Sitemapa nie może się
już rozjechać z trasami. Strona `/nie-znaleziono` jest z niej wyłączona - ma `noindex`.
Aktualny stan: **90 adresów**.

---

## UKOŃCZONE — runda 3 (2026-08-29)

- **`geo` i `hasMap` w `MedicalClinic`** — współrzędne obu łódzkich placówek zgeokodowane
  przez Nominatim (Romanowska 55N: 51.8065979, 19.3285587; Zgierska 249: 51.8259348, 19.4287425)
  i zapisane w `placowka.ts` jako opcjonalne pole `geo`. Jelenia Góra nie ma adresu publicznego,
  więc zostaje bez współrzędnych.
- **`Offer` z ceną przy `MedicalProcedure`** — wszystkie 6 zabiegów, ceny w dni powszednie
  z `specjalizacja-data.ts`: kolonoskopia 650, w analgosedacji 1000, w znieczuleniu ogólnym 1100,
  gastroskopia 550, w analgosedacji 900, w znieczuleniu ogólnym 1000 zł. `url` wskazuje na cennik.
- **three.js usunięty z zależności** — nic go nie importowało (`grep` po `src/` trafiał wyłącznie
  w komentarze o „three-stroke motif" w SCSS). Nie było go też w bundlu, więc to porządek
  w `package.json`, nie zysk na wadze.
- **`manifest.webmanifest`** — nazwa, kolory, ikony, `display: standalone`; podpięty w `index.html`.
- **`public/images/graphify-out/cache/stat-index.json` przestał trafiać do buildu** — 31 KB pliku
  cache z bezwzględnymi ścieżkami `C:\Users\...`, publicznie dostępnego. Wykluczony w `angular.json`.

---

## UKOŃCZONE — runda 4 (2026-08-29)

### ✅ Fonty hostowane lokalnie
Trzy rodziny (Archivo, Source Serif 4, IBM Plex Mono) na licencji OFL, pobrane jako woff2
i podane z własnej domeny. `index.html` nie odpytuje już `fonts.googleapis.com` ani
`fonts.gstatic.com` — zniknął blokujący arkusz i dwa połączenia do obcego hosta przed
pierwszym renderem.

- `public/fonts/` — 10 plików, 388 KB, zestaw latin + latin-ext (polskie diakrytyki).
- `src/fonts.scss` — deklaracje `@font-face`, wpięte przez `@use 'fonts'` w `styles.scss`.
- `index.html` — `preload` dwóch krojów używanych nad linią załamania.

Jedna pułapka: Archivo i Source Serif 4 to fonty **zmienne** — Google podaje ten sam plik pod
kilkoma wagami. Gdyby przepisać deklaracje jeden do jednego, wagi 500 i 600 renderowałyby się
identycznie jak 400. Dlatego `font-weight` jest podany zakresem (`400 600`, `400 700`).

### ✅ Warianty obrazów i `srcset`
`wejscie-parking.webp` (298 KB) to element LCP strony głównej. Rekompresja nic nie dawała, więc
doszły mniejsze warianty:

| Plik | Rozmiar | Gdzie |
|---|---|---|
| `wejscie-parking.webp` | 298 KB, 1800 px | największy wpis `srcset` |
| `wejscie-parking-1200.webp` | 158 KB | tło hero strony głównej i Pracowni Endoskopii |
| `wejscie-parking-800.webp` | 77 KB | hero na ekranach do 859 px |

Tło hero jest rozmyte (`blur(3px)`) i przykryte gradientem, więc pełne 1800 px nie wnosiło nic
poza wagą. `<img>` na `/kontakt` i `/o-nas` dostały `srcset` z `sizes`.

**`amicare-bg.webp`: 297 KB → 124 KB.** Zmniejszony z 2560 do 1920 px — dla tła to i tak więcej,
niż potrzebuje jakikolwiek ekran. Oryginał leży w katalogu scratchpad sesji, gdyby trzeba było
wrócić. Uwaga: nie znalazłem miejsca, w którym ten plik jest importowany (`grep` po `src/`
i po zbudowanym CSS/JS nie daje trafień) — zostawiam go zgodnie z Twoim potwierdzeniem, ale
warto sprawdzić, czy odwołanie nie zginęło przy jakimś refaktorze.

### ✅ Autolinkowanie działa przy prerenderze
Dyrektywa `autolink-badania` dokłada teraz linki do „kolonoskopii" i „gastroskopii" **przed**
uruchomieniem JS: **21 linków na 14 stronach** w statycznym HTML-u. Trzy rzeczy wymagały zmiany:

1. **Pomiar układu.** `getComputedStyle` istnieje tylko w przeglądarce. Przy prerenderze kontenery
   flex/grid rozpoznaje lista klas (`KLASY_UKLADU`) — powód pominięcia jest ten sam: wstrzyknięty
   `<a>` staje się osobnym elementem układu i rozbija wiersz.
2. **Moment uruchomienia.** `ngAfterViewInit` hosta `<main>` odpala się, zanim leniwa trasa
   wyrenderuje treść — stąd zero linków w pierwszym podejściu. Teraz wyzwalaczem jest
   `NavigationEnd`, tak samo w przeglądarce jak przy prerenderze.
3. **API DOM.** Serwerowy DOM nie ma `NodeFilter`, `ParentNode.append` ani `replaceWith`.
   Zastąpione stałymi numerycznymi ze specyfikacji oraz `appendChild` i `replaceChild`.

Hydracja nie jest włączona (`provideClientHydration` nie występuje w `app.config.ts`), więc
modyfikacja DOM na serwerze nie grozi rozjazdem — przeglądarka i tak renderuje wszystko od nowa
i dokłada te same linki. Gdybyś kiedyś włączał hydrację, ten punkt trzeba przemyśleć na nowo.

---

## UKOŃCZONE — runda 5 (2026-08-29)

### ✅ Logotypy partnerów na stronie „Współpracujemy"
Źródłem jest grafika, której AmiCare już używa na obecnej stronie:
`amicare.pl/wp-content/uploads/2026/06/2026_ubezpieczyciele.jpg` — siatka 3×3 z dziewięcioma
logotypami. Pobrana, pocięta na pojedyncze pliki, każdy przycięty do zawartości i przeskalowany
do wysokości 80 px.

DASMED pochodzi z `dasmed.pl` (logo w wersji 512 px, przezroczystość spłaszczona na biel).
Ostoja Seniora nie wystawia logotypu w statycznym HTML-u — kafelek pokazuje nazwę krojem
szeryfowym zamiast pustego miejsca.

`public/images/partnerzy/` — 10 plików, **60 KB razem**.

| | | |
|---|---|---|
| allianz 280×80 | generali-zdrowie 314×80 | jp-medica 236×80 |
| luxmed 166×80 | medicover 153×80 | polmed 306×80 |
| pzu-zdrowie 87×80 | saneo 215×80 | telemedi 384×80 |
| dasmed 80×80 | | |

Szczegóły wykonania:

- **Strefa logo ma stałą wysokość 44 px.** Proporcje plików są skrajnie różne (PZU jest kwadratowe,
  Telemedi prawie pięciokrotnie szersze niż wyższe) — bez tego kafelki rozjeżdżałyby się w pionie.
- **Każdy `<img>` ma `width` i `height`**, a szerokość jest zapisana w danych (`logoWidth`).
  Przeglądarka rezerwuje miejsce przed pobraniem pliku, więc układ nie skacze (CLS).
- **`loading="lazy"` i `decoding="async"`** — logotypy są poniżej pierwszego ekranu.
- **`alt` w formie „Logo Allianz"** — czytelne dla czytników ekranu, bez upychania fraz.
- **JSON-LD**: każda organizacja w `ItemList` ma teraz `logo` obok `name`, `description` i `url`.

Uwaga prawna bez zmian: to cudze znaki towarowe. Użycie na liście faktycznych partnerów jest
standardową praktyką, ale warunki korzystania z identyfikacji wizualnej warto potwierdzić
u każdego z podmiotów — zwłaszcza u ubezpieczycieli, którzy zwykle mają księgi znaku.

---

## UKOŃCZONE — runda 6 (2026-08-29)

### ✅ Wyścig w `ScrollReveal` — strony potrafiły zostać białe
Zgłoszone jako „na `/o-nas/wspolpracujemy` jest biało, tylko navbar i stopka". Treść była
w DOM (potwierdzone: 3 sekcje, 10 logotypów, 2670 znaków tekstu), ale z `opacity: 0`.

`.section` w `src/styles.scss` startuje niewidoczna i czeka na klasę `is-visible`, którą dokłada
`ScrollReveal` przez `IntersectionObserver`. Sekcja, której nikt nie zacznie obserwować, zostaje
niewidoczna **na zawsze** — nie odsłania jej nawet przewijanie.

Stary serwis uruchamiał obserwację dwa razy: raz w `ngAfterViewInit` komponentu głównego
i potem po każdym `NavigationEnd`. Trasy są leniwe, więc kolejność tych zdarzeń zależy od tego,
jak szybko doładuje się chunk podstrony:

- chunk wolniejszy → `NavigationEnd` pada po starcie serwisu → subskrypcja go łapie → działa,
- chunk szybszy → `NavigationEnd` pada **przed** startem serwisu → nikt nie obserwuje sekcji → biała strona.

Stąd pozorna losowość: strona główna działała, „Współpracujemy" nie.

Naprawa: `MutationObserver` na `document.body` obejmuje obserwacją każdą nową `.section`,
niezależnie od tego, kiedy Angular ją wyrenderuje. Zmiany DOM są zlepiane w jedno przejście
na klatkę (`requestAnimationFrame`), a oba obserwatory rozłączają się przez `DestroyRef`.

Sprawdzone Playwrightem na sześciu trasach — po naprawie każda odsłania pierwszą sekcję
od razu, a pozostałe przy przewijaniu:

| Trasa | Przed | Po |
|---|---|---|
| `/o-nas/wspolpracujemy` | 0/3, przewijanie nie pomaga | 1/3, po przewinięciu 3/3 |
| `/` | 0/4, po przewinięciu 4/4 | bez zmian (poprawnie) |
| `/o-nas`, `/kontakt`, `/pracownia-endoskopii` | 1/2 | bez zmian (poprawnie) |

To był błąd zastany, nie wprowadzony przy tej migracji — nowa podstrona tylko trafiła
w niekorzystny wariant wyścigu. Mógł dotykać dowolnej trasy, zależnie od czasu ładowania.

### ✅ Pusta komórka w siatce partnerów
Grupa „Partnerzy w Łodzi" ma dwóch partnerów przy trzech kolumnach. Siatka rysowała linie tłem
kontenera, więc puste miejsce świeciło szarym prostokątem. Teraz linie rysują obramowania
kafelków, a wolne miejsce zostaje białe.

---

## Co zostaje

### Wymaga Twojej decyzji

1. **Hosting i wdrożenie reguł 301** — odłożone, osobny serwer.
2. **30 stron jednostek chorobowych** z badań klinicznych — dziś wszystkie lecą na jedną stronę.
   Sprawdzić w GSC, czy generują wejścia; jeśli tak, odtworzyć jako `/badania-kliniczne/:jednostka`.
3. **18 specjalizacji bez odpowiednika** — to samo pytanie do GSC.
4. **Saneo** — brak działającej domeny, kafelek ma logo, ale nazwa nie jest linkiem.
5. **Ostoja Seniora** — jeśli masz plik logo, wrzuć do `public/images/partnerzy/ostoja-seniora.webp`
   i dopiszę `logo` w `partnerzy.ts`.

### Wymaga treści od kliniki

6. **FAQ na stronach zabiegów.** `FAQPage` daje pozycje w AI Overviews. Pytań i odpowiedzi
   nie wymyślę — to treść medyczna.

### Warte rozważenia

7. **`provideClientHydration()`** — dziś przeglądarka wyrzuca prerenderowany DOM i renderuje
   wszystko od zera.
8. **Efekt odsłaniania a treść.** `opacity: 0` w stanie wyjściowym oznacza, że każda awaria
   JavaScriptu zostawia użytkownika z białą stroną, mimo że HTML jest kompletny. Wariant
   odporniejszy: odsłanianie przez `@media (prefers-reduced-motion)` i klasę dokładaną na `<html>`
   przy starcie skryptu — bez skryptu treść po prostu zostaje widoczna.
9. **`kompleksowosc-01/02.webp` (168 i 164 KB) i `budynek.webp` (160 KB)** — warianty `srcset`.
