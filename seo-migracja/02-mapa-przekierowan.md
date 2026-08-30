# Mapa przekierowań 301 (WordPress → Angular)

Źródło: `https://amicare.pl/sitemap_index.xml` (page-sitemap + category-sitemap + wp_jac_slide-sitemap),
pobrane 2026-08-29. Razem ~190 adresów.

Zasady:
- Każdy stary adres kończy się ukośnikiem (WP), nowe trasy Angulara nie mają ukośnika.
  Zdecydować jedną konwencję i trzymać ją też w canonicalach (patrz punkt 5 w `01-slabe-punkty.md`).
- Docelowe slugi lekarzy zapisano w wersji ASCII. **Zrobione** — `src/app/utils/slug.ts`
  generuje dokładnie takie adresy, więc tabele niżej działają bez zmian.
- Nigdy nie kieruj wszystkiego na stronę główną. Google traktuje masowe 301 na `/` jak soft 404.

---

## 1. Strony główne i sekcje

| Stary | Nowy |
|---|---|
| `/oferta/` | `/konsultacje-specjalistyczne` |
| `/o-nas/` | `/o-nas` |
| `/o-nas/zespol/` | `/o-nas/zespol` |
| `/kontakt/` | `/kontakt` |
| `/wspolpraca/` | `/wspolpraca` |
| `/wspolpracujemy/` | `/o-nas/wspolpracujemy` |
| `/sponsorzy/` | `/wspolpraca` |
| `/pracownia-endoskopii/` | `/pracownia-endoskopii` |
| `/konsultacje-specjalistyczne/` | `/konsultacje-specjalistyczne` |
| `/jestem-pacjentem/` | `/konsultacje-specjalistyczne` |
| `/jestem-pacjentem/co-oferujemy/` | `/badania-kliniczne` |
| `/jestem-pacjentem/gabinety-prywatne/` | `/konsultacje-specjalistyczne` |
| `/amicare/amicare-specjalizacje-kompleksowe-badania-i-opieka-zdrowotna/` | `/konsultacje-specjalistyczne` |
| `/dziekujemy-za-zgloszenie/` | `/badania-kliniczne` |
| `/dziekujemy-za-wiadomosc/` | `/kontakt` |

## 2. Badania kliniczne

