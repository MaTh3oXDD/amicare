export interface Doctor {
  name: string;
  title: string;
  bio?: string;
  photo?: string;
  /** Profil na ZnanyLekarz.pl - tylko jeśli lekarz faktycznie tam widnieje */
  znanyLekarz?: string;
}

export const LEKARZE: Doctor[] = [
  {
    name: 'Dr n. med. Rafał Drozda',
    title: 'Specjalista chirurgii ogólnej i onkologicznej. Specjalista gastroenterolog, proktolog.',
    bio: 'Jest specjalistą chirurgii ogólnej i onkologicznej, który od lat zajmuje się przede wszystkim leczeniem chorób przewodu pokarmowego i proktologią.',
    photo: 'images/zespol/rafal-drozda.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/rafal-drozda/chirurg-onkologiczny-proktolog-gastrolog/lodz',
  },
  {
    name: 'lek. Magdalena Barańska',
    title: 'Gastroenterolog',
    bio: 'Swoje zainteresowania zawodowe skupia wokół diagnostyki i leczenia głównie nieswoistych chorób zapalnych jelit (wrzodziejące zapalenie jelita grubego, choroba Leśniowskiego - Crohna), jak również ostrego i przewlekłego zapalenia trzustki.',
    photo: 'images/zespol/magdalena-baranska.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/magdalena-baranska/gastrolog-internista/lodz',
  },
  {
    name: 'lek. Karolina Kabot',
    title: 'Anestezjolog',
  },
  {
    name: 'lek. Leszek Weber',
    title: 'Anestezjolog',
  },
  {
    name: 'Dr n.med. Jacek Przybyła',
    title: 'Lekarz specjalista w zakresie urologii',
    bio: 'Studia medyczne ukończył jako absolwent Wydziału Lekarskiego Akademii Medycznej w Łodzi, w 2008 roku uzyskał tytuł specjalisty europejskiego w dziedzinie urologii.',
  },
  {
    name: 'Dr n.med. Krzysztof Grzegorczyk',
    title: 'Specjalista w zakresie medycyny internistycznej, gastroenterologii oraz chorób zakaźnych',
    bio: 'Studia medyczne ukończył jako absolwent Wojskowej Akademii Medycznej w Łodzi, a w roku 1986 uzyskał stopień doktora nauk medycznych.',
    znanyLekarz: 'https://www.znanylekarz.pl/krzysztof-grzegorczyk/gastrolog/lodz',
  },
  {
    name: 'Dr Karolina Niczyporuk',
    title: 'Lekarz specjalista w zakresie otolaryngologii dziecięcej',
    bio: 'Ukończyła studia medyczne na Wydziale Wojskowo - Lekarskim Uniwersytetu Medycznego w Łodzi. Aktualnie zajmuje stanowisko Młodszego Asystenta w Klinice Otolaryngologii Audiologii i Foniatrii Dziecięcej.',
    photo: 'images/zespol/karolina-niczyporuk.webp',
  },
  {
    name: 'lek. Julia Banasik',
    title: 'Gastroenterolog',
    bio: 'W swojej pracy klinicznej zajmuje się diagnostyką i leczeniem chorób przewodu pokarmowego, a jej szczególnym obszarem zainteresowania są nieswoiste choroby zapalne jelit oraz choroba uchyłkowa.',
    photo: 'images/zespol/julia-banasik.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/julia-banasik/gastrolog/lodz',
  },
  {
    name: 'Prof. dr hab. n.med. Joanna Jerzyńska',
    title: 'Lekarz specjalista w zakresie pediatrii oraz alergologii',
    bio: 'Studia medyczne ukończyła na Akademii Medycznej w Łodzi, w 2001 r. zdobyła tytuł specjalisty w dziedzinie pediatrii (I st.) jak również tytuł doktora nauk medycznych.',
    photo: 'images/zespol/joanna-jerzynska.webp',
  },
  {
    name: 'lek. Łukasz Spadliński',
    title: 'Kardiolog',
    bio: 'Jest specjalistą kardiologii. Od 2019 roku pracuje w Klinice Kardiologii CSK UM w Łodzi, gdzie na co dzień zajmuje się diagnostyką oraz leczeniem chorób serca.',
    photo: 'images/zespol/lukasz-spadlinski-kardiolog.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/lukasz-spadlinski/kardiolog/lodz',
  },
  {
    name: 'Dominika Buczyńska',
    title: 'Psycholog',
    bio: 'Pracuje z dziećmi, młodzieżą i dorosłymi. Specjalizuje się w pracy z małymi dziećmi w zakresie wczesnego wspomagania rozwoju.',
  },
  {
    name: 'Dr n.med. Natalia Zawada-Kornalewicz',
    title: 'Lekarz specjalista w zakresie chorób wewnętrznych, diabetologii i endokrynologii',
    bio: 'Ukończyła studia medyczne jako absolwent Uniwersytetu Medycznego w Łodzi, a następnie uzyskała tytuł doktora nauk medycznych.',
    photo: 'images/zespol/natalia-zawada-kornalewicz.webp',
  },
  {
    name: 'dr n. med. Hubert Zatorski',
    title: 'Gastroenterolog',
    bio: 'Członek towarzystw naukowych: Polskiego Towarzystwa Gastroenterologicznego, European Society of Gastrointestinal Endoscopy (ESGE), Polskiego Towarzystwa Żywienia Pozajelitowego, Dojelitowego i Metabolizmu (POLSPEN).',
    znanyLekarz: 'https://www.znanylekarz.pl/hubert-zatorski/gastrolog/lodz',
  },
  {
    name: 'Dr n.med. Agnieszka Bała',
    title: 'Lekarz specjalista w zakresie medycyny internistycznej oraz farmakologii klinicznej',
    bio: 'Ukończyła studia medyczne jako absolwentka Wydziału Lekarskiego Akademii Medycznej w Łodzi, posiada również tytuł doktora nauk medycznych.',
    photo: 'images/zespol/agnieszka-bala.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/agnieszka-bala-2/internista/lodz',
  },
  {
    name: 'Dr n.med. Dorota Czech',
    title: 'Lekarz specjalista w zakresie otolaryngologii - w szczególności dziecięcej',
    bio: 'Studia medyczne ukończyła jako absolwentka Wydziału Lekarskiego Uniwersytetu Medycznego w Łodzi, a następnie kontynuowała swoją ścieżkę edukacji na studiach doktoranckich UM w Łodzi.',
  },
  {
    name: 'Dr n.med. Łukasz Przysło',
    title: 'Specjalista w dziedzinie epileptologii, neurologii dziecięcej i pediatrii',
    bio: 'Studia medyczne ukończył na Uniwersytecie Medycznym w Łodzi, a kilka lat później zdobył stopień doktora nauk medycznych (2009 r.).',
  },
  {
    name: 'Dr Joanna Kowalska-Majka',
    title: 'Lekarz specjalista w zakresie reumatologii oraz chorób wewnętrznych',
    bio: 'Studia medyczne ukończyła jako absolwentka Wydziału Lekarskiego Uniwersytetu Medycznego w Łodzi.',
    photo: 'images/zespol/joanna-kowalska-majka.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/joanna-kowalska-majka/reumatolog-internista/lodz',
  },
  {
    name: 'lek. Michał Stasiak',
    title: 'Gastroenterolog',
    bio: 'Obszar zainteresowań w toku pracy zawodowej dotyczy chorób zapalnych trzustki (ostrego i przewlekłego zapalenia trzustki) oraz raka tego narządu, jak również nieswoistych chorób zapalnych jelit.',
    photo: 'images/zespol/michal-stasiak.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/michal-stasiak/gastrolog-internista/rzgow',
  },
  {
    name: 'dr n. med. Dariusz Krzyczmanik',
    title: 'Specjalista chorób zakaźnych',
    bio: 'Specjalista chorób wewnętrznych oraz chorób zakaźnych z wieloletnim doświadczeniem klinicznym. Zajmuje się diagnostyką i leczeniem schorzeń internistycznych oraz zakaźnych u pacjentów dorosłych i dzieci.',
    photo: 'images/zespol/dariusz-krzyczmanik.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/dariusz-krzyczmanik/internista-lekarz-chorob-zakaznych/lodz',
  },
  {
    name: 'dr n. med. Milena Padysz',
    title: 'Gastroenterolog',
    bio: 'Podczas pracy zajmuje się rozpoznawaniem i leczeniem chorób przewodu pokarmowego, zwłaszcza nieswoistych chorób zapalnych jelit, choroby uchyłkowej jelita grubego oraz zaburzeń czynnościowych jelit.',
    photo: 'images/zespol/milena-padysz.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/milena-padysz/gastrolog-internista/lodz',
  },
  {
    name: 'dr n. med. i n. o zdr. Danuta Domżał-Magrowska',
    title: 'Lekarz specjalista gastroenterologii i chorób wewnętrznych',
    bio: 'Jest lekarzem specjalistą gastroenterologii i chorób wewnętrznych. Z wyróżnieniem ukończyła wydział lekarski Uniwersytetu Medycznego.',
    photo: 'images/zespol/danuta-domzal-magrowska.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/danuta-domzal-magrowska/gastrolog-internista/lodz',
  },
  {
    name: 'Dr hab n. med. Mariola Świderek-Matysiak',
    title: 'Specjalista w zakresie neurologii oraz lekarz medycyny',
    bio: 'Jest absolwentką Akademii Medycznej w Łodzi, którą ukończyła z wyróżnieniem. W 1998 r. rozpoczęła studia doktoranckie na rodzimej uczelni.',
  },
  {
    name: 'Dr Katarzyna Przybyłowska-Kustosik',
    title: 'Lekarz specjalista w zakresie psychiatrii',
    bio: 'Ukończyła studia medyczne na Wydziale Lekarskim Uniwersytetu Medycznego w Białymstoku. Ukończyła kurs psychoterapii w Instytucie Ericksonowskim w Łodzi.',
    photo: 'images/zespol/dr-katarzyna-przybylowska-kustosik.webp',
  },
  {
    name: 'Dr n. med. Izabela Kubińska',
    title: 'Specjalistka chorób dziecięcych i gastroenterologii',
    bio: 'Ukończyła wydział lekarski na Uniwersytecie Medycznym w Łodzi, a specjalizację uzyskała w dziedzinie chorób dziecięcych i gastroenterologii, uzyskując ponadto stopień naukowy doktora nauk medycznych.',
    photo: 'images/zespol/izabela-kubinska.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/izabela-kubinska/pediatra-gastrolog/lodz',
  },
  {
    name: 'Dr n. med. Aleksandra Bała-Wojsznis',
    title: 'Lekarz specjalista w zakresie dermatologii oraz wenerologii',
    bio: 'Ukończyła studia medyczne na Wydziale Wojskowo - Lekarskim Akademii Medycznej w Łodzi. Posiada doświadczenie w prowadzeniu badań klinicznych jako współbadacz od 2008 roku.',
    photo: 'images/zespol/aleksandra-bala-wojsznis-1.webp',
  },
  {
    name: 'Dr n.med. Adam Rafał Poliwczak',
    title: 'Lekarz specjalista w zakresie kardiologii oraz chorób wewnętrznych',
    bio: 'Studia medyczne ukończył na Wojskowej Akademii Medycznej w Łodzi, w 2003 r. uzyskał stopień doktora nauk medycznych.',
    photo: 'images/zespol/adam-poliwczak-kardiolog.webp',
    znanyLekarz: 'https://www.znanylekarz.pl/adam-poliwczak/kardiolog-internista/lodz',
  },
];

