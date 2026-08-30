export interface Partner {
  nazwa: string;
  opis: string;
  /** Pełny adres strony partnera. Brak = link się nie renderuje. */
  url?: string;
  /** Logo w public/images/partnerzy/. Brak = kafelek pokazuje samą nazwę. */
  logo?: string;
  /** Szerokość pliku logo przy wysokości 80 px - rezerwuje miejsce i chroni przed CLS. */
  logoWidth?: number;
}

export interface GrupaPartnerow {
  id: string;
  tytul: string;
  lead: string;
  partnerzy: Partner[];
}

export const GRUPY_PARTNEROW: GrupaPartnerow[] = [
  {
    id: 'ubezpieczyciele',
    tytul: 'Ubezpieczyciele i operatorzy medyczni',
    lead:
      'Realizujemy konsultacje specjalistyczne, badania diagnostyczne i zabiegi endoskopowe w ramach polis oraz abonamentów poniższych podmiotów. Zakres świadczeń zależy od wykupionego pakietu - przed wizytą potwierdź go u swojego ubezpieczyciela lub w naszej rejestracji.',
    partnerzy: [
      {
        nazwa: 'Allianz',
        logo: 'images/partnerzy/allianz.webp',
        logoWidth: 280,
        opis: 'Ubezpieczenia zdrowotne indywidualne i grupowe.',
        url: 'https://www.allianz.pl/',
      },
      {
        nazwa: 'Generali Zdrowie',
        logo: 'images/partnerzy/generali-zdrowie.webp',
        logoWidth: 314,
        opis: 'Polisy zdrowotne Generali dla klientów indywidualnych i firm.',
        url: 'https://www.generali.pl/',
      },
      {
        nazwa: 'JP Medica',
        logo: 'images/partnerzy/jp-medica.webp',
        logoWidth: 236,
        opis: 'Abonamenty medyczne z ogólnopolską siecią placówek partnerskich.',
        url: 'https://jpmedica.com.pl/',
      },
      {
        nazwa: 'LUX MED',
        logo: 'images/partnerzy/luxmed.webp',
        logoWidth: 166,
        opis: 'Pakiety medyczne dla pracowników i klientów indywidualnych.',
        url: 'https://www.luxmed.pl/',
      },
      {
        nazwa: 'Medicover',
        logo: 'images/partnerzy/medicover.webp',
        logoWidth: 153,
        opis: 'Prywatna opieka medyczna w ramach abonamentu i ubezpieczenia.',
        url: 'https://www.medicover.pl/',
      },
      {
        nazwa: 'POLMED',
        logo: 'images/partnerzy/polmed.webp',
        logoWidth: 306,
        opis: 'Abonamenty i pakiety medyczne dla firm oraz osób prywatnych.',
        url: 'https://www.polmed.pl/',
      },
      {
        nazwa: 'PZU Zdrowie',
        logo: 'images/partnerzy/pzu-zdrowie.webp',
        logoWidth: 87,
        opis: 'Ubezpieczenia zdrowotne i abonamenty PZU.',
        url: 'https://zdrowie.pzu.pl/',
      },
      {
        nazwa: 'Saneo',
        logo: 'images/partnerzy/saneo.webp',
        logoWidth: 215,
        opis: 'Pakiety opieki medycznej realizowane u partnerów sieci.',
      },
      {
        nazwa: 'Telemedi',
        logo: 'images/partnerzy/telemedi.webp',
        logoWidth: 384,
        opis: 'Teleporady i opieka koordynowana z dostępem do placówek stacjonarnych.',
        url: 'https://www.telemedi.com/',
      },
    ],
  },
  {
    id: 'partnerzy-lokalni',
    tytul: 'Partnerzy w Łodzi',
    lead:
      'Z podmiotami działającymi w Łodzi łączy nas wspólna opieka nad pacjentem: konsultacje specjalistyczne i diagnostyka po naszej stronie, opieka codzienna i transport po ich stronie.',
    partnerzy: [
      {
        nazwa: 'Ostoja Seniora',
        opis:
          'Apartamenty i opieka senioralna na łódzkim Romanowie - kilka minut od naszej placówki przy ul. Romanowskiej 55N. Mieszkańcom zapewniamy konsultacje specjalistyczne i diagnostykę na miejscu.',
        url: 'https://ostoja-seniora.pl/',
      },
      {
        nazwa: 'DASMED',
        logo: 'images/partnerzy/dasmed.webp',
        logoWidth: 80,
        opis:
          'Transport medyczny i sanitarny 24/7 w Łodzi oraz opieka nad seniorami. Odpowiada za dowóz pacjentów na badania endoskopowe i zabiegi wymagające znieczulenia.',
        url: 'https://dasmed.pl/',
      },
    ],
  },
];
