import { DIAGNOSTYKA } from '../../badania-diagnostyczne/models/diagnostyka-data';
import { SPECJALIZACJE } from '../../specjalizacja/models/specjalizacja-data';

export interface CennikWiersz {
  usluga: string;
  cena: string;
  cenaWeekend?: string;
  /** Podstrona opisująca tę usługę. Brak = pozycja bez własnej strony. */
  link?: string;
}

export interface CennikGrupa {
  tytul: string;
  link: string;
  /** Czy w tej grupie ceny różnią się w weekend - decyduje o kolumnie w tabeli. */
  weekend: boolean;
  wiersze: CennikWiersz[];
}

export interface CennikSekcja {
  id: string;
  tytul: string;
  opis: string;
  /** Podpis linku do podstrony - konsultacja to nie badanie, więc nazwa się różni. */
  etykietaLinku: string;
  grupy: CennikGrupa[];
}

/* Usługa -> podstrona z opisem. Dopasowanie po pełnej nazwie, nie po przedrostku:
   pozycje spoza mapy zostają bez linku. */
const PODSTRONY: Record<string, string> = {
  Gastroskopia: '/pracownia-endoskopii/gastroskopia',
  'Gastroskopia (z testem na Helicobacter pylori)': '/pracownia-endoskopii/gastroskopia',
  'Gastroskopia w analgosedacji': '/pracownia-endoskopii/gastroskopia-z-analgosedacja',
  'Gastroskopia w analgosedacji (znieczulenie, z testem na Helicobacter pylori)':
    '/pracownia-endoskopii/gastroskopia-z-analgosedacja',
  'Gastroskopia w znieczuleniu ogólnym': '/pracownia-endoskopii/gastroskopia-znieczulenie-ogolne',
  'Gastroskopia w znieczuleniu ogólnym (z testem na Helicobacter pylori)':
    '/pracownia-endoskopii/gastroskopia-znieczulenie-ogolne',
  Kolonoskopia: '/pracownia-endoskopii/kolonoskopia',
  'Kolonoskopia w analgosedacji (znieczulenie)': '/pracownia-endoskopii/kolonoskopia-w-analgosedacji',
  'Kolonoskopia w znieczuleniu ogólnym': '/pracownia-endoskopii/kolonoskopia-znieczulenie-ogolne',
};

/* Usługi wykonywane przy konsultacji, które mają własną stronę w diagnostyce.
   Dopasowanie po przedrostku, bo wariantów USG jest kilkanaście i wszystkie
   opisuje jedna strona. */
const DIAGNOSTYCZNE: [RegExp, string][] = [
  [/^ekg /i, '/badania-diagnostyczne/badanie-ekg'],
  [/^usg /i, '/badania-diagnostyczne/badanie-usg'],
];

function podstronaDla(usluga: string): string | undefined {
  const nazwa = usluga.trim();
  return PODSTRONY[nazwa] ?? DIAGNOSTYCZNE.find(([wz]) => wz.test(nazwa))?.[1];
}

/* Dane źródłowe zapisują ceny raz jako "550zł", raz jako "550 zł".
   Ujednolicamy tylko na potrzeby wyświetlania - źródła zostają nietknięte. */
function cena(wartosc: string): string {
  return wartosc.replace(/(\d)\s*zł/g, '$1 zł');
}

const NAGLOWKI_ENDOSKOPII = ['Gastroskopia', 'Kolonoskopia', 'Kolonoskopia + Gastroskopia'];

function zbudujKonsultacje(): CennikGrupa[] {
  return SPECJALIZACJE.flatMap((s) => {
    const tabele = s.cenniki.filter((t) => !NAGLOWKI_ENDOSKOPII.includes(t.naglowek ?? ''));
    if (!tabele.length) return [];

    return [
      {
        tytul: s.nazwa,
        link: `/konsultacje-specjalistyczne/${s.slug}`,
        weekend: tabele.some((t) => t.weekend),
        wiersze: tabele.flatMap((t) =>
          t.pozycje.map((p) => ({
            usluga: p.usluga,
            cena: cena(p.cena),
            cenaWeekend: p.cenaWeekend ? cena(p.cenaWeekend) : undefined,
            link: podstronaDla(p.usluga),
          })),
        ),
      },
    ];
  });
}

function zbudujEndoskopie(): CennikGrupa[] {
  const gastro = SPECJALIZACJE.find((s) => s.slug === 'gastroenterologia');
  if (!gastro) return [];

  return gastro.cenniki
    .filter((t) => NAGLOWKI_ENDOSKOPII.includes(t.naglowek ?? ''))
    .map((t) => ({
      tytul: t.naglowek ?? '',
      link: podstronaDla(t.naglowek ?? '') ?? '/pracownia-endoskopii',
      weekend: t.weekend,
      wiersze: t.pozycje.map((p) => ({
        usluga: p.usluga,
        cena: cena(p.cena),
        cenaWeekend: p.cenaWeekend ? cena(p.cenaWeekend) : undefined,
        link: podstronaDla(p.usluga),
      })),
    }));
}

function zbudujDiagnostyke(): CennikGrupa[] {
  return DIAGNOSTYKA.flatMap((d) => {
    const blok = d.bloki.find((b) => b.typ === 'cena');
    if (!blok || blok.typ !== 'cena') return [];

    return [
      {
        tytul: d.nazwa,
        link: `/badania-diagnostyczne/${d.slug}`,
        weekend: false,
        wiersze: [{ usluga: d.lead, cena: cena(blok.text) }],
      },
    ];
  });
}

export const CENNIK: CennikSekcja[] = [
  {
    id: 'endoskopia',
    tytul: 'Pracownia endoskopii',
    opis: 'Gastroskopia i kolonoskopia w znieczuleniu miejscowym, analgosedacji lub znieczuleniu ogólnym.',
    etykietaLinku: 'opis badania',
    grupy: zbudujEndoskopie(),
  },
  {
    id: 'konsultacje',
    tytul: 'Konsultacje specjalistyczne',
    opis: 'Wizyty u specjalistów oraz badania wykonywane podczas konsultacji.',
    etykietaLinku: 'o specjalizacji',
    grupy: zbudujKonsultacje(),
  },
  {
    id: 'diagnostyka',
    tytul: 'Badania diagnostyczne i pakiety',
    opis: 'Pakiety diagnostyczne i terapie wyceniane indywidualnie.',
    etykietaLinku: 'co obejmuje',
    grupy: zbudujDiagnostyke(),
  },
].filter((s) => s.grupy.length);
