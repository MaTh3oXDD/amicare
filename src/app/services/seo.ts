import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class Seo {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  set(opts: { title: string; description: string; path: string }): void {
    this.title.setTitle(opts.title);
    this.meta.updateTag({ name: 'description', content: opts.description });
    this.meta.updateTag({ property: 'og:title', content: opts.title });
    this.meta.updateTag({ property: 'og:description', content: opts.description });
    this.meta.updateTag({ property: 'og:url', content: `https://amicare.pl${opts.path}` });
    this.setCanonical(`https://amicare.pl${opts.path}`);
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
}
