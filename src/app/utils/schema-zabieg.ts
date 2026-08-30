const DOMENA = 'https://amicare.pl';

/**
 * JSON-LD dla pojedynczego badania endoskopowego.
 * `bodyLocation` i `preparation` to pola, które Google czyta przy zapytaniach
 * typu „jak przygotować się do kolonoskopii".
 */
export function schematZabiegu(opts: {
  nazwa: string;
  opis: string;
  sciezka: string;
  czescCiala: string;
  przygotowanie?: string;
  /** Cena w złotych, bez waluty - np. 650. Pomijana, gdy zabieg nie ma stałej ceny. */
  cena?: number;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: opts.nazwa,
    description: opts.opis,
    url: `${DOMENA}${opts.sciezka}`,
    procedureType: {
      '@type': 'MedicalProcedureType',
      name: 'Diagnostic procedure',
    },
    bodyLocation: opts.czescCiala,
    ...(opts.przygotowanie ? { preparation: opts.przygotowanie } : {}),
    howPerformed:
      'Badanie wykonuje lekarz endoskopista w Pracowni Endoskopii AmiCare przy ul. Romanowskiej 55N w Łodzi.',
    availableService: {
      '@type': 'MedicalTest',
      name: opts.nazwa,
      ...(opts.cena
        ? {
            offers: {
              '@type': 'Offer',
              price: opts.cena,
              priceCurrency: 'PLN',
              availability: 'https://schema.org/InStock',
              url: `${DOMENA}/cennik`,
            },
          }
        : {}),
    },
    provider: {
      '@type': 'MedicalClinic',
      name: 'AmiCare Centrum Medyczne',
      url: `${DOMENA}/placowki/lodz-romanowska`,
      telephone: '+48422890250',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ul. Romanowska 55N',
        postalCode: '91-174',
        addressLocality: 'Łódź',
        addressCountry: 'PL',
      },
    },
  };
}
