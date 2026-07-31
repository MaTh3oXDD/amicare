export interface Study {
  jednostka: string;
  dziedzina: string;
  miasto: 'Łódź' | 'Jelenia Góra';
  obraz: string;
}

export const BADANIA: Study[] = [
  {
    jednostka: 'Choroba Leśniowskiego-Crohna',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/crohn.jpg',
  },
  {
    jednostka: 'Wrzodziejące zapalenie jelita grubego',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/wzjg.jpg',
  },
  {
    jednostka: 'Gastropareza',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/gastropareza.png',
  },
  {
    jednostka: 'Badania wątrobowe - stłuszczenie wątroby',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/watroba.webp',
  },
  {
    jednostka: 'Świerzbiączka guzkowata',
    dziedzina: 'Dermatologia',
    miasto: 'Łódź',
    obraz: 'images/badania/swierzbiaczka.jpg',
  },
  {
    jednostka: 'Trądzik odwrócony',
    dziedzina: 'Dermatologia',
    miasto: 'Łódź',
    obraz: 'images/badania/tradzik-odwrocony.webp',
  },
  {
    jednostka: 'Choroba Leśniowskiego-Crohna',
    dziedzina: 'Gastroenterologia',
    miasto: 'Jelenia Góra',
    obraz: 'images/badania/crohn.jpg',
  },
  {
    jednostka: 'Wrzodziejące zapalenie jelita grubego',
    dziedzina: 'Gastroenterologia',
    miasto: 'Jelenia Góra',
    obraz: 'images/badania/wzjg.jpg',
  },
];
