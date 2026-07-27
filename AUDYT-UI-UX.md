# Audyt UI/UX — AmiCare (lista zaczepek premium klienta)

Cel: strona ma wygladac idealnie, minimalistycznie, bez niespojnosci. Ponizej realne bledy znalezione w kodzie + checklist rzeczy do sprawdzenia przed pokazaniem klientowi.

## 1. Realne bledy znalezione w kodzie (do naprawy przed prezentacja)

### Zepsute/niezdefiniowane klasy CSS
- `.section--cream` uzywana w `specjalizacja.html:62`, `badania-kliniczne.html:52`, `o-nas.html:34`, `konsultacje.html:22`, `kontakt.html:33` — **klasa nie istnieje** w `styles.scss` (jest tylko `.section--tint`, `.section--dark`). Sekcja renderuje sie na bialo zamiast tinted tla. Powtarza sie na 5 stronach.
- `zespol-detail.html:63` — `btn btn--primary`, nie nalezy do globalnego systemu `.btn` (`--solid/--ghost/--light`). Dziala tylko bo `zespol-detail.scss:224` lokalnie reimplementuje wlasny przycisk od zera, kopiujac i psujac globalny wyglad.

### Kolory na sztywno zamiast zmiennych (design tokens)
`zespol-detail.scss` jedyny plik ktory calkowicie olewa `var(--c-*)` i wpisuje hexy:
- linia 30, 89, 140, 209, 219, 227, 244, 257, 270: `#0b4f8c` (7+ powtorzen "wlasnego" niebieskiego, ktorego nie ma w `:root`)
- linia 33, 165: `#e8f0f7` (brak odpowiadajacego tokena)
- linia 40, 76, 105, 133: `#2d3e50` (powinno byc `var(--c-ink)`)
- linia 99: `#e0e0e0`, linia 124: `#f0f0f0` — dwa rozne szarości tam gdzie powinien byc jeden `var(--c-mist)`
- linia 179: `#f8f9fa` — kolejny, nigdzie indziej nieuzywany szary
- linia 202: `#6c757d` (powinno byc `var(--c-ink-soft)`)
- linia 240 (hover): `#093962` — czwarty, jednorazowy odcien navy, niepowiazany z `var(--c-pine)` uzywanym w hoverach `.btn--solid` wszedzie indziej

**Efekt:** podstrona lekarza ma inny odcien niebieskiego (`#0b4f8c`) niz reszta strony (`--c-navy: #152a52`). Widac to od razu przy skoku miedzy podstronami.

### Niespojna skala typografii
- `zespol-detail.scss` uzywa wlasnych `rem` (0.75/1/1.1/0.95/2/2.5) zamiast globalnej skali `h1-h3` z `clamp()` (`styles.scss:77-79`) — naglowki na tej podstronie nie beda match'owac wysokosci innych stron.
- Zdublowane `font-size` na tym samym selektorze (nadpisuja sie nawzajem, martwy kod): `.doctor-detail__subheading` (linie 87 i 93), `.doctor-detail__section-title` (linie 103 i 109) — wyglada jak kopiuj-wklej bez sprzatania.
- `.doctor-detail__subheading`/`.doctor-detail__section-title` nie dziedzicza `var(--font-display)` — font moze byc inny niz reszta naglowkow (Fraunces vs default).

### Border-radius — niespojnosc "premium minimal" (ostre kanty)
- Globalny `.btn` = `border-radius: 0` (sygnaturowy ostry look, widoczny na home/specjalizacja/placowka/wspolpraca).
- `zespol-detail.scss:34,166,230` = `border-radius: 2px` — wizualnie prawie nieodrozniane od 0, ale to niekontrolowana niespojnosc, ktora wyjdzie na screenshot-diffie designera.

