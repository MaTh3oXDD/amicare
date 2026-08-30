import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, NgZone, inject } from '@angular/core';

/**
 * Odsłania sekcje przy przewijaniu: `.section` startuje z `opacity: 0`
 * (patrz src/styles.scss) i dostaje klasę `is-visible`, gdy wejdzie w kadr.
 *
 * Sekcja, której nikt nie zacznie obserwować, zostaje niewidoczna na zawsze -
 * dlatego oprócz jednorazowego przejścia po DOM pilnujemy go MutationObserverem.
 * Wcześniej obserwacja ruszała raz, w `ngAfterViewInit` komponentu głównego,
 * i po każdej nawigacji. Trasy są leniwe, więc gdy komponent zdążył się
 * wyrenderować przed tym momentem, jego sekcje nie trafiały pod obserwację
 * i cała strona zostawała biała.
 */
@Injectable({ providedIn: 'root' })
export class ScrollReveal {
  private zone = inject(NgZone);
  private doc = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  private observer?: IntersectionObserver;
  private mutacje?: MutationObserver;
  private zaplanowane = false;

  private reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  init(): void {
    /* Prerender nie ma IntersectionObserver. Serwerowy HTML zawiera sekcje
       bez klasy `is-visible`, ale odsłoni je przeglądarka po starcie. */
    if (typeof IntersectionObserver === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this.observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0, rootMargin: '0px 0px -64px 0px' },
      );

      this.obejmij();

      /* Każda nowa sekcja - z nawigacji, z @for, z @if - trafia pod obserwację
         sama, bez wiedzy o tym, kiedy dokładnie Angular ją wyrenderował. */
      this.mutacje = new MutationObserver(() => this.zaplanujObjecie());
      this.mutacje.observe(this.doc.body, { childList: true, subtree: true });

      this.destroyRef.onDestroy(() => {
        this.observer?.disconnect();
        this.mutacje?.disconnect();
      });
    });
  }

  /** Zlepia serie zmian DOM w jedno przejście na klatkę. */
  private zaplanujObjecie(): void {
    if (this.zaplanowane) return;
    this.zaplanowane = true;
    requestAnimationFrame(() => {
      this.zaplanowane = false;
      this.obejmij();
    });
  }

  private obejmij(): void {
    const cele = this.doc.querySelectorAll<HTMLElement>('.section:not(.is-visible)');

    if (this.reducedMotion || !this.observer) {
      cele.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    cele.forEach((el) => this.observer!.observe(el));
  }
}
