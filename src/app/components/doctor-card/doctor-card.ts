import { Component, input } from '@angular/core';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-doctor-card',
  template: `
    <article class="card">
      @if (doctor().photo) {
        <img class="card__photo" [src]="doctor().photo" [alt]="doctor().name" loading="lazy" />
      } @else {
        <div class="card__photo card__photo--empty" aria-hidden="true">
          <span>{{ initials() }}</span>
        </div>
      }
      <div class="card__body">
        <h3>{{ doctor().name }}</h3>
        <p class="card__title">{{ doctor().title }}</p>
        @if (doctor().bio) {
          <p class="card__bio">{{ doctor().bio }}</p>
        }
      </div>
    </article>
  `,
  styles: `
    .card {
      background: #fff;
      border: 1px solid var(--c-line);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .card__photo {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      object-position: top center;
    }

    .card__photo--empty {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--c-cream);

      span {
        font-family: var(--font-serif);
        font-size: 3rem;
        color: var(--c-gold);
      }
    }

    .card__body {
      padding: 1.4rem 1.5rem 1.6rem;
    }

    h3 {
      font-size: 1.15rem;
      margin-bottom: 0.3em;
    }

    .card__title {
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--c-teal);
      margin-bottom: 0.7em;
    }

    .card__bio {
      font-size: 0.9rem;
      margin: 0;
    }
  `,
})
export class DoctorCard {
  readonly doctor = input.required<Doctor>();

  initials(): string {
    return this.doctor()
      .name.split(' ')
      .filter((w) => /^[A-ZŁŚŻŹĆ]/.test(w))
      .slice(-2)
      .map((w) => w[0])
      .join('');
  }
}