### Focus states — rozne kolory ringu
- Global `:focus-visible` = `outline: 2px solid var(--c-bronze)` (`styles.scss:88-91`).
- `zespol-detail.scss:218,243,269` reimplementuje wlasny focus z `#0b4f8c` (navy) zamiast bronze — inny kolor fokusa tylko na jednej podstronie.

### Niespojnosc numeru telefonu
- Wszedzie: `+48 42 28 90 250` (home.ts, specjalizacja.html, placowka-detail.html, zespol-detail.html).
- `wspolpraca.html:58` i `regulamin-platnosci.html:76`: `+48 42 639 49 44` — jesli to inna linia (np. dzial wspolpracy), **nic w UI tego nie tlumaczy** — wyglada jak literowka/blad.

### Accessibility / obrazy
- `zespol-detail.html:49` — `<img>` bez `width`/`height` (w przeciwienstwie do `home.html:106-107` i `placowka-detail.html:43`, ktore je maja przez CLS). Ryzyko layout shift.
- `zespol-detail.html:49` — `loading="eager"` mimo ze zdjecie jest below-the-fold na mobile (grid staje sie 1-kolumnowy < 768px). `home.html` poprawnie uzywa `loading="lazy"` dla analogicznego zdjecia.

### Inline style zamiast klas
- `wspolpraca.html:16,35` — `style="margin-top: 1.5rem; margin-bottom: 0.75rem"` wpisane bezposrednio w HTML, 2x zdublowane wartosci. Powinno byc klasa/token.

### Literowki i jezyk
- `regulamin-platnosci.html:20` — "szeroký" zamiast "szeroki".
- `wspolpraca.html:33` — "Infrastructure" (angielskie) w polskim tekscie zamiast "Infrastruktura".

### SEO
- `index.html:16` — tylko `<link rel="icon" ... logo.png>`, brak `apple-touch-icon`, brak SVG favicon, brak manifest.
- Trzeba sprawdzic czy serwis `Seo.set()` faktycznie wstrzykuje `og:title`/`og:description`/`og:url` per-strona, bo `index.html` ma tylko statyczne domyslne `og:site_name/type/locale/image` — jesli serwis tego nie robi, wszystkie podstrony maja ten sam generyczny podglad w social media.
- `zespol-detail.ts:84` — meta description powtarza `d.title` dwa razy w tym samym szablonie dla kazdego lekarza — moze wygladac jak duplicate/keyword-stuffed content w Google.

### Niespojnosc komponentow
- `zespol-detail.html` ma wlasna tabele cennika (`.doctor-detail__price-list`, flex rows) zamiast reuzywac `table.cennik` (uzywana w `specjalizacja.html:33`, stylowana w `styles.scss:188-218`, z monospace kolumna cen). Dwa rozne systemy prezentacji "usluga: cena" na jednej stronie.

---

## 2. Ogolny checklist — czego moze sie czepic wymagajacy klient

### Typografia
- [ ] Jedna skala rozmiarow naglowkow (h1-h6) na kazdej podstronie, ta sama na mobile/desktop proporcjonalnie
- [ ] Max 2 fonty (display + body), spojne wagi (nie mieszac 400/500/600 bez systemu)
- [ ] Line-height spojny w akapitach (1.5-1.7 dla body text)
- [ ] Brak "sierotek" i "wdow" w naglowkach na kluczowych sekcjach
- [ ] Wszystkie teksty PL bez literowek, bez angielskich wtretow

### Kolor
- [ ] Zero hardcoded hexow poza plikiem zmiennych — wszystko przez `var(--c-*)`
- [ ] Kontrast tekst/tlo min. WCAG AA (4.5:1 dla body, 3:1 dla duzego tekstu)
- [ ] Jeden kolor focus-ring w calej aplikacji
- [ ] Jeden kolor hover dla przyciskow tego samego typu

### Spacing / layout
- [ ] Odstepy sekcji (padding/margin) na jednej skali (np. 8px grid), zero inline `style="margin..."`
- [ ] Siatki (`grid--2/3/4`) uzywane spojnie, bez lokalnych one-off gridow
- [ ] Wyrownanie elementow (tekst, przyciski, karty) identyczne miedzy analogicznymi sekcjami na roznych podstronach

