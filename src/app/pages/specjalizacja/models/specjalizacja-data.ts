export interface CennikPozycja {
  usluga: string;
  cena: string;
  cenaWeekend?: string;
}

export interface CennikTabela {
  naglowek?: string;
  weekend: boolean;
  pozycje: CennikPozycja[];
}

export interface SpecjalizacjaInfo {
  slug: string;
  nazwa: string;
  opis: string[];
  listy?: { tytul: string; punkty: string[] }[];
  cenniki: CennikTabela[];
  lekarze: string[];
}

export const SPECJALIZACJE: SpecjalizacjaInfo[] = [
  {
    slug: 'gastroenterologia',
    nazwa: 'Gastroenterologia',
    opis: [
      'Zapewniamy kompleksową opiekę gastroenterologiczną dla dzieci i dorosłych, obejmującą konsultacje specjalistyczne, nowoczesną diagnostykę endoskopową oraz leczenie chorób przewodu pokarmowego. Naszym celem jest szybkie i trafne rozpoznanie dolegliwości oraz wdrożenie skutecznej, indywidualnie dobranej terapii.',
      'Specjalizujemy się w diagnostyce schorzeń przełyku, żołądka, jelita cienkiego i grubego, takich jak m.in. refluks, choroba wrzodowa, zespół jelita drażliwego (IBS), nieswoiste choroby zapalne jelit (np. choroba Crohna, wrzodziejące zapalenie jelita grubego), a także w profilaktyce i wczesnym wykrywaniu zmian nowotworowych.',
      'Prowadzimy konsultacje gastroenterologiczne dla dorosłych i dla dzieci. Podczas wizyty lekarz przeprowadza szczegółowy wywiad, analizuje wyniki badań oraz planuje dalszą diagnostykę lub leczenie.',
      'Dbamy o komfort, bezpieczeństwo i dyskrecję na każdym etapie diagnostyki i leczenia.',
    ],
    listy: [
      {
        tytul: 'W naszej pracowni endoskopii wykonujemy',
        punkty: [
          'gastroskopię (badanie górnego odcinka przewodu pokarmowego)',
          'kolonoskopię (badanie jelita grubego)',
        ],
      },
      {
        tytul: 'Formy znieczulenia',
        punkty: [
          'znieczulenie miejscowe (z użyciem lidokainy)',
          'analgosedacja (sedacja dożylna zapewniająca komfort i ograniczenie odczuć bólowych)',
          'znieczulenie anestezjologiczne w obecności lekarza anestezjologa',
        ],
      },
      {
        tytul: 'Zabiegi diagnostyczne i terapeutyczne',
        punkty: [
          'usuwanie polipów (polipektomia)',
          'pobieranie wycinków do badań histopatologicznych',
          'tamowanie drobnych krwawień z przewodu pokarmowego',
          'ocena zmian zapalnych i nowotworowych',
        ],
      },
      {
        tytul: 'Dlaczego warto nas wybrać',
        punkty: [
          'nowoczesny sprzęt endoskopowy',
          'różne opcje znieczulenia dopasowane do potrzeb pacjenta',
          'możliwość wykonania diagnostyki i zabiegu podczas jednej wizyty',
          'opieka doświadczonego zespołu specjalistów',
          'przyjazne podejście do dzieci i dorosłych',
        ],
      },
    ],
    cenniki: [
      {
        naglowek: 'Konsultacje',
        weekend: false,
        pozycje: [
          { usluga: 'Konsultacja Gastroenterologiczna', cena: 'od 300 do 350 zł' },
          { usluga: 'Konsultacja Gastroenterologiczna w weekend', cena: 'od 400 do 450 zł' },
        ],
      },
      {
        naglowek: 'Gastroskopia',
        weekend: true,
        pozycje: [
          { usluga: 'Gastroskopia', cena: '550zł', cenaWeekend: '600zł' },
          { usluga: 'Gastroskopia z analgosedacją', cena: '900zł', cenaWeekend: '1100zł' },
          { usluga: 'Gastroskopia w znieczuleniu ogólnym', cena: '1300zł' },
          { usluga: 'Kolonoskopia + Gastroskopia w znieczuleniu ogólnym', cena: '2500zł' },
          { usluga: 'Gastroskopia z testem na Helicobacter pylori', cena: '550zł', cenaWeekend: 'n/d' },
          {
            usluga: 'Gastroskopia z testem na Helicobacter pylori + znieczulenie',
            cena: '900zł',
            cenaWeekend: 'n/d',
          },
        ],
      },
      {
        naglowek: 'Kolonoskopia',
        weekend: true,
        pozycje: [
          { usluga: 'Kolonoskopia', cena: '650zł', cenaWeekend: '700zł' },
          { usluga: 'Kolonoskopia + znieczulenie (analgosedacja)', cena: '1000zł', cenaWeekend: '1200zł' },
          { usluga: 'Kolonoskopia + Gastroskopia', cena: '1300zł' },
          {
            usluga: 'Kolonoskopia + Gastroskopia + znieczulenie (analgosedacja)',
            cena: '1600zł',
            cenaWeekend: '2000zł',
          },
          { usluga: 'Kolonoskopia w znieczuleniu ogólnym', cena: '1400zł' },
          { usluga: 'Kolonoskopia + Gastroskopia w znieczuleniu ogólnym', cena: '2500zł' },
          { usluga: 'Sigmoidoskopia', cena: '500zł', cenaWeekend: 'n/d' },
          { usluga: 'Usunięcie polipów', cena: '200zł', cenaWeekend: 'n/d' },
          { usluga: 'Usuwanie polipów pętlą', cena: '500zł' },
          { usluga: 'Wycinek do badań histopatologicznych', cena: '130zł', cenaWeekend: 'n/d' },
        ],
      },
    ],
    lekarze: [
      'dr n. med. Hubert Zatorski',
      'lek. Michał Stasiak',
      'lek. Magdalena Barańska',
      'dr n. med. Milena Padysz',
      'dr n. med. Dariusz Krzyczmanik',
      'lek. Julia Banasik',
      'dr n. med. i n. o zdr. Danuta Domżał-Magrowska',
      'Dr n. med. Izabela Kubińska',
      'Dr n.med. Krzysztof Grzegorczyk',
      'Dr n. med. Rafał Drozda',
    ],
  },
  {
    slug: 'chirurgia',
    nazwa: 'Chirurgia',
    opis: [
      'Oferujemy ambulatoryjną opiekę chirurgiczną, obejmującą konsultacje oraz drobne zabiegi wykonywane w komfortowych i bezpiecznych warunkach.',
      'Zapewniamy indywidualne podejście do pacjenta oraz dbałość o najwyższe standardy bezpieczeństwa i higieny.',
    ],
    listy: [
      {
        tytul: 'Zakres usług obejmuje',
        punkty: [
          'konsultacje chirurgiczne',
          'usuwanie szwów',
          'zmianę opatrunków',
          'usuwanie znamion skórnych',
          'kwalifikację do dalszego leczenia chirurgicznego',
          'kontrolę po zabiegach',
        ],
      },
    ],
    cenniki: [
      {
        weekend: false,
        pozycje: [
          { usluga: 'Konsultacja chirurgiczna', cena: '350zł' },
          { usluga: 'Usunięcie szwów wraz z konsultacją', cena: 'od 450zł' },
          { usluga: 'Wizyta kontrolna', cena: '200zł' },
          { usluga: 'Nacięcie zakrzepu brzeżnego', cena: 'od 700zł' },
          { usluga: 'Zmiana opatrunku', cena: 'od 250zł' },
          { usluga: 'Usuwanie znamion skórnych', cena: '350-600zł (każdy kolejny 100zł)' },
        ],
      },
    ],
    lekarze: ['Dr n. med. Rafał Drozda'],
  },
  {
    slug: 'reumatologia',
    nazwa: 'Reumatologia',
    opis: [
      'Zajmujemy się diagnostyką oraz leczeniem chorób układu ruchu i schorzeń reumatycznych. Pomagamy pacjentom zmagającym się z bólem stawów, stanami zapalnymi oraz chorobami autoimmunologicznymi.',
      'Nowoczesna diagnostyka obrazowa pozwala na szybką i precyzyjną ocenę stanu zdrowia pacjenta.',
    ],
    listy: [
      {
        tytul: 'Zakres usług obejmuje',
        punkty: [
          'konsultacje reumatologiczne',
          'badania USG narządu ruchu (stawów, ścięgien, tkanek miękkich)',
          'diagnostykę zmian zapalnych i zwyrodnieniowych',
          'monitorowanie przebiegu leczenia',
        ],
      },
    ],
    cenniki: [
      {
        weekend: false,
        pozycje: [
          { usluga: 'Konsultacja reumatologiczna', cena: '300zł' },
          { usluga: 'USG barku', cena: '200zł' },
          { usluga: 'USG ręki', cena: '200zł' },
          { usluga: 'USG stawu kolanowego', cena: '200zł' },
          { usluga: 'USG stawu skokowego', cena: '200zł' },
          { usluga: 'USG stawu łokciowego', cena: '200zł' },
          { usluga: 'USG stawów barkowych', cena: '300zł' },
          { usluga: 'USG stawów kolanowych', cena: '300zł' },
          { usluga: 'USG stawów skokowych', cena: '300zł' },
        ],
      },
    ],
    lekarze: ['Dr Joanna Kowalska–Majka'],
  },
  {
    slug: 'kardiologia',
    nazwa: 'Kardiologia',
    opis: [
      'Oferujemy kompleksową opiekę kardiologiczną, obejmującą profilaktykę, diagnostykę oraz leczenie chorób serca i układu krążenia.',
      'Zapewniamy profesjonalną opiekę oraz nowoczesny sprzęt diagnostyczny, co pozwala na szybkie i trafne rozpoznanie problemów kardiologicznych.',
    ],
    listy: [
      {
        tytul: 'Zakres usług obejmuje',
        punkty: [
          'konsultacje kardiologiczne',
          'badania EKG (elektrokardiografia)',
          'badania ECHO serca (echokardiografia)',
          'ocenę ryzyka sercowo-naczyniowego',
          'diagnostykę zaburzeń rytmu serca i nadciśnienia',
        ],
      },
    ],
    cenniki: [
      {
        weekend: false,
        pozycje: [
          { usluga: 'Konsultacja kardiologiczna', cena: '250zł' },
          { usluga: 'Konsultacja kardiologiczna + ECHO', cena: '350zł' },
          { usluga: 'USG serca (echo serca)', cena: '220zł' },
          { usluga: 'EKG spoczynkowe', cena: '40zł' },
          { usluga: 'EKG spoczynkowe z opisem kardiologa', cena: '90zł' },
        ],
      },
    ],
    lekarze: ['lek. Łukasz Spadliński', 'Dr n.med. Adam Rafał Poliwczak'],
  },
  {
    slug: 'psychologia',
    nazwa: 'Psychologia',
    opis: [
      'Twoje emocje mają znaczenie – skorzystaj z profesjonalnego wsparcia psychologicznego! Szukasz pomocy, zrozumienia i konkretnych rozwiązań? W naszym centrum medycznym oferujemy kompleksowe wsparcie dla dzieci, młodzieży i dorosłych. Pracujemy z empatią, doświadczeniem i indywidualnym podejściem do każdego pacjenta.',
      'Nasz zespół tworzą wykwalifikowani psycholodzy, terapeuci i mediatorzy, którzy łączą wieloletnie doświadczenie z empatycznym podejściem do każdego pacjenta. Pracujemy z osobami w różnym wieku i w różnych sytuacjach życiowych, zapewniając fachową pomoc opartą na rzetelnej wiedzy i szacunku.',
      'Wierzymy, że skuteczna pomoc psychologiczna wymaga uważności na indywidualną historię i potrzeby każdego człowieka. Dlatego nasza praca opiera się na dokładnym zrozumieniu sytuacji pacjenta i dopasowaniu formy terapii do jego możliwości, celów i tempa.',
      'Tworzymy atmosferę pełną zrozumienia, życzliwości i zaufania. Nasze gabinety to przestrzeń, w której możesz mówić swobodnie, bez oceniania i obaw.',
      'Zrób pierwszy krok. Skontaktuj się z nami i przekonaj się, że pomoc jest bliżej, niż myślisz. Ciepło Cię przywitamy i wspólnie znajdziemy najlepszą drogę do poprawy Twojego samopoczucia.',
    ],
    listy: [
      {
        tytul: 'Oferta',
        punkty: [
          'Kompleksowa oferta psychologiczna — diagnoza psychologiczna, terapia i specjalistyczne wsparcie dostosowane do indywidualnych potrzeb',
          'Diagnoza psychologiczna — korzystamy z nowoczesnych metod, takich jak test inteligencji Stanford-Binet',
          'TUS — Trening Umiejętności Społecznych, skuteczna metoda wspierająca dzieci i młodzież w budowaniu relacji, asertywności i kontroli emocji',
        ],
      },
    ],
    cenniki: [
      {
        weekend: false,
        pozycje: [
          { usluga: 'Konsultacje (50 minut) — pierwsza wizyta', cena: '220 zł' },
          { usluga: 'Konsultacje (50 minut) — kolejna wizyta', cena: '200 zł' },
          { usluga: 'Terapia psychologiczna (50 minut) — pierwsza wizyta', cena: '220 zł' },
          { usluga: 'Terapia psychologiczna (50 minut) — kolejna wizyta', cena: '200 zł' },
          { usluga: 'Mediacje (60 minut) — pierwsza wizyta', cena: '450 zł' },
          { usluga: 'Mediacje (60 minut) — kolejna wizyta', cena: '400 zł' },
          { usluga: 'Zaświadczenie psychologa', cena: '160 zł' },
          { usluga: 'Opinia psychologiczna', cena: '160 zł' },
          { usluga: 'Konsultacja diagnostyczna', cena: '280 zł' },
          { usluga: 'Skala Inteligencji Stanford-Binet 5 (SB5)', cena: '300 zł' },
          {
            usluga: 'Diagnoza spektrum autyzmu (5 wizyt) bez ADOS + wizyta u lekarza zgodnie z cennikiem',
            cena: 'od 2100 zł',
          },
          {
            usluga: 'Diagnoza spektrum autyzmu (5 wizyt) z ADOS + wizyta u lekarza zgodnie z cennikiem',
            cena: 'od 3000 zł',
          },
          {
            usluga: 'Test ADOS — raport z badania, wywiad 50 minut + test (2x50 minut)',
            cena: 'od 1200 zł',
          },
          { usluga: 'MMPI-2 — pierwsza wizyta wywiad, druga i trzecia wizyta test', cena: '1100-1400 zł' },
        ],
      },
    ],
    lekarze: ['Dominika Buczyńska'],
  },
  {
    slug: 'dietetyka',
    nazwa: 'Dietetyka',
    opis: [
      'Oferujemy profesjonalne wsparcie dietetyczne, oparte na indywidualnym podejściu do potrzeb pacjenta. Pomagamy w poprawie nawyków żywieniowych, redukcji masy ciała, budowaniu zdrowej sylwetki oraz wspieraniu leczenia dietą w różnych jednostkach chorobowych.',
      'Każdy plan żywieniowy opracowywany jest w oparciu o szczegółowy wywiad, uwzględniający tryb życia, aktywność fizyczną, wyniki badań oraz ewentualne choroby współistniejące.',
      'Pomagamy osiągnąć trwałe efekty w zdrowy i bezpieczny sposób.',
    ],
    listy: [
      {
        tytul: 'Zakres usług obejmuje',
        punkty: [
          'konsultacje dietetyczne',
          'wizyty kontrolne monitorujące postępy',
          'analizę składu ciała (m.in. poziom tkanki tłuszczowej, masy mięśniowej i nawodnienia)',
          'indywidualne jadłospisy dostosowane do stylu życia, preferencji oraz stanu zdrowia',
          'plany żywieniowe na 7, 14, 21 oraz 30 dni',
        ],
      },
      {
        tytul: 'Dlaczego warto skorzystać z naszej opieki dietetycznej',
        punkty: [
          'indywidualne podejście do każdego pacjenta',
          'realne i możliwe do utrzymania zalecenia',
          'wsparcie na każdym etapie zmiany nawyków',
          'jadłospisy dopasowane do codziennego trybu życia',
          'kompleksowe podejście do zdrowia i samopoczucia',
        ],
      },
    ],
    cenniki: [],
    lekarze: ['mgr Paulina Kruk', 'Oliwia Ścigalska'],
  },
  {
    slug: 'proktologia',
    nazwa: 'Proktologia',
    opis: [
      'Proktologia to dziedzina medycyny zajmująca się diagnostyką, leczeniem oraz profilaktyką chorób końcowego odcinka przewodu pokarmowego – odbytnicy, kanału odbytu i okolic odbytu. Choć schorzenia proktologiczne często należą do tematów krępujących dla pacjentów, ich wczesne rozpoznanie i odpowiednie leczenie pozwalają skutecznie wyeliminować dolegliwości oraz zapobiec poważniejszym powikłaniom.',
      'W AmiCare zapewniamy kompleksową opiekę proktologiczną obejmującą konsultacje specjalistyczne, diagnostykę oraz dobór indywidualnego leczenia. Zajmujemy się rozpoznawaniem i leczeniem najczęstszych schorzeń proktologicznych, takich jak hemoroidy, szczeliny odbytu, przetoki, ropnie okołoodbytnicze, polipy oraz innych chorób końcowego odcinka jelita grubego.',
      'Do objawów, które powinny skłonić do konsultacji z proktologiem, należą między innymi: ból podczas wypróżniania, krwawienie z odbytu, świąd, pieczenie, uczucie dyskomfortu lub niepełnego wypróżnienia, a także przewlekłe zaparcia lub biegunki. Wiele schorzeń proktologicznych rozwija się stopniowo, dlatego nie warto odkładać wizyty u specjalisty.',
      'Pacjentami poradni proktologicznej AmiCare opiekuje się dr n. med. Rafał Drozda – specjalista chirurgii ogólnej i onkologicznej, gastroenterolog oraz proktolog, od lat zajmujący się diagnostyką i leczeniem chorób przewodu pokarmowego oraz schorzeń proktologicznych.',
      'Dbamy o komfort, dyskrecję i bezpieczeństwo każdego pacjenta, zapewniając profesjonalną opiekę medyczną oraz indywidualne podejście na każdym etapie diagnostyki i leczenia.',
    ],
    cenniki: [
      {
        weekend: false,
        pozycje: [{ usluga: 'Konsultacja proktologiczna', cena: '350zł' }],
      },
    ],
    lekarze: ['Dr n. med. Rafał Drozda'],
  },
];
