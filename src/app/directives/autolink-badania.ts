import { AfterViewInit, DestroyRef, Directive, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface Termin {
  /* rdzeń bez końcówki - łapie wszystkie przypadki: -a, -i, -ę, -ą, -e */
  rdzen: string;
  link: string;
}

const TERMINY: Termin[] = [
  { rdzen: 'gastroskopi', link: '/pracownia-endoskopii/gastroskopia' },
  { rdzen: 'kolonoskopi', link: '/pracownia-endoskopii/kolonoskopia' },
];

const WZORZEC = new RegExp(`\\b(${TERMINY.map((t) => t.rdzen).join('|')})(a|i|ę|ą|e|ach|ami|om)?\\b`, 'giu');

/* Elementy, w których nie linkujemy: nagłówki (link w nagłówku wygląda jak błąd),
   nawigacja i okruszki (segment bieżącej strony nie może prowadzić gdzie indziej),
   istniejące odnośniki (zagnieżdżony <a> jest niepoprawny), kontrolki formularzy. */
const POMIJANE = new Set([
  'A',
  'NAV',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'BUTTON',
  'OPTION',
  'LABEL',
  'SELECT',
  'TEXTAREA',
]);

/* Etykiety, nie proza - podlinkowanie rozbija je na kawałki. */
const KLASY_POMIJANE = ['eyebrow', 'mono', 'footer__note', 'hero__crumbs', 'cennik', 'cennik-panel'];

/* Klasy kontenerow flex/grid - jedyny sposob rozpoznania ukladu przy prerenderze,
   gdzie nie ma getComputedStyle. Lista z src/styles.scss i stylow komponentow. */
const KLASY_UKLADU = [
  'grid',
  'grid--2',
  'grid--3',
  'lista',
  'block',
  'hero__text',
  'header__nav',
  'footer__cols',
];

/* Serwerowy DOM nie wystawia globalnego NodeFilter, wiec uzywamy stalych ze specyfikacji. */
const POKAZ_TEKST = 0x04;
const PRZYJMIJ = 1;
const ODRZUC = 2;

const ZNACZNIK = 'data-autolink';

@Directive({
  selector: '[appAutolink]',
})
export class AutolinkBadania implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly doc = inject(DOCUMENT);
  private readonly przegladarka = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit(): void {
    /* Podlinkowanie dziala rowniez przy prerenderze, wiec boty widza te linki
       w statycznym HTML-u. Na serwerze nie ma pomiaru ukladu, wiec kontenery
       flex/grid rozpoznajemy po klasach (KLASY_UKLADU). */
    this.podlinkuj();

    /* Trasy sa leniwe: w chwili ngAfterViewInit hosta <main> tresc podstrony
       jeszcze nie istnieje. Dopiero NavigationEnd oznacza, ze jest w DOM -
       dotyczy to tak samo przegladarki, jak i prerenderu. */
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => setTimeout(() => this.podlinkuj()));

    if (!this.przegladarka) return;

    this.host.nativeElement.addEventListener('click', (event) => {
      const cel = (event.target as HTMLElement)?.closest(`a[${ZNACZNIK}]`);
      if (!cel) return;
      event.preventDefault();
      this.router.navigateByUrl(cel.getAttribute('href') ?? '/');
    });
  }

  private podlinkuj(): void {
    const biezaca = this.router.url.split('#')[0].split('?')[0];

    const walker = this.doc.createTreeWalker(this.host.nativeElement, POKAZ_TEKST, {
      acceptNode: (node) => {
        if (!node.nodeValue || !WZORZEC.test(node.nodeValue)) return ODRZUC;
        WZORZEC.lastIndex = 0;

        for (let el = node.parentElement; el && el !== this.host.nativeElement; el = el.parentElement) {
          if (POMIJANE.has(el.tagName)) return ODRZUC;
          if (KLASY_POMIJANE.some((k) => el!.classList.contains(k))) return ODRZUC;
        }

        /* W kontenerze flex/grid wstrzyknięty <a> staje się osobnym elementem
           układu i rozbija wiersz - tam zostawiamy sam tekst. */
        const rodzic = node.parentElement;
        if (rodzic && this.jestKonteneremUkladu(rodzic)) return ODRZUC;

        return PRZYJMIJ;
      },
    });

    const doZamiany: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) doZamiany.push(n as Text);

    for (const wezel of doZamiany) this.zamien(wezel, biezaca);
  }

  /* W przegladarce pytamy o realny uklad. Przy prerenderze nie ma czego mierzyc,
     wiec opieramy sie na klasach kontenerow uzywanych w tym projekcie. */
  private jestKonteneremUkladu(el: HTMLElement): boolean {
    const okno = this.doc.defaultView;
    if (this.przegladarka && okno) {
      const uklad = okno.getComputedStyle(el).display;
      return uklad.includes('flex') || uklad.includes('grid');
    }
    return KLASY_UKLADU.some((k) => el.classList.contains(k));
  }

  /* Serwerowy DOM nie ma nowszych metod ParentNode (append, replaceWith),
     dlatego skladamy fragment przez appendChild i podmieniamy przez replaceChild. */
  private zamien(wezel: Text, biezaca: string): void {
    const tekst = wezel.nodeValue ?? '';
    const fragment = this.doc.createDocumentFragment();
    let ostatni = 0;

    WZORZEC.lastIndex = 0;
    for (let m = WZORZEC.exec(tekst); m; m = WZORZEC.exec(tekst)) {
      const termin = TERMINY.find((t) => t.rdzen === m[1].toLowerCase());
      if (!termin) continue;

      // na każdej podstronie danego badania słowo zostaje tekstem - dotyczy też
      // wariantów (/kolonoskopia-w-analgosedacji, /gastroskopia-znieczulenie-ogolne)
      if (biezaca.includes(termin.rdzen)) continue;

      fragment.appendChild(this.doc.createTextNode(tekst.slice(ostatni, m.index)));

      const a = this.doc.createElement('a');
      a.setAttribute('href', termin.link);
      a.setAttribute(ZNACZNIK, '');
      a.textContent = m[0];
      fragment.appendChild(a);

      ostatni = m.index + m[0].length;
    }

    if (ostatni === 0) return;

    fragment.appendChild(this.doc.createTextNode(tekst.slice(ostatni)));
    wezel.parentNode?.replaceChild(fragment, wezel);
  }
}
