import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../services/seo';
import { CennikPanel } from '../../../components/cennik-panel/cennik-panel';
import { PageHero } from '../../../components/page-hero/page-hero';
import { schematZabiegu } from '../../../utils/schema-zabieg';

@Component({
  selector: 'app-kolonoskopia-w-analgosedacji',
  imports: [RouterLink, PageHero, CennikPanel],
  templateUrl: './kolonoskopia-w-analgosedacji.html',
  styleUrl: './kolonoskopia-w-analgosedacji.scss',
})
export class KolonoskopiaWAnalgosedacji implements OnInit, AfterViewInit {
  private seo = inject(Seo);
  private host = inject(ElementRef<HTMLElement>);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.set({
      title: 'Kolonoskopia w znieczuleniu analgosedacji - Pracownia Endoskopii AmiCare Łódź',
      description:
        'Kolonoskopia w znieczuleniu analgosedacji w AmiCare Łódź - badanie dolnego odcinka przewodu pokarmowego w znieczuleniu dożylnym. Przygotowanie i rezerwacja wizyty.',
      path: '/pracownia-endoskopii/kolonoskopia-w-analgosedacji',
    });

    this.seo.setBreadcrumbs([
      { nazwa: 'Pracownia endoskopii', sciezka: '/pracownia-endoskopii' },
      { nazwa: 'Kolonoskopia w znieczuleniu analgosedacji', sciezka: '/pracownia-endoskopii/kolonoskopia-w-analgosedacji' },
    ]);

    this.seo.setJsonLd(
      'ld-zabieg',
      schematZabiegu({
        nazwa: 'Kolonoskopia w znieczuleniu analgosedacji',
        opis:
          'Kolonoskopia w znieczuleniu analgosedacji w AmiCare Łódź - badanie dolnego odcinka przewodu pokarmowego w znieczuleniu dożylnym. Przygotowanie i rezerwacja wizyty.',
        sciezka: '/pracownia-endoskopii/kolonoskopia-w-analgosedacji',
        czescCiala: 'jelito grube',
        cena: 1000,
        przygotowanie:
          'Dieta ubogoresztkowa, preparat przeczyszczający oraz pozostanie na czczo przed znieczuleniem.',
      }),
    );

  }

  ngAfterViewInit(): void {
    /* Prerender wykonuje ngAfterViewInit na serwerze, gdzie nie ma IntersectionObserver.
       Podświetlanie spisu treści to warstwa interakcji - dokłada się po hydracji. */
    if (typeof IntersectionObserver === 'undefined') return;

    const root: HTMLElement = this.host.nativeElement;
    const entries = Array.from(root.querySelectorAll('.dossier__entry[id]')) as HTMLElement[];
    const links = new Map(
      (Array.from(root.querySelectorAll('[data-toc]')) as HTMLAnchorElement[]).map((a) => [
        a.getAttribute('data-toc-id'),
        a,
      ]),
    );
    if (!entries.length || !links.size) return;

    const setActive = (id: string) => {
      links.forEach((a, key) => a.classList.toggle('is-active', key === id));
    };

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );

    entries.forEach((el) => observer.observe(el));
    setActive(entries[0].id);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
