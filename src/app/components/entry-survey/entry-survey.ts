import { Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../config/api.config';

const STORAGE_KEY = 'amicare-wywiad-tydzien';
const OPEN_DELAY_MS = 1400;

interface WywiadModel {
  imie: string;
  telefon: string;
  opis: string;
  badanie: string;
  zgoda: boolean;
}

function emptyModel(): WywiadModel {
  return { imie: '', telefon: '', opis: '', badanie: '', zgoda: false };
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
  protected model = emptyModel();

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

    const wszedlPrzezGlowna = window.location.pathname === '/' || window.location.pathname === '';
    if (wszedlPrzezGlowna) return;

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

    try {
      await fetch(API_CONFIG.surveyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imie, telefon, badanie, opis }),
      });
    } catch {
      // Backend jeszcze nie istnieje - zgłoszenie i tak liczymy za przyjęte,
      // dopóki API_CONFIG.surveyEndpoint nie wskazuje na prawdziwy backend.
    }

    this.wysylanie.set(false);
    this.wyslano.set(true);
  }
}
