export interface Placowka {
  slug: string;
  nazwa: string;
  typ: 'Centrum Medyczne' | 'Ośrodek Badań Klinicznych';
  miasto: string;
  adres?: string;
  /** Współrzędne do schematu LocalBusiness. Brak = placówka bez adresu publicznego. */
  geo?: { lat: number; lon: number };
  godziny?: string;
  uwaga?: string;
  telefon: string;
  email: string;
  /** Krótki opis roli placówki - teksty ze strony amicare.pl */
  opis: string;
  /** Obszary dostępne w danym mieście */
  zakres: { nazwa: string; link: string }[];
  /** Sprzęt wyróżniający placówkę - producent i zastosowanie. */
  wyposazenie?: { nazwa: string; opis: string }[];
  zdjecie?: string;
  zdjecieWidth?: number;
  zdjecieHeight?: number;
}

export const PLACOWKI: Placowka[] = [
  {
    slug: 'lodz-romanowska',
    nazwa: 'Amicare Centrum Medyczne',
    typ: 'Centrum Medyczne',
    miasto: 'Łódź',
    adres: 'Ul. Romanowska 55N, 91-174 Łódź',
    geo: { lat: 51.8065979, lon: 19.3285587 },
    godziny: 'Pon-Pt: 08.00-20.00',
    uwaga: '(Przed wizytą prosimy o kontakt telefoniczny)',
    telefon: '+48 42 28 90 250',
    email: 'rejestracja@amicare.pl',
    opis: 'Jesteśmy Centrum Medycznym tworzonym przez wykwalifikowanych i pełnych pasji lekarzy, koordynatorów badań klinicznych i pielęgniarki.',
    zakres: [
      { nazwa: 'Kolonoskopia', link: '/pracownia-endoskopii/kolonoskopia' },
      { nazwa: 'Gastroskopia', link: '/pracownia-endoskopii/gastroskopia' },
      { nazwa: 'Gastroenterolog', link: '/konsultacje-specjalistyczne/gastroenterologia' },
      { nazwa: 'Hepatolog', link: '/konsultacje-specjalistyczne/hepatologia' },
      { nazwa: 'Reumatolog', link: '/konsultacje-specjalistyczne/reumatologia' },
      { nazwa: 'Psycholog', link: '/konsultacje-specjalistyczne/psychologia' },
      { nazwa: 'Dietetyk', link: '/konsultacje-specjalistyczne/dietetyka' },
      { nazwa: 'Badania diagnostyczne', link: '/badania-diagnostyczne' },
      { nazwa: 'Badania kliniczne - Łódź', link: '/badania-kliniczne' },
    ],
    wyposazenie: [
      {
        nazwa: 'Tor wizyjny Fujifilm',
        opis:
          'Nowoczesny sprzęt endoskopowy firmy Fujifilm - obraz w wysokiej rozdzielczości podczas gastroskopii i kolonoskopii.',
      },
      {
        nazwa: 'Diatermia EMED',
        opis:
          'Prąd o wysokiej częstotliwości: usuwanie polipów, tamowanie drobnych krwawień i wybrane procedury zabiegowe w trakcie badania.',
      },
      {
        nazwa: 'Insuflator CO₂',
        opis:
          'Dwutlenek węgla zamiast powietrza - wchłania się szybciej, więc po badaniu jest mniej wzdęć i dyskomfortu.',
      },
      {
        nazwa: 'Sala wybudzeniowa',
        opis:
          'Każde stanowisko z aparaturą do monitorowania czynności życiowych. Po sedacji pacjent zostaje pod opieką personelu przez około godzinę.',
      },
    ],
    zdjecie: 'images/przychodnia/wejscie-parking.webp',
    zdjecieWidth: 1800,
    zdjecieHeight: 1200,
  },
  {
    slug: 'lodz-zgierska',
    nazwa: 'Amicare Centrum Medyczne',
    typ: 'Centrum Medyczne',
    miasto: 'Łódź',
    adres: 'Ul. Zgierska 249, 91-495 Łódź',
    geo: { lat: 51.8259348, lon: 19.4287425 },
    godziny: 'Pon-Pt: 08.00-16.00',
    telefon: '+48 42 28 90 250',
    email: 'rejestracja@amicare.pl',
    opis: 'Jesteśmy Centrum Medycznym tworzonym przez wykwalifikowanych i pełnych pasji lekarzy, koordynatorów badań klinicznych i pielęgniarki.',
    zakres: [
      { nazwa: 'Gastroenterolog', link: '/konsultacje-specjalistyczne/gastroenterologia' },
      { nazwa: 'Reumatolog', link: '/konsultacje-specjalistyczne/reumatologia' },
      { nazwa: 'Kardiolog', link: '/konsultacje-specjalistyczne/kardiologia' },
      { nazwa: 'Dietetyk', link: '/konsultacje-specjalistyczne/dietetyka' },
      { nazwa: 'Psycholog', link: '/konsultacje-specjalistyczne/psychologia' },
      { nazwa: 'Internista', link: '/konsultacje-specjalistyczne' },
      { nazwa: 'Hepatolog', link: '/konsultacje-specjalistyczne' },
      { nazwa: 'Badania diagnostyczne', link: '/badania-diagnostyczne' },
      { nazwa: 'Badania kliniczne - Łódź', link: '/badania-kliniczne' },
    ],
    zdjecie: 'images/centrum-020.webp',
    zdjecieWidth: 1024,
    zdjecieHeight: 775,
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
    zakres: [{ nazwa: 'Badania kliniczne - Jelenia Góra', link: '/badania-kliniczne' }],
  },
];