export const DIETETYCY: Doctor[] = [
  {
    name: 'mgr Paulina Kruk',
    title: 'Dietetyczka | Indywidualna dietoterapia i zmiana nawyków żywieniowych',
    bio: 'Dyplomowana dietetyczka z doświadczeniem w pracy z pacjentami, oferująca spersonalizowane podejście i praktyczne zalecenia żywieniowe.',
  },
  {
    name: 'Oliwia Ścigalska',
    title: 'Dyplomowany dietetyk kliniczny',
    bio: 'Dyplomowany dietetyk kliniczny, absolwentka Uniwersytetu Medycznego w Łodzi oraz autor artykułów dla Dietetycy.org.pl.',
    photo: 'images/zespol/oliwia-scigalska.webp',
  },
];

export const KADRA: Doctor[] = [
  {
    name: 'Adam Juszczak',
    title: 'Dyrektor Zarządzający, Właściciel i współtwórca AmiCare sp. z o.o. sp.k.',
    bio: 'Absolwent Uniwersytetu Wrocławskiego. Od 2003 r. aktywnie działający w branży medycznej. Otwarty na nowe wyzwania zarówno w AmiCare jak i w sporcie.',
    photo: 'images/zespol/adam_juszczak.webp',
  },
  {
    name: 'Michał Bytomski',
    title: 'Prezes Zarządu, Właściciel i współtwórca AmiCare Centrum Medycznego',
    bio: 'Absolwent Akademii Morskiej w Szczecinie. Wykwalifikowany specjalista od lat działający w branży morskiej.',
    photo: 'images/zespol/michal-bytomski.webp',
  },
  {
    name: 'Marlena Serwacińska',
    title: 'Kierownik AmiCare Centrum Medycznego',
    bio: 'Od 2015 roku pracująca w szpitalach jako pielęgniarka, gdzie poznawała potrzeby oraz problemy pacjentów.',
    photo: 'images/zespol/marlena-serwacinska.webp',
  },
  {
    name: 'Jakub Majka',
    title: 'Kierownik Centrum Medycznego ds. usług medycznych',
    bio: 'Swoją przygodę zawodową rozpoczął właśnie w AmiCare Centrum Medycznym.',
    photo: 'images/zespol/jakub-majka.webp',
  },
  {
    name: 'Anna Góra',
    title: 'Kierownik ośrodka badań klinicznych',
    bio: 'Absolwentka Uniwersytetu Medycznego w Łodzi. Od ponad 20 lat związana z sektorem ochrony zdrowia.',
    photo: 'images/zespol/anna-gora-sm.webp',
  },
];

