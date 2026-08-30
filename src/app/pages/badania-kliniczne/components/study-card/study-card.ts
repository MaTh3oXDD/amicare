import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Study } from '../../models/study';

@Component({
  selector: 'app-study-card',
  imports: [RouterLink],
  template: `
    @if (study().slug; as slug) {
      <a class="study study--link" [routerLink]="['/badania-kliniczne', slug]">
        <img
          [src]="study().obraz"
          [alt]="'Badanie kliniczne: ' + study().jednostka"
          loading="lazy"
        />
        <div class="study__body">
          <span class="study__tag">{{ study().dziedzina }} · {{ study().miasto }}</span>
          <h3>{{ study().jednostka }}</h3>
          @if (study().lead) {
            <p class="study__lead">{{ study().lead }}</p>
          }
          <span class="study__status mono">Rekrutacja otwarta</span>
          <span class="study__cta">Sprawdź kryteria →</span>
        </div>
      </a>
    } @else {
      <article class="study">
        <img
          [src]="study().obraz"
          [alt]="'Badanie kliniczne: ' + study().jednostka"
          loading="lazy"
        />
        <div class="study__body">
          <span class="study__tag">{{ study().dziedzina }} · {{ study().miasto }}</span>
          <h3>{{ study().jednostka }}</h3>
          <p class="study__lead">
            Kryteria kwalifikacji do tego badania przekazujemy telefonicznie.
          </p>
          <a class="study__cta study__cta--tel" href="tel:+48786086331">
            Zadzwoń i zapytaj →
          </a>
        </div>
      </article>
    }
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .study {
      background: #fff;
      border: 1px solid var(--c-line);
      height: 100%;
      display: flex;
      flex-direction: column;
      color: inherit;
      text-decoration: none;

      img {
        width: 100%;
        aspect-ratio: 16 / 10;
        object-fit: cover;
      }
    }

    .study--link {
      transition:
        border-color 0.25s ease,
        transform 0.25s ease,
        box-shadow 0.25s ease;
    }

    .study--link:hover,
    .study--link:focus-visible {
      border-color: var(--c-navy);
      transform: translateY(-3px);
      box-shadow: 0 18px 40px -28px rgba(21, 42, 82, 0.5);
    }

    .study--link:hover .study__cta {
      color: var(--c-evergreen);
    }

    .study__body {
      padding: 1.4rem 1.5rem 1.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }

    .study__tag {
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--c-gold);
    }

    h3 {
      font-size: 1.2rem;
      margin: 0;
    }

    .study__lead {
      margin: 0;
      font-size: 0.88rem;
      line-height: 1.55;
      color: var(--c-ink-soft);
      flex: 1;
    }

    /* Karta bez opisu nie ma czym wypełnić środka - rozpiera ją nagłówek. */
    .study:not(:has(.study__lead)) h3 {
      flex: 1;
    }

    .study__status {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.68rem;
      color: var(--c-green-ink);
      margin-top: 0.25rem;
    }

    .study__status::before {
      content: '';
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: var(--c-green);
      flex: 0 0 auto;
    }

    .study__cta {
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--c-pine);
      transition: color 0.2s ease;
    }

    .study__cta--tel {
      margin-top: auto;
      align-self: flex-start;
      text-decoration: none;
    }

    .study__cta--tel:hover {
      color: var(--c-evergreen);
    }

    @media (prefers-reduced-motion: reduce) {
      .study--link,
      .study--link:hover,
      .study--link:focus-visible {
        transform: none;
        transition: border-color 0.25s ease;
      }
    }
  `,
})
export class StudyCard {
  readonly study = input.required<Study>();
}