### Komponenty
- [ ] Jeden system przyciskow (`--solid/--ghost/--light`), zero lokalnych `.btn--primary` itp.
- [ ] Jeden border-radius dla danego typu elementu (przyciski, karty, zdjecia) — bez losowych 2px vs 0
- [ ] Cienie (`box-shadow`) z jednej, ograniczonej palety (np. 2-3 poziomy elevation)
- [ ] Tabele/cenniki na jednym komponencie, nie duplikowane rownolegle wersje

### Obrazy / media
- [ ] Kazdy `<img>` ma `width`/`height` (zapobiega CLS)
- [ ] `loading="lazy"` dla obrazkow below-the-fold, `eager`/`priority` tylko dla hero
- [ ] Format webp/avif, kompresja, brak przeskalowanych "z palca" duzych plikow
- [ ] Alt text opisowy (nie samo imie/nazwisko tam gdzie zdjecie niesie wiecej kontekstu)

### Interakcje / motion
- [ ] Spojne czasy/easing transition (np. wszystkie hover 150-200ms ease)
- [ ] `:focus-visible` widoczny na kazdym interaktywnym elemencie, ten sam styl wszedzie
- [ ] Stany hover/active/disabled zdefiniowane dla kazdego przycisku i linku

### Responsywnosc
- [ ] Testowane na 375px, 768px, 1024px, 1440px+ — bez poziomego scrolla, bez nachodzacych elementow
- [ ] Below-the-fold elementy faktycznie below-the-fold na kazdym breakpointcie (nie zalozenie z desktopu)
- [ ] Touch targets min. 44x44px na mobile

### Tresc / copy
- [ ] Spojny ton i dlugosc opisow miedzy analogicznymi podstronami (np. wszyscy lekarze, wszystkie specjalizacje)
- [ ] Numery telefonu/adresy/e-maile identyczne wszedzie tam gdzie powinny byc te same; jesli rozne (np. inny dzial) — jasno opisane w UI
- [ ] Brak placeholder/"lorem" tekstow, brak TODO w kodzie renderowanym userowi

### SEO / meta
- [ ] Unikalny `title` i `description` per podstrona (nie szablon powtarzajacy te sama fraze)
- [ ] `og:title`, `og:description`, `og:url`, `og:image` realnie wstrzykiwane per-route, nie tylko domyslne z `index.html`
- [ ] Pelny zestaw favicon (png, apple-touch-icon, ewentualnie svg + manifest)
- [ ] Strukturalne dane (JSON-LD) spojne i bez duplikacji

### Ogolne QA
- [ ] Konsola przegladarki czysta (brak bledow/warningow Angulara, brak 404 na assety)
- [ ] Lighthouse: Performance/Accessibility/Best Practices/SEO — kazdy >90
- [ ] Test klawiatura-only (tab przez cala strone, wszystko dostepne i widoczne co ma fokus)
- [ ] Test na Safari (czesty blind spot: `aspect-ratio`, `gap` we flexbox, `clamp()`)

---

## Priorytet napraw przed pokazaniem klientowi

1. `zespol-detail.scss` — przepisac na design tokens + globalny `.btn` + wspolna tabela cennika (najwiekszy, najbardziej widoczny problem)
2. Dodac `.section--cream` do `styles.scss` albo podmienic wszystkie 5 uzyc na `.section--tint`
3. Wyjasnic/ujednolicic numer telefonu na `wspolpraca.html` i `regulamin-platnosci.html`
4. Literowki: "szeroký" → "szeroki", "Infrastructure" → "Infrastruktura"
5. `width`/`height` + `loading="lazy"` na `zespol-detail.html:49`
6. Sprawdzic realne dzialanie `Seo.set()` dla og-tagow