export const KOORDYNATORZY: Doctor[] = [
  {
    name: 'Maria Smul',
    title: 'Koordynator badań klinicznych',
    bio: 'Z wykształcenia - magister inżynier Biotechnologii, absolwentka Politechniki Łódzkiej. Posiada wieloletnie doświadczenie w badaniach klinicznych.',
  },
  {
    name: 'Dorota Sobczyk-Cłapa',
    title: 'Koordynator badań klinicznych',
    bio: 'Ukończyła Uniwersytet Łódzki zdobywając tytuł magistra chemii, a także Policealne Studium Farmaceutyczne pozwalające na pracę w aptece jako technik farmaceutyczny.',
    photo: 'images/zespol/dorota-sobczyk-clapa.webp',
  },
  {
    name: 'Karolina Szcześniak',
    title: 'Koordynator badań klinicznych',
    bio: 'W 2011 roku rozpoczęła swoją przygodę w badaniach klinicznych przechodząc przez różne stanowiska pracy.',
    photo: 'images/zespol/karolina-szczesniak.webp',
  },
];

export const PIELEGNIARKI: Doctor[] = [
  {
    name: 'Hubert Sadowski',
    title: 'Pielęgniarz',
    bio: 'Pielęgniarz z doświadczeniem zdobytym w warunkach Szpitalnego Oddziału Ratunkowego.',
    photo: 'images/zespol/hubert-sadowski-sm.webp',
  },
  {
    name: 'Angelika Jurkiewicz',
    title: 'Pielęgniarka badań klinicznych',
    bio: 'Pielęgniarka z doświadczeniem zdobytym w pracy z pacjentami pediatrycznymi.',
    photo: 'images/zespol/amicare-angelika-jurkiewicz-sm.webp',
  },
  { name: 'Dorota Dutkiewicz', title: 'Pielęgniarka' },
  { name: 'Marta Galoch', title: 'Pielęgniarka' },
  { name: 'Małgorzata Pietrzykowska', title: 'Pielęgniarka' },
  { name: 'Ewa Kaczmarek', title: 'Pielęgniarka' },
  { name: 'Katarzyna Mirecka', title: 'Pielęgniarka' },
  { name: 'Natalka Swiniarska', title: 'Pielęgniarka' },
  { name: 'Damian Stefański', title: 'Pielęgniarz' },
  { name: 'Damian Szczapa', title: 'Pielęgniarz' },
  { name: 'Anna Hydzińska', title: 'Pielęgniarka' },
  { name: 'Bartek Depczyński', title: 'Pielęgniarz' },
  { name: 'Mateusz Szpunar', title: 'Pielęgniarz' },
  { name: 'Jarosław Preś', title: 'Pielęgniarz' },
  { name: 'Bożena Skrzydlak', title: 'Pielęgniarka' },
  { name: 'Karolina Berkowska', title: 'Ratownik Medyczny' },
  { name: 'Michał Tersa', title: 'Ratownik Medyczny' },
  { name: 'Wojciech Wolski', title: 'Pielęgniarz' },
];
