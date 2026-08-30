import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../services/seo';
import { CennikPanel } from '../../../components/cennik-panel/cennik-panel';
import { PageHero } from '../../../components/page-hero/page-hero';
import { schematZabiegu } from '../../../utils/schema-zabieg';

@Component({
  selector: 'app-gastroskopia-z-analgosedacja',
  imports: [RouterLink, PageHero, CennikPanel],
  templateUrl: './gastroskopia-z-analgosedacja.html',
  styleUrl: './gastroskopia-z-analgosedacja.scss',
})
export class GastroskopiaZAnalgosedacja implements OnInit, AfterViewInit {
  private seo = inject(Seo);
  private host = inject(ElementRef<HTMLElement>);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.set({
      title: 'Gastroskopia w znieczuleniu analgosedacji - Pracownia Endoskopii AmiCare Łódź',
      description:
        'Gastroskopia w znieczuleniu analgosedacji w AmiCare Łódź - badanie górnego odcinka przewodu pokarmowego w znieczuleniu dożylnym. Przygotowanie, cennik i rezerwacja wizyty.',
      path: '/pracownia-endoskopii/gastroskopia-z-analgosedacja',
    });

    this.seo.setBreadcrumbs([
      { nazwa: 'Pracownia endoskopii', sciezka: '/pracownia-endoskopii' },
      { nazwa: 'Gastroskopia w znieczuleniu analgosedacji', sciezka: '/pracownia-endoskopii/gastroskopia-z-analgosedacja' },
    ]);

    this.seo.setJsonLd(
      'ld-zabieg',
      schematZabiegu({
        nazwa: 'Gastroskopia w znieczuleniu analgosedacji',
        opis:
          'Gastroskopia w znieczuleniu analgosedacji w AmiCare Łódź - badanie górnego odcinka przewodu pokarmowego w znieczuleniu dożylnym. Przygotowanie, cennik i rezerwacja wizyty.',
        sciezka: '/pracownia-endoskopii/gastroskopia-z-analgosedacja',
        czescCiala: 'górny odcinek przewodu pokarmowego',
        cena: 900,
        przygotowanie:
          'Pozostanie na czczo przed znieczuleniem, według zaleceń przekazanych przy rejestracji.',
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
