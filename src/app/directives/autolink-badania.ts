import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
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

const ZNACZNIK = 'data-autolink';

@Directive({
  selector: '[appAutolink]',
})
export class AutolinkBadania implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.podlinkuj();

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => setTimeout(() => this.podlinkuj()));

    this.host.nativeElement.addEventListener('click', (event) => {
      const cel = (event.target as HTMLElement)?.closest(`a[${ZNACZNIK}]`);
      if (!cel) return;
      event.preventDefault();
      this.router.navigateByUrl(cel.getAttribute('href') ?? '/');
    });
  }

  private podlinkuj(): void {
    const biezaca = this.router.url.split('#')[0].split('?')[0];

    const walker = document.createTreeWalker(this.host.nativeElement, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!node.nodeValue || !WZORZEC.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        WZORZEC.lastIndex = 0;

        for (let el = node.parentElement; el && el !== this.host.nativeElement; el = el.parentElement) {
          if (POMIJANE.has(el.tagName)) return NodeFilter.FILTER_REJECT;
          if (KLASY_POMIJANE.some((k) => el!.classList.contains(k))) return NodeFilter.FILTER_REJECT;
        }

        /* W kontenerze flex/grid wstrzyknięty <a> staje się osobnym elementem
           układu i rozbija wiersz - tam zostawiamy sam tekst. */
        const rodzic = node.parentElement;
        if (rodzic) {
          const uklad = getComputedStyle(rodzic).display;
          if (uklad.includes('flex') || uklad.includes('grid')) return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const doZamiany: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) doZamiany.push(n as Text);

    for (const wezel of doZamiany) this.zamien(wezel, biezaca);
  }

  private zamien(wezel: Text, biezaca: string): void {
    const tekst = wezel.nodeValue ?? '';
    const fragment = document.createDocumentFragment();
    let ostatni = 0;

    WZORZEC.lastIndex = 0;
    for (let m = WZORZEC.exec(tekst); m; m = WZORZEC.exec(tekst)) {
      const termin = TERMINY.find((t) => t.rdzen === m[1].toLowerCase());
      if (!termin) continue;

      // na każdej podstronie danego badania słowo zostaje tekstem - dotyczy też
      // wariantów (/kolonoskopia-w-analgosedacji, /gastroskopia-znieczulenie-ogolne)
      if (biezaca.includes(termin.rdzen)) continue;

      fragment.append(tekst.slice(ostatni, m.index));

      const a = document.createElement('a');
      a.setAttribute('href', termin.link);
      a.setAttribute(ZNACZNIK, '');
      a.textContent = m[0];
      fragment.append(a);

      ostatni = m.index + m[0].length;
    }

    if (ostatni === 0) return;

    fragment.append(tekst.slice(ostatni));
    wezel.replaceWith(fragment);
  }
}
