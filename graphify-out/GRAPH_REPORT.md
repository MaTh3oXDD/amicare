# Graph Report - Amicare  (2026-07-19)

## Corpus Check
- 49 files · ~128,250 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 333 nodes · 460 edges · 27 communities (14 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a9365a85`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Seo
- zespol.ts
- devDependencies
- development
- dependencies
- app.ts
- placowka.ts
- amicare
- package.json
- badania-kliniczne.ts
- options
- BadaniaDiagnostyczne
- ONas
- Amicare
- Konsultacje
- home.ts
- Home
- Placowki
- badania-kliniczne.ts
- Wspolpraca
- PracowniaEndoskopii
- BadaniaKliniczne
- ONas
- PolitykaPrywatnosci
- BiogramDialog
- PracowniaEndoskopii
- Kolonoskopia

## God Nodes (most connected - your core abstractions)
1. `Seo` - 22 edges
2. `PageHero` - 16 edges
3. `BadaniaKliniczne` - 16 edges
4. `Audyt strony AmiCare — bledy i poprawki graficzne` - 13 edges
5. `1. Realne bledy znalezione w kodzie (do naprawy przed prezentacja)` - 12 edges
6. `2. Ogolny checklist — czego moze sie czepic wymagajacy klient` - 11 edges
7. `Doctor` - 8 edges
8. `amicare` - 7 edges
9. `options` - 7 edges
10. `ZgloszenieDialog` - 7 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (27 total, 13 thin omitted)

### Community 1 - "zespol.ts"
Cohesion: 0.09
Nodes (23): DoctorCard, Component, DIETETYCY, Doctor, KADRA, KOORDYNATORZY, LEKARZE, PIELEGNIARKI (+15 more)

### Community 2 - "devDependencies"
Cohesion: 0.09
Nodes (23): @angular/build, @angular/compiler-cli, jasmine-core, karma, karma-chrome-launcher, karma-coverage, karma-jasmine, karma-jasmine-html-reporter (+15 more)

### Community 3 - "development"
Cohesion: 0.07
Nodes (33): architect, build, extract-i18n, serve, test, builder, configurations, defaultConfiguration (+25 more)

### Community 4 - "dependencies"
Cohesion: 0.11
Nodes (19): @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/router, dependencies, @angular/common (+11 more)

### Community 5 - "app.ts"
Cohesion: 0.10
Nodes (12): App, appConfig, routes, Component, Footer, Component, Header, NavGroup (+4 more)

### Community 6 - "placowka.ts"
Cohesion: 0.40
Nodes (3): Aktualnosci, Component, Wpis

### Community 7 - "amicare"
Cohesion: 0.13
Nodes (14): prefix, projectType, root, schematics, sourceRoot, analytics, cli, newProjectRoot (+6 more)

### Community 8 - "package.json"
Cohesion: 0.14
Nodes (13): name, prettier, overrides, printWidth, singleQuote, private, scripts, build (+5 more)

### Community 9 - "badania-kliniczne.ts"
Cohesion: 0.08
Nodes (25): 1. Realne bledy znalezione w kodzie (do naprawy przed prezentacja), 2. Ogolny checklist — czego moze sie czepic wymagajacy klient, Accessibility / obrazy, Audyt UI/UX — AmiCare (lista zaczepek premium klienta), Border-radius — niespojnosc "premium minimal" (ostre kanty), Focus states — rozne kolory ringu, Inline style zamiast klas, Interakcje / motion (+17 more)

### Community 10 - "options"
Cohesion: 0.14
Nodes (13): 10. Zdublowany/martwy CSS, 11. SEO — wywolanie `seo.set()`, 1. Zepsute atrybuty HTML (cudzyslowy typograficzne), 2. Kolory na sztywno zamiast tokenow (`var(--c-*)`), 3. Border-radius rozny od 0 (lamie sygnaturowy ostry wyglad), 4. Inline `style="..."` w szablonach, 5. Obrazy — brak width/height / loading, 6. Alt text (+5 more)

### Community 13 - "Amicare"
Cohesion: 0.25
Nodes (7): Additional Resources, Amicare, Building, Code scaffolding, Development server, Running end-to-end tests, Running unit tests

### Community 15 - "home.ts"
Cohesion: 0.14
Nodes (12): PageHero, Component, PlacowkaCard, Component, Placowka, PLACOWKI, BadaniaDiagnostyczne, Component (+4 more)

### Community 18 - "badania-kliniczne.ts"
Cohesion: 0.16
Nodes (10): Phase, PHASES, StudyCard, Component, emptyModel(), Component, ZgloszenieDialog, ZgloszenieModel (+2 more)

### Community 24 - "BiogramDialog"
Cohesion: 0.50
Nodes (3): HostListener, BiogramDialog, Component

## Knowledge Gaps
- **107 isolated node(s):** `$schema`, `version`, `newProjectRoot`, `projectType`, `style` (+102 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Seo` connect `home.ts` to `zespol.ts`, `badania-kliniczne.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `BadaniaKliniczne` connect `BadaniaKliniczne` to `badania-kliniczne.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `PLACOWKI` connect `home.ts` to `app.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `newProjectRoot` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `zespol.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09388335704125178 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `development` be split into smaller, more focused modules?**
  _Cohesion score 0.07386363636363637 - nodes in this community are weakly interconnected._