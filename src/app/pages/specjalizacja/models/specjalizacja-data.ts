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

export interface Kafelek {
  nazwa: string;
  opis: string;
  link: string;
}

export interface SpecjalizacjaInfo {
  slug: string;
  nazwa: string;
  opis: string[];
  listy?: { tytul: string; punkty: string[] }[];
  kafelkiNaglowek?: string;
  kafelki?: Kafelek[];
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
      'Prowadzimy również leczenie biologiczne. Polega ono na podawaniu preparatów biologicznych, które zmniejszają odpowiedź zapalną w organizmie - łagodzą objawy i zatrzymują dalszy rozwój choroby. Terapia jest przeznaczona dla pacjentów z zaawansowanymi chorobami autoimmunologicznymi, opornymi na leczenie konwencjonalne, którzy nie mogą wziąć udziału w badaniach klinicznych.',
      'W AmiCare stosujemy dwa preparaty: Yuflyma (adalimumab) i Remsima (infliksymab). Cały proces przebiega zgodnie z aktualnymi wytycznymi, pod nadzorem lekarzy specjalistów z doświadczeniem w tym zakresie. Koszt ustalamy indywidualnie po pierwszej wizycie u specjalisty.',
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
        tytul: 'Wskazania do leczenia biologicznego',
        punkty: [
          'choroby zapalne jelit: choroba Leśniowskiego-Crohna, wrzodziejące zapalenie jelita grubego',
          'choroby reumatyczne: reumatoidalne zapalenie stawów, zesztywniające zapalenie stawów kręgosłupa, młodzieńcze idiopatyczne zapalenie stawów, łuszczycowe zapalenie stawów',
          'choroby o podłożu alergicznym: astma, atopowe zapalenie skóry, pokrzywka idiopatyczna',
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
    kafelkiNaglowek: 'Terapia biologiczna',
    kafelki: [
      {
        nazwa: 'Leczenie biologiczne',
        opis:
          'Terapia preparatami biologicznymi (Yuflyma, Remsima) w nieswoistych chorobach zapalnych jelit - ' +
          'chorobie Leśniowskiego-Crohna i wrzodziejącym zapaleniu jelita grubego. Podanie leku pod nadzorem zespołu medycznego.',
        link: '/badania-diagnostyczne/leczenie-biologiczne',
      },
    ],
    cenniki: [
      {
        naglowek: 'Konsultacje',
        weekend: false,
        pozycje: [
          { usluga: 'Konsultacja Gastroenterologiczna', cena: 'od 300 do 350 zł' },
          { usluga: 'Konsultacja Gastroenterologiczna w weekend', cena: 'od 400 do 450 zł' },
          {
            usluga: 'Leczenie biologiczne (Yuflyma, Remsima)',
            cena: 'ustalana indywidualnie po pierwszej wizycie',
          },
        ],
      },
      {
        naglowek: 'Gastroskopia',
        weekend: true,
        pozycje: [
          {
            usluga: 'Gastroskopia (z testem na Helicobacter pylori)',
            cena: '550zł',
            cenaWeekend: '600zł',
          },
          {
            usluga: 'Gastroskopia w znieczuleniu analgosedacji (z testem na Helicobacter pylori)',
            cena: '900zł',
            cenaWeekend: '1100zł',
          },
          {
            usluga: 'Gastroskopia w znieczuleniu ogólnym (z testem na Helicobacter pylori)',
            cena: '1000zł',
            cenaWeekend: 'n/d',
          },
        ],
      },
      {
        naglowek: 'Kolonoskopia',
        weekend: true,
        pozycje: [
          { usluga: 'Kolonoskopia', cena: '650zł', cenaWeekend: '700zł' },
          {
            usluga: 'Kolonoskopia w znieczuleniu analgosedacji',
            cena: '1000zł',
            cenaWeekend: '1200zł',
          },
          { usluga: 'Kolonoskopia w znieczuleniu ogólnym', cena: '1100zł', cenaWeekend: 'n/d' },
          { usluga: 'Sigmoidoskopia', cena: '500zł', cenaWeekend: 'n/d' },
        ],
      },
      {
        naglowek: 'Kolonoskopia + Gastroskopia',
        weekend: true,
        pozycje: [
          { usluga: 'Kolonoskopia + Gastroskopia', cena: '1300zł' },
          {
            usluga: 'Kolonoskopia + Gastroskopia w znieczuleniu analgosedacji',
            cena: '1600zł',
            cenaWeekend: '2000zł',
          },
          { usluga: 'Kolonoskopia + Gastroskopia w znieczuleniu ogólnym', cena: '2500zł' },
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
    slug: 'hepatologia',
    nazwa: 'Hepatologia',
    opis: [
      'Hepatologia zajmuje się chorobami wątroby, dróg żółciowych i trzustki. Do konsultacji hepatologicznej najczęściej kieruje wynik badań krwi: podwyższone próby wątrobowe (ALT, AST, GGTP, bilirubina) albo obraz stłuszczenia wątroby opisany w USG jamy brzusznej.',
      'Wątroba długo nie boli. Choroba potrafi rozwijać się latami bez wyraźnych objawów, a pierwszym sygnałem bywa przypadkowo wykonane badanie. Dlatego nieprawidłowego wyniku prób wątrobowych nie warto zostawiać bez wyjaśnienia - nawet gdy nic nie dolega.',
      'W AmiCare konsultacje hepatologiczne prowadzą gastroenterolodzy zajmujący się chorobami wątroby: dr n. med. Hubert Zatorski i dr n. med. Milena Padysz. Podczas wizyty lekarz analizuje dotychczasowe wyniki, przeprowadza szczegółowy wywiad i planuje dalszą diagnostykę lub leczenie.',
      'Diagnostykę wykonujemy na miejscu: badania krwi, USG jamy brzusznej oraz - jeśli obraz kliniczny tego wymaga - gastroskopię i kolonoskopię w naszej pracowni endoskopii.',
    ],
    listy: [
      {
        tytul: 'Zajmujemy się między innymi',
        punkty: [
          'stłuszczeniową chorobą wątroby (w tym niealkoholową)',
          'przewlekłymi wirusowymi zapaleniami wątroby typu B i C',
          'autoimmunologicznymi chorobami wątroby i dróg żółciowych',
          'polekowym i toksycznym uszkodzeniem wątroby',
          'włóknieniem i marskością wątroby oraz ich powikłaniami',
          'kamicą żółciową i chorobami dróg żółciowych',
          'przewlekłym zapaleniem trzustki',
        ],
      },
      {
        tytul: 'Kiedy zgłosić się do hepatologa',
        punkty: [
          'nieprawidłowe próby wątrobowe w badaniach krwi',
          'stłuszczenie lub inne zmiany wątroby opisane w USG',
          'przewlekłe zmęczenie, świąd skóry, zażółcenie skóry lub oczu',
          'ból w prawym podżebrzu, nudności, brak apetytu',
          'rozpoznana cukrzyca, otyłość lub zaburzenia lipidowe - to czynniki ryzyka stłuszczenia wątroby',
          'przewlekłe przyjmowanie leków obciążających wątrobę',
        ],
      },
      {
        tytul: 'Diagnostyka dostępna na miejscu',
        punkty: [
          'pobranie krwi i badania laboratoryjne',
          'USG jamy brzusznej',
          'gastroskopia i kolonoskopia w pracowni endoskopii',
          'pobranie wycinków do badania histopatologicznego podczas endoskopii',
        ],
      },
    ],
    cenniki: [
      {
        naglowek: 'Konsultacje',
        weekend: true,
        pozycje: [
          {
            usluga: 'Konsultacja hepatologiczna',
            cena: 'od 300 do 350 zł',
            cenaWeekend: 'od 400 do 450 zł',
          },
        ],
      },
    ],
    lekarze: ['dr n. med. Hubert Zatorski', 'dr n. med. Milena Padysz'],
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
    kafelkiNaglowek: 'Terapia biologiczna',
    kafelki: [
      {
        nazwa: 'Leczenie biologiczne',
        opis:
          'Terapia preparatami biologicznymi (Yuflyma, Remsima) w reumatoidalnym i łuszczycowym zapaleniu stawów, ' +
          'zesztywniającym zapaleniu stawów kręgosłupa oraz młodzieńczym idiopatycznym zapaleniu stawów.',
        link: '/badania-diagnostyczne/leczenie-biologiczne',
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
    lekarze: ['Dr Joanna Kowalska-Majka'],
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
      'Prowadzimy konsultacje, terapię i diagnozę psychologiczną dla dzieci, młodzieży i dorosłych.',
      'Nasz zespół tworzą wykwalifikowani psycholodzy, terapeuci i mediatorzy, którzy łączą wieloletnie doświadczenie z empatycznym podejściem do każdego pacjenta. Pracujemy z osobami w różnym wieku i w różnych sytuacjach życiowych, zapewniając fachową pomoc opartą na rzetelnej wiedzy i szacunku.',
      'Formę terapii dobieramy po rozpoznaniu sytuacji pacjenta - do jego możliwości, celów i tempa pracy.',
      'Tworzymy atmosferę pełną zrozumienia, życzliwości i zaufania. Nasze gabinety to przestrzeń, w której możesz mówić swobodnie, bez oceniania i obaw.',
      'Pierwsza wizyta trwa 50 minut i służy rozpoznaniu problemu oraz ustaleniu dalszych kroków.',
    ],
    listy: [
      {
        tytul: 'Oferta',
        punkty: [
          'Kompleksowa oferta psychologiczna - diagnoza psychologiczna, terapia i specjalistyczne wsparcie dostosowane do indywidualnych potrzeb',
          'Diagnoza psychologiczna - korzystamy z nowoczesnych metod, takich jak test inteligencji Stanford-Binet',
          'TUS - Trening Umiejętności Społecznych, skuteczna metoda wspierająca dzieci i młodzież w budowaniu relacji, asertywności i kontroli emocji',
        ],
      },
    ],
    cenniki: [
      {
        weekend: false,
        pozycje: [
          { usluga: 'Konsultacje (50 minut) - pierwsza wizyta', cena: '220 zł' },
          { usluga: 'Konsultacje (50 minut) - kolejna wizyta', cena: '200 zł' },
          { usluga: 'Terapia psychologiczna (50 minut) - pierwsza wizyta', cena: '220 zł' },
          { usluga: 'Terapia psychologiczna (50 minut) - kolejna wizyta', cena: '200 zł' },
          { usluga: 'Mediacje (60 minut) - pierwsza wizyta', cena: '450 zł' },
          { usluga: 'Mediacje (60 minut) - kolejna wizyta', cena: '400 zł' },
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
            usluga: 'Test ADOS - raport z badania, wywiad 50 minut + test (2x50 minut)',
            cena: 'od 1200 zł',
          },
          { usluga: 'MMPI-2 - pierwsza wizyta wywiad, druga i trzecia wizyta test', cena: '1100-1400 zł' },
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
      'Proktologia to dziedzina medycyny zajmująca się diagnostyką, leczeniem oraz profilaktyką chorób końcowego odcinka przewodu pokarmowego - odbytnicy, kanału odbytu i okolic odbytu. Choć schorzenia proktologiczne często należą do tematów krępujących dla pacjentów, ich wczesne rozpoznanie i odpowiednie leczenie pozwalają skutecznie wyeliminować dolegliwości oraz zapobiec poważniejszym powikłaniom.',
      'W AmiCare zapewniamy kompleksową opiekę proktologiczną obejmującą konsultacje specjalistyczne, diagnostykę oraz dobór indywidualnego leczenia. Zajmujemy się rozpoznawaniem i leczeniem najczęstszych schorzeń proktologicznych, takich jak hemoroidy, szczeliny odbytu, przetoki, ropnie okołoodbytnicze, polipy oraz innych chorób końcowego odcinka jelita grubego.',
      'Do objawów, które powinny skłonić do konsultacji z proktologiem, należą między innymi: ból podczas wypróżniania, krwawienie z odbytu, świąd, pieczenie, uczucie dyskomfortu lub niepełnego wypróżnienia, a także przewlekłe zaparcia lub biegunki. Wiele schorzeń proktologicznych rozwija się stopniowo, dlatego nie warto odkładać wizyty u specjalisty.',
      'Pacjentami poradni proktologicznej AmiCare opiekuje się dr n. med. Rafał Drozda - specjalista chirurgii ogólnej i onkologicznej, gastroenterolog oraz proktolog, od lat zajmujący się diagnostyką i leczeniem chorób przewodu pokarmowego oraz schorzeń proktologicznych.',
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
