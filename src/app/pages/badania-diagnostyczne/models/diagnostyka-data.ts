export type DiagnostykaBlok =
  | { typ: 'p'; text: string }
  | { typ: 'h4'; text: string }
  | { typ: 'ul'; items: string[] }
  | { typ: 'warianty'; items: string[] }
  | { typ: 'cena'; text: string }
  | { typ: 'linki'; items: { label: string; link: string }[] };

export interface DiagnostykaEntry {
  slug: string;
  nazwa: string;
  kategoria: string;
  lead: string;
  bloki: DiagnostykaBlok[];
}

export const DIAGNOSTYKA: DiagnostykaEntry[] = [
  {
    slug: 'diagnostyka-bolu-brzucha',
    nazwa: 'Diagnostyka Bólu brzucha',
    kategoria: 'Pakiet diagnostyczny',
    lead: 'Kompleksowy pakiet diagnostyczny obejmujący konsultację, przygotowanie i badanie endoskopowe w znieczuleniu ogólnym.',
    bloki: [
      {
        typ: 'ul',
        items: [
          'Konsultacja lekarska + badania krwi',
          'Proces przeczyszczenia się do zabiegu wraz z noclegiem (możliwość zabrania osoby towarzyszącej)',
          'Kolonoskopia + Gastroskopia w znieczuleniu ogólnym',
          'Pobranie wycinka do badań histopatologicznych, mała polipektomia',
          'Konsultacja lekarska po otrzymaniu wyników histopatologicznych (ok. miesiąc po badaniu)',
        ],
      },
      { typ: 'cena', text: '3499zł' },
      {
        typ: 'linki',
        items: [
          { label: 'Jak się przygotować do Kolonoskopii?', link: '/pracownia-endoskopii/kolonoskopia' },
          { label: 'Jak się przygotować do Gastroskopii?', link: '/pracownia-endoskopii/gastroskopia' },
        ],
      },
    ],
  },
  {
    slug: 'spirometria',
    nazwa: 'Spirometria',
    kategoria: 'Pulmonologia',
    lead: 'Prosty test diagnostyczny oceniający funkcję płuc i układu oddechowego.',
    bloki: [
      {
        typ: 'p',
        text: 'Spirometria to prosty test diagnostyczny, który służy do oceny funkcji płuc i układu oddechowego.',
      },
      {
        typ: 'p',
        text: 'Jest to badanie nieinwazyjne, które pozwala lekarzowi ocenić zdolność płuc do wdechu i wydechu oraz zidentyfikować ewentualne problemy z oddychaniem.',
      },
    ],
  },
  {
    slug: 'pomiar-tetna-i-cisnienia',
    nazwa: 'Pomiar tętna i ciśnienia',
    kategoria: 'Kardiologia',
    lead: 'Jedno z najczęstszych badań diagnostycznych oceniających funkcjonowanie układu sercowo-naczyniowego.',
    bloki: [
      {
        typ: 'p',
        text: 'Pomiar ciśnienia krwi oraz tętna jest jednym z najczęstszych badań diagnostycznych, które pomagają ocenić funkcjonowanie układu sercowo-naczyniowego.',
      },
      {
        typ: 'p',
        text: 'Regularne monitorowanie tych parametrów jest szczególnie istotne dla osób z nadciśnieniem tętniczym, cukrzycą, chorobami serca oraz dla wszystkich dbających o zdrowy tryb życia.',
      },
    ],
  },
  {
    slug: 'pomiar-masy-ciala',
    nazwa: 'Pomiar masy ciała',
    kategoria: 'Diagnostyka ogólna',
    lead: 'Szybkie i bezbolesne badanie wykonywane przy użyciu certyfikowanej wagi medycznej.',
    bloki: [
      { typ: 'h4', text: 'Na czym polega badanie?' },
      {
        typ: 'p',
        text: 'Pomiar masy ciała wykonywany jest przy użyciu certyfikowanej wagi medycznej. Badanie jest szybkie, bezbolesne i nie wymaga specjalnego przygotowania.',
      },
      { typ: 'h4', text: 'Cel badania' },
      {
        typ: 'ul',
        items: [
          'ocena aktualnej masy ciała',
          'monitorowanie zmian masy ciała w czasie',
          'kontrola skuteczności leczenia dietetycznego',
          'ocena ryzyka nadwagi, otyłości lub niedożywienia',
          'wsparcie diagnostyki w chorobach metabolicznych, gastroenterologicznych, kardiologicznych i endokrynologicznych',
        ],
      },
      { typ: 'h4', text: 'Przebieg badania' },
      {
        typ: 'p',
        text: 'Pacjent staje na wadze w lekkim ubraniu, bez obuwia. Wynik odczytywany jest natychmiast i może zostać wykorzystany do wyliczenia wskaźnika BMI lub porównania z wcześniejszymi pomiarami.',
      },
      { typ: 'h4', text: 'Dla kogo?' },
      { typ: 'p', text: 'Badanie zalecane jest osobom:' },
      {
        typ: 'ul',
        items: [
          'kontrolującym masę ciała',
          'korzystającym z opieki dietetycznej',
          'z chorobami przewlekłymi wpływającymi na wagę',
          'monitorującym efekty leczenia lub zmiany stylu życia',
        ],
      },
      { typ: 'p', text: 'Czas badania: około 1-2 minuty.' },
      { typ: 'h4', text: 'Przygotowanie do badania' },
      {
        typ: 'p',
        text: 'Nie jest wymagane specjalne przygotowanie. Dla uzyskania najbardziej porównywalnych wyników zaleca się wykonywanie pomiarów o podobnej porze dnia.',
      },
    ],
  },
  {
    slug: 'pobranie-krwi',
    nazwa: 'Pobranie krwi',
    kategoria: 'Diagnostyka laboratoryjna',
    lead: 'Jedno z najczęstszych badań diagnostycznych oceniających funkcjonowanie układu sercowo-naczyniowego.',
    bloki: [
      {
        typ: 'p',
        text: 'Pomiar ciśnienia krwi oraz tętna jest jednym z najczęstszych badań diagnostycznych, które pomagają ocenić funkcjonowanie układu sercowo-naczyniowego.',
      },
      {
        typ: 'p',
        text: 'Regularne monitorowanie tych parametrów jest szczególnie istotne dla osób z nadciśnieniem tętniczym, cukrzycą, chorobami serca oraz dla wszystkich dbających o zdrowy tryb życia.',
      },
    ],
  },
  {
    slug: 'badanie-holtera',
    nazwa: 'Badanie Holtera',
    kategoria: 'Kardiologia',
    lead: 'Ciągłe monitorowanie ciśnienia krwi pacjenta przez dobę lub trzy dni.',
    bloki: [
      {
        typ: 'p',
        text: 'Badanie Holtera, zarówno 24-godzinne, jak i 72-godzinne, to procedury diagnostyczne, które pozwalają na ciągłe monitorowanie ciśnienia krwi pacjenta przez określony czas, zazwyczaj przez dobę lub trzy dni.',
      },
      {
        typ: 'p',
        text: 'Obydwa rodzaje badania Holtera ciśnieniowego są stosowane przede wszystkim w diagnostyce zaburzeń ciśnienia krwi, takich jak nadciśnienie tętnicze, hipotensja ortostatyczna, arytmie oraz monitorowanie skuteczności leczenia nadciśnienia.',
      },
      { typ: 'warianty', items: ['Ciśnieniowy 24h', 'Ciśnieniowy 72h'] },
    ],
  },
  {
    slug: 'badanie-ekg',
    nazwa: 'Badanie EKG',
    kategoria: 'Kardiologia',
    lead: 'Podstawowe narzędzie diagnostyczne w kardiologii, rejestrujące aktywność elektryczną serca.',
    bloki: [
      {
        typ: 'p',
        text: 'Badanie elektrokardiograficzne (EKG) spoczynkowe to procedura diagnostyczna, która umożliwia rejestrowanie aktywności elektrycznej serca w czasie spoczynku.',
      },
      {
        typ: 'p',
        text: 'Badanie to jest podstawowym narzędziem diagnostycznym w kardiologii, które pozwala na szybką i bezpieczną ocenę stanu zdrowia serca oraz wykrywanie potencjalnych problemów kardiologicznych.',
      },
    ],
  },
  {
    slug: 'badanie-usg',
    nazwa: 'Badanie USG',
    kategoria: 'Diagnostyka obrazowa',
    lead: 'Procedura wykorzystująca fale dźwiękowe o wysokiej częstotliwości do wizualizacji tkanek wewnętrznych.',
    bloki: [
      {
        typ: 'p',
        text: 'Badanie ultrasonograficzne (USG) jest procedurą diagnostyczną, która wykorzystuje fale dźwiękowe o wysokiej częstotliwości do wizualizacji tkanek wewnętrznych ciała pacjenta.',
      },
      {
        typ: 'p',
        text: 'Badanie USG jest cennym narzędziem diagnostycznymi w różnych obszarach medycyny, pozwalając lekarzom na dokładną ocenę stanu zdrowia pacjentów oraz planowanie odpowiedniego leczenia i opieki medycznej.',
      },
      { typ: 'warianty', items: ['Jamy brzusznej', 'Reumatologiczne stawów', 'Wykonanie echa serca'] },
    ],
  },
  {
    slug: 'leczenie-biologiczne',
    nazwa: 'Leczenie biologiczne',
    kategoria: 'Terapia biologiczna',
    lead: 'Terapia lekami biologicznymi dla pacjentów z zaawansowanymi chorobami autoimmunologicznymi.',
    bloki: [
      {
        typ: 'p',
        text: 'Leczenie biologiczne stosuje się w chorobach autoimmunologicznych. Polega na podawaniu pacjentowi preparatów biologicznych, których zadaniem jest zmniejszenie odpowiedzi zapalnej w organizmie, czyli zmniejszenie nasilenia objawów i zatrzymanie dalszego rozwoju choroby. Terapia lekami biologicznymi przeznaczona jest dla pacjentów z zaawansowanymi chorobami autoimmunologicznymi, opornymi na tak zwane "leczenie konwencjonalne" oraz którzy nie mogą wziąć udziału w badaniach klinicznym.',
      },
      { typ: 'p', text: 'Wskazań do leczenia biologicznego można znaleźć:' },
      {
        typ: 'ul',
        items: [
          'choroby reumatyczne (m.in. reumatoidalne zapalenie stawów, zesztywniające zapalenie stawów kręgosłupa, młodzieńcze idiopatyczne zapalenie stawów, łuszczycowe zapalenie stawów)',
          'choroby zapalne jelit (choroba Leśniowskiego-Crohna, wrzodziejące zapalenie jelita grubego)',
          'choroby o podłożu alergicznym (astma, atopowe zapalenie skóry, pokrzywka idiopatyczna)',
        ],
      },
      { typ: 'p', text: 'W AmiCare Centrum Medycznym oferujemy Państwu dwa preparaty do terapii biologicznej:' },
      { typ: 'warianty', items: ['Yuflyma (adalimumab)', 'Remsima (infliksymab)'] },
      {
        typ: 'p',
        text: 'Cały proces leczenia biologicznego w naszym Ośrodku przebiega zgodnie z aktualnymi wytycznymi pod nadzorem lekarzy specjalistów, mających doświadczenie w tym zakresie.',
      },
      {
        typ: 'cena',
        text: 'Ustalana indywidualnie po pierwszej wizycie u specjalisty',
      },
    ],
  },
];
