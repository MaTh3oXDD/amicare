import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container">
        <nav class="hero__crumbs" aria-label="Okruszki">
          <a routerLink="/">Amicare</a>
          <span aria-hidden="true">/</span>
          <span>{{ title() }}</span>
        </nav>
        <h1>{{ title() }}</h1>
        @if (lead()) {
          <p class="hero__lead">{{ lead() }}</p>
        }
      </div>
    </section>
  `,
  styles: `
    .hero {
      background: var(--c-cream);
      border-bottom: 1px solid var(--c-line);
      padding: clamp(2.5rem, 6vw, 4.5rem) 0;
    }

    .hero__crumbs {
      display: flex;
      gap: 0.6rem;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--c-ink-soft);
      margin-bottom: 1rem;

      a { color: var(--c-gold); }
    }

    h1 { margin-bottom: 0.3em; }

    .hero__lead {
      max-width: 62ch;
      font-size: 1.08rem;
      margin: 0;
    }
  `,
})
export class PageHero {
  readonly title = input.required<string>();
  readonly lead = input<string>();
}
