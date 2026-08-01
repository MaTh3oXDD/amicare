import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'o-nas',
    loadComponent: () => import('./pages/o-nas/o-nas').then((m) => m.ONas),
  },
  {
    path: 'o-nas/zespol',
    loadComponent: () => import('./pages/zespol/zespol').then((m) => m.Zespol),
  },
  {
    path: 'o-nas/zespol/:slug',
    loadComponent: () =>
      import('./pages/zespol/zespol-detail/zespol-detail').then((m) => m.ZespolDetail),
  },
  {
    path: 'placowki',
    loadComponent: () => import('./pages/placowki/placowki').then((m) => m.Placowki),
  },
  {
    path: 'placowki/:slug',
    loadComponent: () =>
      import('./pages/placowki/placowka-detail/placowka-detail').then((m) => m.PlacowkaDetail),
  },
  {
    path: 'badania-kliniczne',
    loadComponent: () =>
      import('./pages/badania-kliniczne/badania-kliniczne').then((m) => m.BadaniaKliniczne),
  },
  {
    path: 'konsultacje-specjalistyczne',
    loadComponent: () => import('./pages/konsultacje/konsultacje').then((m) => m.Konsultacje),
  },
  {
    path: 'konsultacje-specjalistyczne/:slug',
    loadComponent: () =>
      import('./pages/specjalizacja/specjalizacja').then((m) => m.Specjalizacja),
  },
  {
    path: 'pracownia-endoskopii',
    loadComponent: () =>
      import('./pages/pracownia-endoskopii/pracownia-endoskopii').then(
        (m) => m.PracowniaEndoskopii,
      ),
  },
  {
    path: 'pracownia-endoskopii/gastroskopia',
    loadComponent: () =>
      import('./pages/pracownia-endoskopii/gastroskopia/gastroskopia').then((m) => m.Gastroskopia),
  },
  {
    path: 'pracownia-endoskopii/gastroskopia-z-analgosedacja',
    loadComponent: () =>
      import('./pages/pracownia-endoskopii/gastroskopia-z-analgosedacja/gastroskopia-z-analgosedacja').then(
        (m) => m.GastroskopiaZAnalgosedacja,
      ),
  },
  {
    path: 'pracownia-endoskopii/gastroskopia-znieczulenie-ogolne',
    loadComponent: () =>
      import(
        './pages/pracownia-endoskopii/gastroskopia-znieczulenie-ogolne/gastroskopia-znieczulenie-ogolne'
      ).then((m) => m.GastroskopiaZnieczulenieOgolne),
  },
  {
    path: 'pracownia-endoskopii/kolonoskopia',
    loadComponent: () =>
      import('./pages/pracownia-endoskopii/kolonoskopia/kolonoskopia').then((m) => m.Kolonoskopia),
  },
  {
    path: 'pracownia-endoskopii/kolonoskopia-w-analgosedacji',
    loadComponent: () =>
      import('./pages/pracownia-endoskopii/kolonoskopia-w-analgosedacji/kolonoskopia-w-analgosedacji').then(
        (m) => m.KolonoskopiaWAnalgosedacji,
      ),
  },
  {
    path: 'pracownia-endoskopii/kolonoskopia-znieczulenie-ogolne',
    loadComponent: () =>
      import(
        './pages/pracownia-endoskopii/kolonoskopia-znieczulenie-ogolne/kolonoskopia-znieczulenie-ogolne'
      ).then((m) => m.KolonoskopiaZnieczulenieOgolne),
  },
  {
    path: 'badania-diagnostyczne',
    loadComponent: () =>
      import('./pages/badania-diagnostyczne/badania-diagnostyczne').then(
        (m) => m.BadaniaDiagnostyczne,
      ),
  },
  {
    path: 'badania-diagnostyczne/:slug',
    loadComponent: () =>
      import('./pages/badania-diagnostyczne/badanie-detail/badanie-detail').then(
        (m) => m.BadanieDetail,
      ),
  },
  {
    path: 'wspolpraca',
    loadComponent: () => import('./pages/wspolpraca/wspolpraca').then((m) => m.Wspolpraca),
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/kontakt/kontakt').then((m) => m.Kontakt),
  },
  {
    path: 'polityka-prywatnosci',
    loadComponent: () =>
      import('./pages/polityka-prywatnosci/polityka-prywatnosci').then(
        (m) => m.PolitykaPrywatnosci,
      ),
  },
  {
    path: 'regulamin-platnosci',
    loadComponent: () =>
      import('./pages/regulamin-platnosci/regulamin-platnosci').then(
        (m) => m.RegulaminPlatnosci,
      ),
  },
  { path: '**', redirectTo: '' },
];
