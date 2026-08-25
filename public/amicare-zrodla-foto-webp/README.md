# Zdjęcia źródłowe (WebP)

Archiwum robocze zdjęć od fotografa, przekonwertowane do WebP.
**To jest folder, z którego się korzysta.**

## Skąd brać zdjęcia

| Potrzebujesz | Folder |
|---|---|
| zdjęcia do wstawienia na stronę | **`public/amicare-zrodla-foto-webp/`** (ten) |
| zdjęcia gotowe, już użyte na stronie | `public/images/` |
| oryginalne JPG-i od fotografa | `public/amicare-zrodla-foto/` - tylko lokalnie, poza repozytorium |

Stary folder `amicare-zrodla-foto/` jest w `.gitignore`, więc po sklonowaniu
repozytorium w ogóle go nie ma. Oryginały leżą u Mateusza na dysku i służą
wyłącznie jako materiał źródłowy, gdyby trzeba było przekonwertować od nowa.

## Zawartość

- `zdjeciaOdFotografa/` - 114 plików
- `zespolNowe/` - 46 plików

Konwersja: WebP, jakość 82, z korektą orientacji z EXIF.
Nazwy plików odpowiadają oryginałom, zmienia się tylko rozszerzenie.

## Jak dodać zdjęcie na stronę

1. Wybierz plik z tego folderu.
2. Skopiuj do `public/images/` (podkatalog wg tematu: `badania/`, `zespol/`,
   `przychodnia/`), nadając czytelną nazwę, np. `zespol/anna-kowalska.webp`.
3. Odwołuj się w kodzie ścieżką bez `public/`, czyli `images/zespol/anna-kowalska.webp`.

Ten folder nie trafia do builda - `angular.json` wyklucza go z kopiowanych
zasobów, żeby 198 MB nie lądowało na serwerze przy każdym wdrożeniu.
