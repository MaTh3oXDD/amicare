# SEO — migracja amicare.pl (WordPress → Angular)

Notatki do podmiany obecnej strony (WordPress + Yoast + Polylang, nginx/Plesk/PHP 8.4)
na aplikację Angular 20 z tego repo.

Data analizy: 2026-08-29

| Plik | Zawartość |
|---|---|
| `01-slabe-punkty.md` | Lista problemów z priorytetami, z odniesieniem do plików |
| `02-mapa-przekierowan.md` | 301 stary URL → nowy URL (~190 adresów z sitemapy WP) |
| `03-plan-dzialan.md` | Kolejność prac przed i po podmianie |
| `stare-urls.txt` | 182 adresy pobrane z sitemapy WordPressa (do testu przekierowań) |

Stan prac: sekcje **UKOŃCZONE** na końcu `01-slabe-punkty.md`.

Zrobione: prerender 91 tras do statycznego HTML-a, prawdziwa strona 404, wygenerowane
przekierowania (178 × 301, 3 × 410, zero adresów bez reguły) razem z nagłówkami bezpieczeństwa,
slugi ASCII, canonicale, `og:image` per strona, `BreadcrumbList` i `MedicalProcedure`,
godziny otwarcia w `MedicalClinic`, llms.txt, sitemapa generowana skryptem (59 → 90 adresów)
oraz zakładka `/o-nas/wspolpracujemy`.

Decyzja: **wersja EN nie wraca** - stare `/en/...` mają 301 na polskie odpowiedniki.

Zostaje: wybór hostingu (GitHub Pages nie zrobi 301), wdrożenie reguł na serwerze i decyzja
o 30 stronach jednostek chorobowych z badań klinicznych.

| Katalog | Zawartość |
|---|---|
| `serwer/redirects.nginx.conf` | gotowa konfiguracja dla nginx |
| `serwer/redirects.htaccess` | gotowa konfiguracja dla Apache |

Oba pliki generuje `npm run redirects` - nie edytuj ich ręcznie, popraw reguły w `scripts/redirects.mjs`.
