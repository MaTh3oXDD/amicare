# Graph Report - specjalizacja  (2026-08-01)

## Corpus Check
- 2 files · ~2,171 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 9 nodes · 10 edges · 2 communities (1 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b1cead2b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- specjalizacja-data.ts
- Specjalizacja

## God Nodes (most connected - your core abstractions)
1. `Specjalizacja` - 3 edges
2. `SpecjalizacjaInfo` - 2 edges
3. `SPECJALIZACJE` - 2 edges
4. `CennikPozycja` - 1 edges
5. `CennikTabela` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (2 total, 1 thin omitted)

### Community 0 - "specjalizacja-data.ts"
Cohesion: 0.47
Nodes (4): CennikPozycja, CennikTabela, SpecjalizacjaInfo, SPECJALIZACJE

## Knowledge Gaps
- **2 isolated node(s):** `CennikPozycja`, `CennikTabela`
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Specjalizacja` connect `Specjalizacja` to `specjalizacja-data.ts`?**
  _High betweenness centrality (0.464) - this node is a cross-community bridge._
- **What connects `CennikPozycja`, `CennikTabela` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._