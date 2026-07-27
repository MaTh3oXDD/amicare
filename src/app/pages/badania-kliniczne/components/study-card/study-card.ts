import { Component, input, output } from '@angular/core';
import { Study } from '../../models/study';

@Component({
  selector: 'app-study-card',
  template: `
    <article class="study">
      <img [src]="study().obraz" [alt]="'Badanie kliniczne: ' + study().jednostka" loading="lazy" />
      <div class="study__body">
        <span class="study__tag">{{ study().dziedzina }} · {{ study().miasto }}</span>
        <h3>{{ study().jednostka }}</h3>
        <button type="button" class="study__link" (click)="openForm.emit(study())">
          Formularz zgłoszeniowy →
        </button>
      </div>
    </article>
  `,
  styles: `
    .study {
      background: #fff;
      border: 1px solid var(--c-line);
      height: 100%;
      display: flex;
      flex-direction: column;

      img {
        width: 100%;
        aspect-ratio: 16 / 10;
        object-fit: cover;
      }
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
      flex: 1;
    }

    .study__link {
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--c-pine);
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      transition: color 0.2s ease;

      &:hover {
        color: var(--c-evergreen);
      }
    }
  `,
})
export class StudyCard {
  readonly study = input.required<Study>();
  readonly openForm = output<Study>();
}
