import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

const DOMENA = 'https://amicare.pl';
const OBRAZ_DOMYSLNY = `${DOMENA}/images/centrum-020.webp`;

@Injectable({ providedIn: 'root' })
export class Seo {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  /** `image` podaj ścieżką względną (images/…) albo pełnym URL-em. */
  set(opts: { title: string; description: string; path: string; image?: string }): void {
    const url = `${DOMENA}${opts.path}`;
    const obraz = this.pelnyUrl(opts.image) ?? OBRAZ_DOMYSLNY;

    this.title.setTitle(opts.title);
    this.meta.updateTag({ name: 'description', content: opts.description });
    /* Powrót z /nie-znaleziono zostawiłby noindex na normalnej stronie. */
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: opts.title });
    this.meta.updateTag({ property: 'og:description', content: opts.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: obraz });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: opts.title });
    this.meta.updateTag({ name: 'twitter:description', content: opts.description });
    this.meta.updateTag({ name: 'twitter:image', content: obraz });
    this.setCanonical(url);
  }

  private pelnyUrl(sciezka?: string): string | undefined {
    if (!sciezka) return undefined;
    if (sciezka.startsWith('http')) return sciezka;
    return `${DOMENA}/${sciezka.replace(/^\//, '')}`;
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setJsonLd(id: string, data: object): void {
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  /** Okruszki dla Google. `sciezka` bez domeny, np. /o-nas/zespol. */
  setBreadcrumbs(elementy: { nazwa: string; sciezka: string }[]): void {
    this.setJsonLd('ld-breadcrumbs', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { nazwa: 'Strona główna', sciezka: '/' },
        ...elementy,
      ].map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: e.nazwa,
        item: `${DOMENA}${e.sciezka}`,
      })),
    });
  }
}
