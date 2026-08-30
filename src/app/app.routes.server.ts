import { RenderMode, ServerRoute } from '@angular/ssr';
import { PLACOWKI } from './models/placowka';
import { KADRA, KOORDYNATORZY, LEKARZE, PIELEGNIARKI } from './models/doctor';
import { SPECJALIZACJE } from './pages/specjalizacja/models/specjalizacja-data';
import { DIAGNOSTYKA } from './pages/badania-diagnostyczne/models/diagnostyka-data';
import { BADANIA } from './pages/badania-kliniczne/models/study';
import { slugify } from './utils/slug';

/* Wszystkie dane siedzą w plikach TS, więc każdą trasę da się wygenerować
   do statycznego HTML-a już na buildzie. Żadna nie potrzebuje serwera Node. */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'placowki/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PLACOWKI.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'konsultacje-specjalistyczne/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SPECJALIZACJE.map((s) => ({ slug: s.slug })),
  },
  {
    /* Tylko badania z opisem mają slug - reszta żyje wyłącznie na liście. */
    path: 'badania-kliniczne/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      BADANIA.filter((b) => b.slug).map((b) => ({ slug: b.slug! })),
  },
  {
    path: 'badania-diagnostyczne/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DIAGNOSTYKA.map((b) => ({ slug: b.slug })),
  },
  {
    /* Dietetycy celowo pominięci - pokazuje ich strona specjalizacji,
       ale zespol-detail ich nie obsługuje, więc nie mają własnego adresu. */
    path: 'o-nas/zespol/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      [...LEKARZE, ...KADRA, ...KOORDYNATORZY, ...PIELEGNIARKI].map((d) => ({
        slug: slugify(d.name),
      })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
