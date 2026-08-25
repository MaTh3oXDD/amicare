import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CENNIK, CennikGrupa, CennikWiersz } from '../../pages/cennik/models/cennik-data';

@Component({
  selector: 'app-cennik-panel',
  imports: [RouterLink],
  templateUrl: './cennik-panel.html',
  styleUrl: './cennik-panel.scss',
})
export class CennikPanel {
  private readonly router = inject(Router);

  /** Adres bieżącej podstrony - po nim rozpoznajemy, który wariant badania czyta pacjent. */
  private readonly sciezka = this.router.url.split('#')[0].split('?')[0];

  /** Grupa cenowa, do której należy to badanie (np. wszystkie warianty gastroskopii). */
  protected readonly grupa = computed<CennikGrupa | undefined>(() =>
    CENNIK.flatMap((s) => s.grupy).find(
      (g) => g.link === this.sciezka || g.wiersze.some((w) => w.link === this.sciezka),
    ),
  );

  protected biezacy(link?: string): boolean {
    return link === this.sciezka;
  }

  /* Weekend zawsze zajmuje ten sam slot: albo kwotę, albo słowo "niedostępne".
     Powtórzona cena zamiast "tyle samo" - dwie liczby obok siebie mówią to samo
     szybciej i nie zmuszają do przeskoku między liczbą a zdaniem. */
  protected weekend(w: CennikWiersz): { tekst: string; dostepne: boolean } {
    if (w.cenaWeekend === 'n/d') return { tekst: 'niedostępne', dostepne: false };
    return { tekst: w.cenaWeekend ?? w.cena, dostepne: true };
  }
}