| Stary | Nowy |
|---|---|
| `/amicare/badania-kliniczne/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/i-faza-badan-klinicznych/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/ii-faza-badan-klinicznych/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/iii-faza-badan-klinicznych/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/iv-faza-badan-klinicznych/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/informacje-o-badaniach-klinicznych/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/kto-moze-brac-udzial-w-badaniach-klinicznych/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/dlaczego-badania-kliniczne-sa-wazne/czy-udzial-w-badaniach-klinicznych-jest-bezpieczny/` | `/badania-kliniczne` |
| `/etapy-badan-klinicznych/` | `/badania-kliniczne` |
| `/prawa-pacjenta-w-badaniach-klinicznych/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/lodz/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/jelenia-gora/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/lodz/gastroenterologia-lodz/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/lodz/dermatologia/` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/jelenia-gora/gastroenterologia-jelenia-gora/` | `/badania-kliniczne` |

**Uwaga treściowa:** ~30 stron jednostek chorobowych (`jednostka-chorobowa-*`) i chorób
(`/jestem-pacjentem/co-oferujemy/luszczyca/`, `.../cukrzyca/`, `.../stwardnienie-rozsiane/` itd.)
ma dziś własną treść i własne zapytania w Google („badania kliniczne łuszczyca Łódź").
Nowa strona `/badania-kliniczne` to jedna strona zamiast trzydziestu. Przekierowanie 301 na nią
zadziała technicznie, ale ruch z tych fraz zniknie. **Rekomendacja: odtworzyć te podstrony**
jako `/badania-kliniczne/:jednostka` — dane już są w starym serwisie, wystarczy je przenieść.

Do czasu odtworzenia:

| Wzorzec starego adresu | Tymczasowo |
|---|---|
| `/jestem-pacjentem/co-oferujemy/*` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/*/jednostka-chorobowa-*` | `/badania-kliniczne` |
| `/amicare/badania-kliniczne/obecnie-prowadzone-badania-kliniczne/*/*-formularz-kwalifikacyjny-*` | `/badania-kliniczne` |

## 3. Badania diagnostyczne i endoskopia

| Stary | Nowy |
|---|---|
| `/amicare/badania-diagnostyczne/` | `/badania-diagnostyczne` |
| `/amicare/badania-diagnostyczne/badanie-ekg/` | `/badania-diagnostyczne/badanie-ekg` |
| `/amicare/badania-diagnostyczne/badanie-holtera/` | `/badania-diagnostyczne/badanie-holtera` |
| `/amicare/badania-diagnostyczne/badanie-usg/` | `/badania-diagnostyczne/badanie-usg` |
| `/amicare/badania-diagnostyczne/pobranie-krwi/` | `/badania-diagnostyczne/pobranie-krwi` |
| `/amicare/badania-diagnostyczne/spirometria/` | `/badania-diagnostyczne/spirometria` |
| `/amicare/badania-diagnostyczne/pomiar-tetna-i-cisnienia/` | `/badania-diagnostyczne/pomiar-tetna-i-cisnienia` |
| `/amicare/badania-diagnostyczne/pomiar-masy-ciala/` | `/badania-diagnostyczne/pomiar-masy-ciala` |
| `/amicare/badania-diagnostyczne/diagnostyka-bolu-brzucha/` | `/badania-diagnostyczne/diagnostyka-bolu-brzucha` |
| `/amicare/badania-diagnostyczne/leczenie-biologiczne/` | `/badania-diagnostyczne/leczenie-biologiczne` |
| `/amicare/badania-diagnostyczne/gastroskopia/` | `/pracownia-endoskopii/gastroskopia` |
| `/amicare/badania-diagnostyczne/kolonoskopia/` | `/pracownia-endoskopii/kolonoskopia` |

Dwa ostatnie to najcenniejsze adresy w całej migracji — trzymają dziś frazy „gastroskopia Łódź"
i „kolonoskopia Łódź". Sprawdzić je pojedynczo po wdrożeniu.

## 4. Specjalizacje (`/specjalizacja/*` — taksonomia WP)

Nowa strona ma 7 specjalizacji, stara ma 25. Sześć mapuje się 1:1:

| Stary | Nowy |
|---|---|
| `/specjalizacja/gastroenterologia-pl/` | `/konsultacje-specjalistyczne/gastroenterologia` |
| `/specjalizacja/chirurgia/` | `/konsultacje-specjalistyczne/chirurgia` |
| `/specjalizacja/reumatologia/` | `/konsultacje-specjalistyczne/reumatologia` |
| `/specjalizacja/kardiologia/` | `/konsultacje-specjalistyczne/kardiologia` |
| `/specjalizacja/psychologia/` | `/konsultacje-specjalistyczne/psychologia` |
| `/specjalizacja/dietetyka/` | `/konsultacje-specjalistyczne/dietetyka` |
| `/specjalizacja/proktologia/` | `/konsultacje-specjalistyczne/proktologia` |
| `/konsultacje-specjalistyczne/psychologia/` | `/konsultacje-specjalistyczne/psychologia` |
| `/konsultacje-specjalistyczne/psychologia/oferta/` | `/konsultacje-specjalistyczne/psychologia` |
| `/konsultacje-specjalistyczne/psychologia/tus/` | `/konsultacje-specjalistyczne/psychologia` |
| `/konsultacje-specjalistyczne/psychologia/diagnoza-psychologiczna/` | `/konsultacje-specjalistyczne/psychologia` |

Pozostałe 18 (`alergologia`, `anestezjologia`, `choroby-wewnetrzne`, `choroby-zakazne`, `dermatologia`,
`diabetologia`, `endokrynologia`, `epileptologia`, `farmakologia-kliniczna`, `poz`, `laryngologia`,
`neurologia`, `neurologia-dziecieca`, `onkologia`, `pediatria`, `psychiatria`, `urologia`, `wenerologia`)
nie mają odpowiednika. To były strony taksonomii z listą lekarzy — niska wartość, ale to nadal
18 zaindeksowanych adresów.

Opcje: 301 na `/konsultacje-specjalistyczne` (traci się precyzję) albo dorobić te specjalizacje
w `specjalizacja-data.ts`, jeśli klinika je faktycznie oferuje. Sprawdzić w GSC, czy generują wejścia.

## 5. Zespół

Stary WP trzymał lekarzy w trzech miejscach — `/o-nas/zespol/<slug>/`,
`/o-nas/zespol/<grupa>/<slug>/` oraz `/jestem-pacjentem/gabinety-prywatne/<slug>/`.
Nowa strona ma jeden wzorzec: `/o-nas/zespol/<slug>`.

| Stary | Nowy (po naprawie slugów) |
|---|---|
| `/o-nas/zespol/kadra-zarzadzajaca/` | `/o-nas/zespol` |
| `/o-nas/zespol/koordynatorzy/` | `/o-nas/zespol` |
| `/o-nas/zespol/pielegniarki/` | `/o-nas/zespol` |
| `/o-nas/zespol/zespol-pielegniarski/` | `/o-nas/zespol` |
| `/o-nas/zespol/kadra-zarzadzajaca/adam-juszczak/` | `/o-nas/zespol/adam-juszczak` |
| `/o-nas/zespol/kadra-zarzadzajaca/michal-bytomski/` | `/o-nas/zespol/michal-bytomski` |
| `/o-nas/zespol/kadra-zarzadzajaca/marlena-serwacinska/` | `/o-nas/zespol/marlena-serwacinska` |
| `/o-nas/zespol/kadra-zarzadzajaca/jakub-majka/` | `/o-nas/zespol/jakub-majka` |
| `/o-nas/zespol/kadra-zarzadzajaca/anna-gora/` | `/o-nas/zespol/anna-gora` |
| `/o-nas/zespol/koordynatorzy/maria-smul/` | `/o-nas/zespol/maria-smul` |
| `/o-nas/zespol/koordynatorzy/karolina-szczesniak/` | `/o-nas/zespol/karolina-szczesniak` |
| `/o-nas/zespol/koordynatorzy/dorota-sobczyk-clapa/` | `/o-nas/zespol/dorota-sobczyk-clapa` |
| `/o-nas/zespol/zespol-pielegniarski/hubert-sadowski/` | `/o-nas/zespol/hubert-sadowski` |
| `/o-nas/zespol/zespol-pielegniarski/angelika-jurkiewicz/` | `/o-nas/zespol/angelika-jurkiewicz` |
| `/o-nas/zespol/pielegniarki/angelika-jurkiewicz/` | `/o-nas/zespol/angelika-jurkiewicz` |
| `/o-nas/zespol/dominika-buczynska/` | `/o-nas/zespol/dominika-buczynska` |
| `/o-nas/zespol/dr-n-med-izabela-kubinska/` | `/o-nas/zespol/dr-n-med-izabela-kubinska` |
| `/o-nas/zespol/lek-karolina-kabot/` | `/o-nas/zespol/lek-karolina-kabot` |
| `/o-nas/zespol/lek-leszek-weber/` | `/o-nas/zespol/lek-leszek-weber` |
| `/o-nas/zespol/dr-joanna-kowalska-majka/` | `/o-nas/zespol/dr-joanna-kowalska-majka` |
| `/o-nas/zespol/prof-dr-hab-n-med-joanna-jerzynska/` | `/o-nas/zespol/prof-dr-hab-n-med-joanna-jerzynska` |
| `/o-nas/zespol/dr-n-med-agnieszka-bala/` | `/o-nas/zespol/dr-n-med-agnieszka-bala` |
| `/o-nas/zespol/dr-n-med-aleksandra-bala-wojsznis/` | `/o-nas/zespol/dr-n-med-aleksandra-bala-wojsznis` |
| `/o-nas/zespol/dr-n-med-lukasz-przyslo/` | `/o-nas/zespol/dr-n-med-lukasz-przyslo` |
| `/o-nas/zespol/dr-n-med-natalia-zawada-kornalewicz/` | `/o-nas/zespol/dr-n-med-natalia-zawada-kornalewicz` |
| `/o-nas/zespol/dr-n-med-jacek-przybyla/` | `/o-nas/zespol/dr-n-med-jacek-przybyla` |
| `/o-nas/zespol/dr-karolina-niczyporuk/` | `/o-nas/zespol/dr-karolina-niczyporuk` |
| `/o-nas/zespol/dr-n-med-dorota-czech/` | `/o-nas/zespol/dr-n-med-dorota-czech` |
| `/o-nas/zespol/dr-hab-n-med-mariola-swiderek-matysiak/` | `/o-nas/zespol/dr-hab-n-med-mariola-swiderek-matysiak` |
| `/o-nas/zespol/dr-katarzyna-przybylowska-kustosik/` | `/o-nas/zespol/dr-katarzyna-przybylowska-kustosik` |

Gabinety prywatne (te adresy trzymają frazy typu „gastrolog Łódź prywatnie"):

| Stary | Nowy |
|---|---|
| `/jestem-pacjentem/gabinety-prywatne/dr-n-med-adam-rafal-poliwczak/` | `/o-nas/zespol/dr-n-med-adam-rafal-poliwczak` |
| `/jestem-pacjentem/gabinety-prywatne/dr-n-med-i-n-o-zdr-danuta-domzal-magrowska/` | `/o-nas/zespol/dr-n-med-i-n-o-zdr-danuta-domzal-magrowska` |
| `/jestem-pacjentem/gabinety-prywatne/lek-julia-banasik/` | `/o-nas/zespol/lek-julia-banasik` |
| `/jestem-pacjentem/gabinety-prywatne/lek-lukasz-spadlinski/` | `/o-nas/zespol/lek-lukasz-spadlinski` |
| `/jestem-pacjentem/gabinety-prywatne/lek-magdalena-baranska/` | `/o-nas/zespol/lek-magdalena-baranska` |
| `/jestem-pacjentem/gabinety-prywatne/lek-michal-stasiak/` | `/o-nas/zespol/lek-michal-stasiak` |
| `/jestem-pacjentem/gabinety-prywatne/dr-n-med-hubert-zatorski/` | `/o-nas/zespol/dr-n-med-hubert-zatorski` |
| `/jestem-pacjentem/gabinety-prywatne/dr-n-med-dariusz-krzyczmanik/` | `/o-nas/zespol/dr-n-med-dariusz-krzyczmanik` |
| `/jestem-pacjentem/gabinety-prywatne/dr-n-med-milena-padysz/` | `/o-nas/zespol/dr-n-med-milena-padysz` |
| `/jestem-pacjentem/gabinety-prywatne/dr-n-med-krzysztof-grzegorczyk/` | `/o-nas/zespol/dr-n-med-krzysztof-grzegorczyk` |
| `/jestem-pacjentem/gabinety-prywatne/gabinet-gastroenterologiczny/` | `/konsultacje-specjalistyczne/gastroenterologia` |
| `/jestem-pacjentem/gabinety-prywatne/mgr-paulina-kruk-dietetyczka/` | `/konsultacje-specjalistyczne/dietetyka` |
| `/jestem-pacjentem/gabinety-prywatne/oliwia-scigalska-dietetyczka/` | `/konsultacje-specjalistyczne/dietetyka` |

Osoby ze starego serwisu, których nie ma w nowych danych (`martyna-janczak`, `barbara-estal`,
`miroslawa-kazmierczak`, `oliwia-scigalska`, `paulina-kruk`) — 301 na `/o-nas/zespol`
albo dodać do zespołu, jeśli nadal pracują.

## 6. Wersja angielska

30 adresów `/en/...`. Jeśli EN nie wraca:

| Stary | Nowy |
|---|---|
| `/en/home/`, `/en/home-2/` | `/` |
| `/en/about-us/` | `/o-nas` |
| `/en/about-clinical-trials/` | `/badania-kliniczne` |
| `/en/clinical-trials-currently-in-progress-and-eligibility-surveys/` | `/badania-kliniczne` |
| `/en/im-a-patient/`, `/en/im-a-patient/what-diseases-do-we-study/*` | `/badania-kliniczne` |
| `/en/contact-us/` | `/kontakt` |

## 7. Do usunięcia (410, nie 301)

| Stary | Akcja |
|---|---|
| `/wp_jac_slide/slide-01/`, `/wp_jac_slide/slide-02/` | 410 Gone — artefakty pluginu slidera |
| `/o-nas/gratulacje-dla-glownego-badacza-i-calego-zespolu/` | 301 na `/o-nas` albo 410 |
| `/amicare/swiatowy-dzien-bez-tytoniu/` | 410 |
| `/amicare/uslugi-swiadczone-dla-grupy-luxmed/` | 301 na `/o-nas/wspolpracujemy` |
| `/amicare/uslugi-swiadczone-dla-grupy-polmed/` | 301 na `/o-nas/wspolpracujemy` |

## 8. Reguły serwera

nginx — plik `redirects.conf` włączany do bloku `server`:

```nginx
# przekierowania 1:1
location = /amicare/badania-diagnostyczne/kolonoskopia/ { return 301 /pracownia-endoskopii/kolonoskopia; }
location = /amicare/badania-diagnostyczne/gastroskopia/ { return 301 /pracownia-endoskopii/gastroskopia; }
# ... reszta tabel wyżej

# całe gałęzie
location ^~ /jestem-pacjentem/co-oferujemy/ { return 301 /badania-kliniczne; }
location ^~ /amicare/badania-kliniczne/    { return 301 /badania-kliniczne; }
location ^~ /en/                            { return 301 /; }
location ^~ /wp_jac_slide/                  { return 410; }

# stare śmieci WordPressa
location ^~ /wp-content/ { return 410; }
location ^~ /wp-admin/   { return 410; }
location = /wp-login.php { return 410; }
location = /sitemap_index.xml { return 301 /sitemap.xml; }

# fallback SPA na końcu
location / { try_files $uri $uri/ /index.html; }
```

Przy większej liczbie reguł czytelniejszy jest `map`:

```nginx
map $request_uri $redirect_to {
    default                                              "";
    "~^/amicare/badania-diagnostyczne/kolonoskopia/?$"    /pracownia-endoskopii/kolonoskopia;
    "~^/o-nas/zespol/kadra-zarzadzajaca/(?<osoba>[^/]+)/?$" /o-nas/zespol/$osoba;
    # ...
}
server {
    if ($redirect_to != "") { return 301 $redirect_to; }
}
```

Wariant Apache (`.htaccess`) — dopisać nad regułą fallbacku SPA, która już jest w
`dist/amicare/browser/.htaccess`:

```apache
RedirectMatch 301 ^/amicare/badania-diagnostyczne/kolonoskopia/?$ /pracownia-endoskopii/kolonoskopia
RedirectMatch 301 ^/o-nas/zespol/(kadra-zarzadzajaca|koordynatorzy|pielegniarki|zespol-pielegniarski)/(.+)/?$ /o-nas/zespol/$2
RedirectMatch 301 ^/jestem-pacjentem/co-oferujemy/.*$ /badania-kliniczne
RedirectMatch 410 ^/wp_jac_slide/.*$
```
