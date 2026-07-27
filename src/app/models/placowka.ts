export interface Placowka {
  slug: string;
  nazwa: string;
  typ: 'Centrum Medyczne' | 'Ośrodek Badań Klinicznych';
  miasto: string;
  adres?: string;
  godziny?: string;
  uwaga?: string;
  telefon: string;
  email: string;
  /** Krótki opis roli placówki — teksty ze strony amicare.pl */
  opis: string;
  /** Obszary dostępne w danym mieście */
  zakres: { nazwa: string; link: string }[];
  zdjecie?: string;
}

export const PLACOWKI: Placowka[] = [
  {
    slug: 'lodz-romanowska',
    nazwa: 'Amicare Centrum Medyczne',
    typ: 'Centrum Medyczne',
    miasto: 'Łódź',
    adres: 'Ul. Romanowska 55N, 91-174 Łódź',
    godziny: 'Pon-Pt: 08.00-20.00',
    uwaga: '(Przed wizytą prosimy o kontakt telefoniczny)',
    telefon: '+48 42 28 90 250',
    email: 'rejestracja@amicare.pl',
    opis: 'W gabinetach prywatnych swoje usługi świadczą gastroenterolodzy, kardiolodzy, reumatolodzy, interniści, logopedzi, psycholodzy oraz dietetycy.',
    zakres: [
      { nazwa: 'Konsultacje specjalistyczne', link: '/konsultacje-specjalistyczne' },
      { nazwa: 'Pracownia Endoskopii', link: '/pracownia-endoskopii' },
      { nazwa: 'Badania diagnostyczne', link: '/badania-diagnostyczne' },
      { nazwa: 'Badania kliniczne — Łódź', link: '/badania-kliniczne' },
    ],
    zdjecie: 'images/centrum-020.webp',
  },
  {
    slug: 'lodz-zgierska',
    nazwa: 'Amicare Centrum Medyczne',
    typ: 'Centrum Medyczne',
    miasto: 'Łódź',
    adres: 'Ul. Zgierska 249, 91-495 Łódź',
    godziny: 'Pon-Pt: 08.00-16.00',
    telefon: '+48 42 28 90 250',
    email: 'rejestracja@amicare.pl',
    opis: 'AmiCare Centrum Medyczne to nowoczesny ośrodek mający swoje siedziby w Łodzi oraz w Jeleniej Górze. Zajmujemy się głównie badaniami klinicznymi, lecz stale rozszerzamy swoją ofertę, aby każdy pacjent mógł poczuć się jak najlepiej zaopiekowany.',
    zakres: [
      { nazwa: 'Konsultacje specjalistyczne', link: '/konsultacje-specjalistyczne' },
      { nazwa: 'Badania diagnostyczne', link: '/badania-diagnostyczne' },
      { nazwa: 'Badania kliniczne — Łódź', link: '/badania-kliniczne' },
    ],
    zdjecie: 'images/centrum-015.webp',
  },
  {
    slug: 'jelenia-gora',
    nazwa: 'Amicare Ośrodek Badań Klinicznych',
    typ: 'Ośrodek Badań Klinicznych',
    miasto: 'Jelenia Góra',
    uwaga: 'Kontakt w sprawie badań klinicznych',
    telefon: '+48 786 086 331',
    email: 'office@amicare.pl',
    opis: 'Jesteśmy Ośrodkiem tworzonym przez wykwalifikowanych i pełnych pasji lekarzy, koordynatorów badań klinicznych i pielęgniarki. Obecnie prowadzone badania kliniczne w Jeleniej Górze obejmują gastroenterologię.',
    zakres: [{ nazwa: 'Badania kliniczne — Jelenia Góra', link: '/badania-kliniczne' }],
  },
];
