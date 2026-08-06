import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

const AUTOPLAY_INTERVAL_MS = 3200;
const END_THRESHOLD_PX = 4;

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
export class Aktualnosci implements AfterViewInit, OnDestroy {
  private track = viewChild.required<ElementRef<HTMLElement>>('track');
  private zone = inject(NgZone);

  private timerId?: ReturnType<typeof setInterval>;
  private reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  ngAfterViewInit(): void {
    if (this.reducedMotion) return;

    const el = this.track().nativeElement;
    this.zone.runOutsideAngular(() => {
      el.addEventListener('pointerenter', this.stop);
      el.addEventListener('pointerleave', this.start);
      el.addEventListener('focusin', this.stop);
      el.addEventListener('focusout', this.start);
      this.start();
    });
  }

  ngOnDestroy(): void {
    this.stop();
    const el = this.track().nativeElement;
    el.removeEventListener('pointerenter', this.stop);
    el.removeEventListener('pointerleave', this.start);
    el.removeEventListener('focusin', this.stop);
    el.removeEventListener('focusout', this.start);
  }

  private start = (): void => {
    if (this.timerId) return;
    this.timerId = setInterval(() => this.tick(), AUTOPLAY_INTERVAL_MS);
  };

  private stop = (): void => {
    clearInterval(this.timerId);
    this.timerId = undefined;
  };

  private tick(): void {
    const el = this.track().nativeElement;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - END_THRESHOLD_PX;
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' });
    }
  }
}
