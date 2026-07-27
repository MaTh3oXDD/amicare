# Audyt strony AmiCare — bledy i poprawki graficzne

Pelny przeglad calego serwisu (17 podstron, wszystkie komponenty wspoldzielone, `src/styles.scss`).
Design system: tokeny w `styles.scss` (`--c-ink`, `--c-navy`/`--c-evergreen`, `--c-steel`/`--c-pine`, `--c-green`, `--c-porcelain`, `--c-mist`, `--c-bronze`, fonty Fraunces/Archivo/IBM Plex Mono), `.btn` (`--solid/--ghost/--light`, sharp corners `radius:0` — to celowy sygnaturowy wyglad), `.section`/`--tint`/`--dark`/`--cream`, `table.cennik`.

## 1. Zepsute atrybuty HTML (cudzyslowy typograficzne)

Ten sam bug co wczesniej znaleziony na `badania-kliniczne.html` (`class=”x”` zamiast `class="x"`, przez co przegladarka nie parsuje atrybutu) **nie wystepuje juz nigdzie indziej** — pelny skan calego zrodla nie znalazl kolejnych przypadkow. Pozostale wystapienia cudzyslowow typograficznych sa poprawnym uzyciem w tresci polskiej (np. `o-nas.html:16`, cytaty w `zespol/models/biogramy.ts`).

Brak niezamknietych tagow, zdublowanych atrybutow, niesparowanych blokow `@if`/`@for`.

## 2. Kolory na sztywno zamiast tokenow (`var(--c-*)`)

| Plik:linia | Wartosc |
|---|---|
| `components/header/header.scss:24` | `#c2d0e6` |
| `components/header/header.scss:27,91,122,174` | `#fff` |
| `components/footer/footer.scss:3,8` | `#c2cede` |
| `components/footer/footer.scss:12` | `#e4eaf3` |
| `components/footer/footer.scss:33` | `#fff` |
| `pages/badania-diagnostyczne/badania-diagnostyczne.scss:2` | `#fff` |
| `pages/konsultacje/konsultacje.scss:4,41` | `#fff` |
| `pages/home/home.scss:46,50-52,63` | `#8fd86e` (gradient, 5x) |
| `pages/home/home.scss:57,85` | `#fff` |
| `pages/home/home.scss:71,82` | `#c2d0e6` |
| `pages/badania-kliniczne/badania-kliniczne.scss:14,31` | `#fff` |
| `pages/specjalizacja/specjalizacja.scss:45` | `#fff` |
| `pages/kontakt/components/formularz-kontaktowy/formularz-kontaktowy.scss:24` | `#fff` |
| `components/doctor-card/doctor-card.ts:26` | `#fff` (inline style component) |
| `components/placowka-card/placowka-card.ts:33` | `#fff` |
| `pages/badania-kliniczne/components/study-card/study-card.ts:20` | `#fff` |
| `styles.scss:139,204-207` | `#fff` — **nawet plik ze zrodlem tokenow lamie wlasna zasade**, powinno byc `var(--c-white)` |

`#8fd86e` w home.scss to zupelnie nowy, nigdzie indziej niezdefiniowany odcien zieleni (`--c-green` to `#57b33a`) — realne odchylenie od palety, nie tylko literowka techniczna.

## 3. Border-radius rozny od 0 (lamie sygnaturowy ostry wyglad)

- `components/header/header.scss:86` — `.header__cta { border-radius: 2px; }`
- `pages/o-nas/o-nas.scss:5` — `.block img { border-radius: 2px; }`
- `pages/kontakt/components/formularz-kontaktowy/formularz-kontaktowy.scss:23` — inputy formularza `border-radius: 2px;`
- `pages/zespol/components/biogram-dialog/biogram-dialog.scss:64` — `img { border-radius: 2px; }`

Wszystkie inne wystapienia `border-radius` w calym projekcie sa poprawnie `0`.

## 4. Inline `style="..."` w szablonach

Brak — wszystkie wczesniej znalezione (wspolpraca.html) juz naprawione. Zaden `.html` w calym projekcie nie ma teraz inline style.

## 5. Obrazy — brak width/height / loading

- `pages/home/home.html:2-8` — hero `img` (`centrum-020.webp`) bez `width`/`height`
- `components/doctor-card/doctor-card.ts:9` — brak `width`/`height` (tylko CSS `aspect-ratio`)
- `pages/badania-kliniczne/components/study-card/study-card.ts:8` — brak `width`/`height`
- `pages/home/components/aktualnosci/aktualnosci.html:16` — karuzela `img` bez `width`/`height`
- `pages/placowki/placowka-detail/placowka-detail.html:43` — obraz above-the-fold ma `width`/`height`, ale **brak atrybutu `loading`** w ogole (niespojne z `home.html` gdzie hero ma `fetchpriority="high"`, i z `o-nas.html` gdzie podobny below-fold obraz ma jawne `loading="lazy"`)

## 6. Alt text

Bez zastrzezen — opisowy wszedzie, poza celowo dekoracyjnym `alt=""` + `aria-hidden="true"` w tle hero (`home.html:5`), co jest poprawna praktyka.

## 7. Dostepnosc (accessibility)

