import { Component, effect, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Formularze } from '../../../../services/formularze';
import { Study } from '../../models/study';

interface ZgloszenieModel {
  imie: string;
  telefon: string;
  email: string;
  wiadomosc: string;
  zgoda: boolean;
  firma: string;
}

function emptyModel(): ZgloszenieModel {
  return { imie: '', telefon: '', email: '', wiadomosc: '', zgoda: false, firma: '' };
}

@Component({
  selector: 'app-zgloszenie-dialog',
  imports: [FormsModule],
  templateUrl: './zgloszenie-dialog.html',
  styleUrl: './zgloszenie-dialog.scss',
})
export class ZgloszenieDialog {
  readonly study = input<Study | null>(null);
  readonly closed = output<void>();

  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly wyslano = signal(false);
  protected readonly wysylanie = signal(false);
  protected readonly blad = signal(false);
  protected model = emptyModel();

  private readonly formularze = inject(Formularze);

  constructor() {
    effect(() => {
      const study = this.study();
      const dialog = this.dialogRef().nativeElement;

      if (study) {
        this.wyslano.set(false);
        this.blad.set(false);
        this.model = emptyModel();
        if (!dialog.open) dialog.showModal();
      } else if (dialog.open) {
        dialog.close();
      }
    });
  }

  protected onDialogClose(): void {
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent, dialog: HTMLDialogElement): void {
    if (event.target === dialog) dialog.close();
  }

  protected async wyslij(): Promise<void> {
    const study = this.study();
    if (!study) return;

    const { imie, telefon, email, wiadomosc, zgoda, firma } = this.model;
    if (!imie || !telefon || !zgoda || this.wysylanie()) return;

    this.wysylanie.set(true);
    this.blad.set(false);

    const ok = await this.formularze.wyslij('badanie-kliniczne', {
      imie,
      telefon,
      email,
      wiadomosc,
      zgoda,
      firma,
      badanie: study.jednostka,
      miasto: study.miasto,
    });

    this.wysylanie.set(false);
    if (ok) this.wyslano.set(true);
    else this.blad.set(true);
  }
}
