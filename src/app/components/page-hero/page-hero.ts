import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  template: `
    <section class="hero" [class.hero--photo]="photo()">
      @if (photo()) {
        <div class="hero__bg" [style.background-image]="'url(' + photo() + ')'" aria-hidden="true"></div>
      }
      <div class="container">
        <div class="hero__text">
          <nav class="hero__crumbs" aria-label="Okruszki">
            <a routerLink="/">Amicare Centrum Medyczne</a>
            <span aria-hidden="true">/</span>
            <span>{{ title() }}</span>
          </nav>
          <h1>{{ title() }}</h1>
          @if (lead()) {
            <p class="hero__lead">{{ lead() }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      background: var(--c-cream);
      border-bottom: 1px solid var(--c-line);
      padding: clamp(2.5rem, 6vw, 4.5rem) 0;
    }

    .hero--photo {
      isolation: isolate;
      overflow: hidden;
      border-bottom-color: transparent;
      display: flex;
      align-items: center;
      min-height: clamp(26rem, 55vw, 38rem);
      padding-top: clamp(3.5rem, 8vw, 6rem);
      padding-bottom: clamp(3.5rem, 8vw, 6rem);
    }

    .hero--photo .container {
      width: 100%;
    }

    .hero__bg {
      position: absolute;
      inset: -8%;
      z-index: -1;
      background-size: cover;
      background-position: center;
      filter: blur(5px);

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(155deg, rgba(21, 42, 82, 0.62), rgba(21, 42, 82, 0.42));
      }
    }

    .hero--photo .hero__text {
      display: inline-block;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(6px);
      padding: clamp(1.5rem, 4vw, 2.5rem);
      border: 2px solid var(--c-navy);
      box-shadow: 0 24px 60px -24px rgba(21, 42, 82, 0.45);
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
  readonly photo = input<string>();
}