Ogolnie solidnie: przyciski/linki icon-only maja `aria-label` (burger w headerze, strzalki/kropki karuzeli faz, przyciski zamkniecia dialogow, nawigacja aktualnosci). Pola formularzy maja `<label>` opakowujace (formularz-kontaktowy, zgloszenie-dialog).

Drobne:
- `components/header/header.html:35` — `aria-label="Rozwiń: {{ g.label }}"` uzywa interpolacji w statycznym atrybucie zamiast `[attr.aria-label]`, dziala ale niespojne stylistycznie z sasiednim `[attr.aria-expanded]`.

Brak przypadkow rozroznien wylacznie kolorem.

## 8. Literowki / tresc

- `pages/zespol/models/biogramy.ts` — **systemowy brak spacji przed nawiasem otwierajacym**, powtarzajacy sie dziesiatki razy w calym pliku, np. linie 4, 9, 14, 15, 22: `kardiologii( od 2009 r.)`, `chorób wewnętrznych(od 2006r.)`, `Przez kolejne lata(2009 -2018 r.)`, `Hiperlipidemia(2005 – 2007r.)`. Linia 12: spacja przed srednikiem (`2004 ; sprawował`). Linia 22: podwojna spacja + wielka litera "I" w srodku zdania zamiast malej "i" (polski spojnik). Wyglada jak surowy import tekstu bez czyszczenia — warto przejsc caly plik (~35 biogramow) osobno.
- `pages/specjalizacja/models/specjalizacja-data.ts:123` — `Dr n.med. Krzysztof Grzegorczyk` — brak spacji w "n.med." niespojny z reszta tablicy gdzie jest "n. med." (linie 115, 119, 121, 124).
- `pages/badania-diagnostyczne/badania-diagnostyczne.ts:26` — "Leczenie biologiczne" wsrod "Badan diagnostycznych" — to terapia, nie badanie diagnostyczne, blad kategoryzacji tresci.
- `pages/regulamin-platnosci/regulamin-platnosci.html:15` (i `polityka-prywatnosci.html`) — siedziba rejestrowa "SĄD REJONOWY SZCZECIN-CENTRUM W SZCZECINIE" podczas gdy AmiCare dziala i ma siedziby w Łodzi — to prawdopodobnie poprawne (siedziba rejestrowa spolki moze byc inna niz adresy dzialalnosci), ale warto zeby klient to potwierdzil, bo tekst zostal skopiowany 1:1 z amicare.pl/informacja-rodo/.
- Numery telefonu sa spojne: `+48 42 28 90 250` (ogolny), `+48 786 086 331` (badania kliniczne), `+48 42 639 49 44` (wspolpraca/CRO/reklamacje) — kazdy powtarza sie identycznie wszedzie gdzie wystepuje.

## 9. Linki

Brak `href="#"`, pustych `href` lub `routerLink`. Wszystkie trasy zweryfikowane wzgledem `app.routes.ts`, w tym dynamiczne (`/placowki/:slug`, `/o-nas/zespol/:slug`, `/konsultacje-specjalistyczne/:slug`) — dzialaja poprawnie.

Drobna uwaga SEO/higiena URL: `zespol.ts:24` i `zespol-detail.ts:62` generuja slug lekarza przez `name.toLowerCase().replace(/\s+/g, '-')` bez usuwania kropek/dywizow/znakow diakrytycznych — np. `/o-nas/zespol/dr-n.med.-jacek-przybyła` zawiera kropki i polskie znaki w URL. Dziala (obie strony uzywaja tej samej funkcji), ale to zla praktyka SEO.

## 10. Zdublowany/martwy CSS

Nie znaleziono zdublowanych deklaracji na tym samym selektorze ani oczywistych martwych klas w przejrzanych plikach (styles.scss, header/footer, zespol-detail.scss, komponenty kart). Pelny audyt nieuzywanych klas wymagalby narzedzia typu PurgeCSS (nie uruchomione).

## 11. SEO — wywolanie `seo.set()`

Wszystkie 15 routowanych stron wywoluje `seo.set()`. Trzy strony ze slug-based routingiem (`zespol-detail.ts`, `placowka-detail.ts`, `specjalizacja.ts`) robia to w konstruktorze przez `toObservable().subscribe()` zamiast `ngOnInit` — funkcjonalnie OK (tresc zalezy od sygnalu/slug), ale niespojne z konwencja reszty stron.

---

## Priorytet napraw

1. **Kolory na sztywno** — najwiekszy wolumen (17+ miejsc), w tym `#8fd86e` w home.scss ktory jest realnie innym odcieniem zieleni niz `--c-green`
2. **`biogramy.ts`** — literowki/brakujace spacje w ~35 biogramach, widoczne bezposrednio na stronach lekarzy
3. **Border-radius 2px** w 4 miejscach — psuje spojnosc ostrych krawedzi
4. **`placowka-detail.html:43`** — dodac `loading` do obrazu above-the-fold
5. **Obrazy bez width/height** (home hero, doctor-card, study-card, aktualnosci) — ryzyko CLS
6. **Slug lekarzy z kropkami/diakrytykami w URL** — do wyczyszczenia dla SEO
