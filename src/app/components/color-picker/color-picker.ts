import { Component, signal } from '@angular/core';

const STORAGE_KEY = 'amicare-accent-blue';

interface Odcien {
  nazwa: string;
  wartosc: string;
}

@Component({
  selector: 'app-color-picker',
  standalone: true,
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
})
export class ColorPicker {
  protected readonly odcienie: Odcien[] = [
    { nazwa: 'Granat', wartosc: 'var(--c-blue-1)' },
    { nazwa: 'Atrament', wartosc: 'var(--c-blue-2)' },
    { nazwa: 'Kobalt', wartosc: 'var(--c-blue-3)' },
    { nazwa: 'Lazur', wartosc: 'var(--c-blue-4)' },
  ];

  protected readonly otwarty = signal(false);
  protected readonly aktywny = signal(0);

  constructor() {
    if (typeof localStorage === 'undefined') return;
    const zapisany = Number(localStorage.getItem(STORAGE_KEY));
    if (!Number.isNaN(zapisany) && this.odcienie[zapisany]) {
      this.ustaw(zapisany, false);
    }
  }

  przelacz(): void {
    this.otwarty.update((v) => !v);
  }

  ustaw(index: number, zapisz = true): void {
    this.aktywny.set(index);
    document.documentElement.style.setProperty('--c-accent-blue', this.odcienie[index].wartosc);
    if (zapisz && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(index));
    }
  }
}
