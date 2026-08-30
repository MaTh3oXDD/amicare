/** Polskie znaki diakrytyczne występujące w imionach i nazwiskach zespołu. */
const ZNAKI: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

/**
 * Buduje slug do URL-a: same litery ASCII, cyfry i myślniki.
 * Bez tego adresy lekarzy wyglądają tak: /o-nas/zespol/dr-n.med.-adam-rafal-poliwczak
 * z kropkami i polskimi znakami, co psuje sitemapę i linkowanie z zewnątrz.
 */
export function slugify(tekst: string): string {
  return tekst
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (z) => ZNAKI[z] ?? z)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
