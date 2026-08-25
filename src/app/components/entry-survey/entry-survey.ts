import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Formularze } from '../../services/formularze';

const STORAGE_KEY = 'amicare-wywiad-tydzien';
const OPEN_DELAY_MS = 1400;
/* Ankieta wyskakuje wyłącznie na stronie badań klinicznych - nigdzie indziej. */
const SCIEZKA_ANKIETY = '/badania-kliniczne';

interface WywiadModel {
  imie: string;
  telefon: string;
  opis: string;
  badanie: string;
  zgoda: boolean;
  firma: string;
}

function emptyModel(): WywiadModel {
  return { imie: '', telefon: '', opis: '', badanie: '', zgoda: false, firma: '' };
}

function numerTygodnia(data: Date): string {
  const d = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()));
  const dzienTygodnia = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dzienTygodnia);
  const poczatekRoku = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const tydzien = Math.ceil(((d.getTime() - poczatekRoku.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${tydzien}`;
}

@Component({
  selector: 'app-entry-survey',
  imports: [FormsModule],
  templateUrl: './entry-survey.html',
  styleUrl: './entry-survey.scss',
})
export class EntrySurvey {
  protected readonly badania = [
    'Konsultacja specjalistyczna',
    'Kolonoskopia',
    'Gastroskopia',
    'Badania diagnostyczne',
    'Badania kliniczne',
    'Inne',
  ];

  protected readonly otwarty = signal(false);
  protected readonly wyslano = signal(false);
  protected readonly wysylanie = signal(false);
  protected readonly blad = signal(false);
  protected model = emptyModel();

  private readonly formularze = inject(Formularze);
  private readonly router = inject(Router);

  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const dialog = this.dialogRef().nativeElement;
      if (this.otwarty()) {
        if (!dialog.open) dialog.showModal();
      } else if (dialog.open) {
        dialog.close();
      }
    });

    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

    /* Komponent żyje w app.html, więc konstruktor odpala się raz - o wejściu na
       podstronę decyduje nawigacja routera (NavigationEnd leci też przy pierwszym
       wczytaniu, więc bezpośrednie wejście z URL-a też jest obsłużone). */
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.sprobujOtworzyc(e.urlAfterRedirects));
  }

  private sprobujOtworzyc(url: string): void {
    const sciezka = url.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
    if (sciezka !== SCIEZKA_ANKIETY) return;

    const biezacyTydzien = numerTygodnia(new Date());
    if (localStorage.getItem(STORAGE_KEY) === biezacyTydzien) return;

    localStorage.setItem(STORAGE_KEY, biezacyTydzien);
    window.setTimeout(() => this.otwarty.set(true), OPEN_DELAY_MS);
  }

  protected zamknij(): void {
    this.otwarty.set(false);
  }

  protected onBackdropClick(event: MouseEvent, dialog: HTMLDialogElement): void {
    if (event.target === dialog) this.zamknij();
  }

  protected onDialogClose(): void {
    this.otwarty.set(false);
  }

  protected async wyslij(): Promise<void> {
    const { imie, telefon, opis, badanie, zgoda } = this.model;
    if (!imie || !telefon || !zgoda || this.wysylanie()) return;

    this.wysylanie.set(true);
    this.blad.set(false);

    const ok = await this.formularze.wyslij('wywiad', {
      imie,
      telefon,
      badanie,
      opis,
      zgoda,
      firma: this.model.firma,
    });

    this.wysylanie.set(false);
    if (ok) this.wyslano.set(true);
    else this.blad.set(true);
  }
}
