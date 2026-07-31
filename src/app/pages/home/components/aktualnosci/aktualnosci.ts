import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Wpis {
  tytul: string;
  obraz: string;
  link: string;
  tag: string;
}

@Component({
  selector: 'app-aktualnosci',
  imports: [RouterLink],
  templateUrl: './aktualnosci.html',
  styleUrl: './aktualnosci.scss',
})
export class Aktualnosci {
  private track = viewChild.required<ElementRef<HTMLElement>>('track');

  protected readonly wpisy: Wpis[] = [
    {
      tytul: 'Badanie kliniczne - Miastenia Gravis',
      obraz: 'images/badania/miastenia-gravis.jpg',
      link: '/badania-kliniczne',
      tag: 'Badania kliniczne',
    },
    {
      tytul: 'Badanie kliniczne - Gastropareza',
      obraz: 'images/badania/gastropareza.png',
      link: '/badania-kliniczne',
      tag: 'Badania kliniczne',
    },
    {
      tytul: 'Wrzodziejące zapalenie jelita grubego - Jelenia Góra',
      obraz: 'images/badania/wzjg.jpg',
      link: '/placowki/jelenia-gora',
      tag: 'Jelenia Góra',
    },
    {
      tytul: 'Choroba Leśniowskiego-Crohna - Jelenia Góra',
      obraz: 'images/badania/crohn.jpg',
      link: '/placowki/jelenia-gora',
      tag: 'Jelenia Góra',
    },
    {
      tytul: 'Badanie kliniczne - Łuszczyca',
      obraz: 'images/badania/luszczyca.jpg',
      link: '/badania-kliniczne',
      tag: 'Łódź',
    },
    {
      tytul: 'Badanie kliniczne - Trądzik',
      obraz: 'images/badania/tradzik.png',
      link: '/badania-kliniczne',
      tag: 'Łódź',
    },
    {
      tytul: 'Badanie kliniczne - Trądzik odwrócony',
      obraz: 'images/badania/tradzik-odwrocony.webp',
      link: '/badania-kliniczne',
      tag: 'Łódź',
    },
    {
      tytul: 'Badania wątrobowe - stłuszczenie wątroby',
      obraz: 'images/badania/watroba.webp',
      link: '/badania-kliniczne',
      tag: 'Łódź',
    },
    {
      tytul: 'Badanie kliniczne - Świerzbiączka guzkowata',
      obraz: 'images/badania/swierzbiaczka.jpg',
      link: '/badania-kliniczne',
      tag: 'Łódź',
    },
    {
      tytul: 'Cennik - dr n. med. Rafał Drozda',
      obraz: 'images/badania/cennik-drozda.jpg',
      link: '/konsultacje-specjalistyczne/gastroenterologia',
      tag: 'Cennik',
    },
  ];

  przewin(kierunek: 1 | -1): void {
    const el = this.track().nativeElement;
    el.scrollBy({ left: kierunek * el.clientWidth * 0.8, behavior: 'smooth' });
  }
}
