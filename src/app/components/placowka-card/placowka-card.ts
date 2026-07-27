import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Placowka } from '../../models/placowka';

@Component({
  selector: 'app-placowka-card',
  imports: [RouterLink],
  template: `
    <article class="pl">
      <span class="mono pl__typ">{{ placowka().typ }}</span>
      <h3>{{ placowka().miasto }}</h3>
      @if (placowka().adres) {
        <p class="pl__adres">{{ placowka().adres }}</p>
      }
      @if (placowka().godziny) {
        <p class="mono pl__fact">{{ placowka().godziny }}</p>
      }
      @if (placowka().uwaga) {
        <p class="pl__note">{{ placowka().uwaga }}</p>
      }
      <p class="pl__contact">
        <a href="tel:{{ placowka().telefon.split(' ').join('') }}">{{ placowka().telefon }}</a
        ><br />
        <a href="mailto:{{ placowka().email }}">{{ placowka().email }}</a>
      </p>
      <a class="mono pl__more" [routerLink]="['/placowki', placowka().slug]"
        >Poznaj placówkę →</a
      >
    </article>
  `,
  styles: `
    .pl {
      background: #fff;
      border: 1px solid var(--c-mist);
      padding: 2rem 2rem 1.8rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: border-color 0.25s ease;

      &:hover {
        border-color: var(--c-pine);
      }
    }

    h3 {
      margin: 0.45em 0 0.35em;
      font-size: 1.55rem;
    }

    .pl__adres {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--c-ink);
      margin-bottom: 0.6em;
    }

    .pl__fact {
      color: var(--c-ink-soft);
      margin-bottom: 0.4em;
    }

    .pl__note {
      font-size: 0.82rem;
      font-style: italic;
      margin-bottom: 0.4em;
    }

    .pl__contact {
      margin: auto 0 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--c-mist);
      font-size: 0.95rem;
    }

    .pl__more {
      color: var(--c-ink-soft);
      transition: color 0.25s ease;

      &:hover {
        color: var(--c-bronze);
      }
    }
  `,
})
export class PlacowkaCard {
  readonly placowka = input.required<Placowka>();
}
