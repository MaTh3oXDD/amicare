# Plan działań

## Przed podmianą — bez tego nie publikować

1. **Zrzuć stan wyjściowy.** Eksport z Search Console: 16 miesięcy zapytań i stron, lista
   zaindeksowanych URL-i, raport „Strony". To jedyny punkt odniesienia po migracji.
   Sprawdź w GA4, które stare adresy dają ruch — one decydują, co warto odtworzyć.
2. ~~**Włącz SSR / prerender.**~~ **ZROBIONE** - 91 tras prerenderowanych, `outputMode: static`.
3. ~~**Napraw slugi**~~ **ZROBIONE** — (`zespol.ts:24`) — transliteracja, bez kropek i półpauz. Jedna funkcja
   `slugify()` dla linków, tras i sitemapy.
4. ~~**Zbuduj mapę 301**~~ **ZROBIONE** (`npm run redirects` -> `seo-migracja/serwer/`).
   Zostaje wgranie na serwer i test po `stare-urls.txt`.
5. ~~**Ujednolić ukośniki.**~~ **ZROBIONE w kodzie** — Canonical, sitemapa, linki wewnętrzne i przekierowania — jedna konwencja.
6. ~~**Wygeneruj sitemapę skryptem**~~ **ZROBIONE** (`node scripts/sitemap.mjs`) — z listy tras + slugów. 80+ adresów zamiast 59, z `lastmod`.
7. **Zmień hosting/build.** `baseHref: "/"`, publikacja na nginx/Plesk. GitHub Pages zostawić
   najwyżej jako środowisko podglądowe z `noindex`.
8. ~~Dodaj `<h1>`~~ — niepotrzebne, `app-page-hero` już je renderuje.
9. ~~Uzupełnij `alt`~~ — niepotrzebne, wszystkie obrazy mają `alt`.
10. ~~**Zdecyduj o EN**~~ **ZDECYDOWANE: EN nie wraca**, przekierowania 301 są w wygenerowanych regułach.
11. **Zdecyduj o stronach jednostek chorobowych** — 30 stron z własnymi frazami. Jeśli mają
    wracać, lepiej przed podmianą niż po.

## Dzień podmiany

1. Backup WordPressa (pliki + baza) — pozwala odtworzyć treść, jeśli czegoś zabraknie.
2. Publikacja nowej strony + reguły 301 w jednym kroku, nie osobno.
3. Podmiana `robots.txt` (bez blokad) i `sitemap.xml`.
4. Przetestować listę starych adresów skryptem.
5. Przesłać nową sitemapę w GSC, poprosić o indeksację 10 najważniejszych adresów.
6. Sprawdzić TLS, przekierowania `www` → apex i `http` → `https` (oba działają dziś, muszą dalej).
7. Uruchomić testy: Rich Results Test na 5 typach stron, PageSpeed Insights na home i `/pracownia-endoskopii/kolonoskopia`.

## Pierwszy tydzień po

- Codziennie: GSC → Strony → sprawdzać przyrost „Nie znaleziono (404)" i „Strona z przekierowaniem".
- Codziennie: logi serwera, `grep " 404 "` — wyłapać adresy spoza sitemapy WP (obrazy, PDF-y, stare linki z zewnątrz).
- Zaktualizować adres strony w Wizytówce Google, ZnanyLekarz, katalogach medycznych, mediach społecznościowych.
- Sprawdzić, czy linki zewnętrzne do starych adresów trafiają na 301, a nie na 404.

## Miesiąc 2 i dalej

- Dodać `BreadcrumbList`, `FAQPage` i `MedicalProcedure` (punkt 10 w `01-slabe-punkty.md`).
- Uzupełnić `openingHoursSpecification` i `geo` w `MedicalClinic` — to bezpośrednio wpływa na pakiet lokalny.
- Odtworzyć strony jednostek chorobowych, jeśli GSC pokaże utratę fraz.
- Sekcje pytań i odpowiedzi na stronach zabiegów.
- Porównać zapytania i pozycje z bazą sprzed migracji. Spadek 10–20% w pierwszych 2–4 tygodniach jest
  normalny; jeśli po 6 tygodniach nie wraca, szukać przyczyny w przekierowaniach i renderowaniu.

## Skrypt testowy przekierowań

```bash
# stare-urls.txt — pełna lista z sitemapy WP (pobrać przed podmianą)
while read u; do
  out=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$u")
  echo "$out  <-  $u"
done < stare-urls.txt | grep -v "^301" 
```

Pobranie listy przed migracją:

```bash
for s in $(curl -s https://amicare.pl/sitemap_index.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//'); do
  curl -s "$s" | grep -o '<loc>[^<]*' | sed 's/<loc>//'
done | sort -u > stare-urls.txt
```
