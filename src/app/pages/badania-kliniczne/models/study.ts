export interface Study {
  jednostka: string;
  /**
   * Adres podstrony badania. Ustawiony tylko dla badań z opisem - reszta
   * pokazuje się na liście jako pozycja kontaktowa, bez własnej strony.
   * Jedna nazwa potrafi wystąpić w dwóch miastach, więc slug zawiera miasto.
   */
  slug?: string;
  dziedzina: string;
  miasto: 'Łódź' | 'Jelenia Góra';
  obraz: string;
  /** Zajawka nad kryteriami - jedno zdanie o tym, kogo badanie dotyczy. */
  lead?: string;
  /** Warunki wstępnej kwalifikacji. Ostateczną decyzję podejmuje lekarz badacz. */
  kryteria?: string[];
  /** Co uczestnik dostaje w ramach badania. */
  korzysci?: string[];
  /** Czas trwania i liczba wizyt. */
  przebieg?: string;
}

export const BADANIA: Study[] = [
  {
    jednostka: 'Choroba Leśniowskiego-Crohna',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/crohn.webp',
  },
  {
    jednostka: 'Wrzodziejące zapalenie jelita grubego',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/wzjg.webp',
  },
  {
    jednostka: 'Gastropareza',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/gastropareza.webp',
  },
  {
    jednostka: 'Badania wątrobowe - stłuszczenie wątroby',
    dziedzina: 'Gastroenterologia',
    miasto: 'Łódź',
    obraz: 'images/badania/watroba.webp',
  },
  {
    jednostka: 'Cukrzyca typu 2',
    slug: 'cukrzyca-typu-2-lodz',
    dziedzina: 'Diabetologia',
    miasto: 'Łódź',
    obraz: 'images/przychodnia/gabinet-konsultacyjny.webp',
    lead:
      'Badanie dla osób z cukrzycą typu 2, u których dotychczasowe leczenie doustne nie zapewnia wystarczającej kontroli poziomu cukru.',
    kryteria: [
      'wiek 45 lat lub więcej',
      'rozpoznana cukrzyca typu 2',
      'przyjmowanie od 1 do 3 doustnych leków przeciwcukrzycowych',
      'BMI co najmniej 25 kg/m²',
      'zwiększone ryzyko chorób serca i naczyń - np. przebyty zawał lub udar, choroba wieńcowa, przewlekła choroba nerek albo choroba tętnic obwodowych',
    ],
    korzysci: [
      'konsultacje lekarskie',
      'konsultacje i zalecenia dietetyka',
      'badania laboratoryjne i kontrola parametrów zdrowotnych',
    ],
  },
  {
    jednostka: 'Alergia na białka mleka krowiego u niemowląt',
    slug: 'alergia-na-bialka-mleka-krowiego-lodz',
    dziedzina: 'Pediatria',
    miasto: 'Łódź',
    obraz: 'images/przychodnia/recepcja-lada.webp',
    lead:
      'Badanie specjalistycznej mieszanki dla niemowląt z alergią na białka mleka krowiego (CMPA).',
    kryteria: [
      'wiek dziecka od 29 dni do 5 miesięcy',
      'podejrzenie alergii na białka mleka krowiego potwierdzone przez lekarza',
      'dziecko nie jest karmione piersią i wymaga stosowania mieszanki',
    ],
    korzysci: [
      'regularna opieka i konsultacje lekarskie',
      'badania i procedury medyczne związane z badaniem bez dodatkowych kosztów',
      'mieszanka stosowana w badaniu przez cały okres udziału dziecka - nawet do około 12 miesięcy',
      'stały kontakt z zespołem badawczym i monitorowanie stanu zdrowia dziecka',
    ],
    przebieg: 'Około 12 miesięcy: 7-8 wizyt w ośrodku i 9 kontaktów telefonicznych.',
  },
  {
    jednostka: 'Świerzbiączka guzkowata',
    dziedzina: 'Dermatologia',
    miasto: 'Łódź',
    obraz: 'images/badania/swierzbiaczka.webp',
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
    obraz: 'images/badania/crohn.webp',
  },
  {
    jednostka: 'Wrzodziejące zapalenie jelita grubego',
    dziedzina: 'Gastroenterologia',
    miasto: 'Jelenia Góra',
    obraz: 'images/badania/wzjg.webp',
  },
];
