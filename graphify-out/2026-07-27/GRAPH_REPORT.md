# Graph Report - Amicare  (2026-07-27)

## Corpus Check
- 54 files · ~129,969 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 352 nodes · 481 edges · 28 communities (15 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `736489d0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Seo
- zespol.ts
- devDependencies
- development
- dependencies
- app.ts
- ZespolDetail
- BadaniaDiagnostyczne
- package.json
- badania-kliniczne.ts
- options
- BadaniaDiagnostyczne
- ONas
- Amicare
- Konsultacje
- home.ts
- PolitykaPrywatnosci
- Placowki
- badania-kliniczne.ts
- Wspolpraca
- PracowniaEndoskopii
- BadaniaKliniczne
- ONas
- PracowniaEndoskopii
- BiogramDialog
- Specjalizacja
- Kolonoskopia
- Hero 3D Blob — Design

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
10. `HeroBlob` - 7 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (28 total, 13 thin omitted)

### Community 0 - "Seo"
Cohesion: 0.13
Nodes (14): prefix, projectType, root, schematics, sourceRoot, analytics, cli, newProjectRoot (+6 more)

### Community 1 - "zespol.ts"
Cohesion: 0.10
Nodes (23): DoctorCard, Component, PageHero, Component, DIETETYCY, Doctor, KADRA, KOORDYNATORZY (+15 more)

### Community 2 - "devDependencies"
Cohesion: 0.09
Nodes (23): @angular/build, @angular/compiler-cli, jasmine-core, karma, karma-chrome-launcher, karma-coverage, karma-jasmine, karma-jasmine-html-reporter (+15 more)

### Community 3 - "development"
Cohesion: 0.07
Nodes (33): architect, build, extract-i18n, serve, test, builder, configurations, defaultConfiguration (+25 more)

### Community 4 - "dependencies"
Cohesion: 0.09
Nodes (23): @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/router, dependencies, @angular/common (+15 more)

### Community 5 - "app.ts"
Cohesion: 0.11
Nodes (10): App, appConfig, routes, Component, Header, NavGroup, NavLink, Component (+2 more)

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
Cohesion: 0.16
Nodes (10): Footer, Component, PlacowkaCard, Component, Placowka, PLACOWKI, FormularzKontaktowy, Component (+2 more)

### Community 18 - "badania-kliniczne.ts"
Cohesion: 0.13
Nodes (12): Phase, PHASES, StudyCard, Component, emptyModel(), Component, ZgloszenieDialog, ZgloszenieModel (+4 more)

### Community 20 - "PracowniaEndoskopii"
Cohesion: 0.15
Nodes (9): createGradientTexture(), HeroBlob, Component, Aktualnosci, Component, Wpis, Home, Component (+1 more)

### Community 24 - "BiogramDialog"
Cohesion: 0.50
Nodes (3): HostListener, BiogramDialog, Component

### Community 27 - "Hero 3D Blob — Design"
Cohesion: 0.29
Nodes (6): Approach, Context, Goal, Hero 3D Blob — Design, Non-goals, Testing / verification

## Knowledge Gaps
- **114 isolated node(s):** `$schema`, `version`, `newProjectRoot`, `projectType`, `style` (+109 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Seo` connect `zespol.ts` to `badania-kliniczne.ts`, `PracowniaEndoskopii`, `home.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `BadaniaKliniczne` connect `BadaniaKliniczne` to `badania-kliniczne.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `PLACOWKI` connect `home.ts` to `zespol.ts`, `badania-kliniczne.ts`, `PracowniaEndoskopii`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `newProjectRoot` to the rest of the system?**
  _114 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seo` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `zespol.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09714285714285714 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._