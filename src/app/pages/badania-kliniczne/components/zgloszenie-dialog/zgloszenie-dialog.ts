import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Study } from '../../models/study';

interface ZgloszenieModel {
  imie: string;
  telefon: string;
  email: string;
  wiadomosc: string;
  zgoda: boolean;
}

function emptyModel(): ZgloszenieModel {
  return { imie: '', telefon: '', email: '', wiadomosc: '', zgoda: false };
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
  protected model = emptyModel();

  constructor() {
    effect(() => {
      const study = this.study();
      const dialog = this.dialogRef().nativeElement;

      if (study) {
        this.wyslano.set(false);
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

  protected wyslij(): void {
    const study = this.study();
    if (!study) return;

    const { imie, telefon, email, wiadomosc, zgoda } = this.model;
    if (!imie || !telefon || !zgoda) return;

    const subject = encodeURIComponent(`Zgłoszenie do badania - ${study.jednostka}`);
    const bodyLines = [
      `Badanie: ${study.jednostka} (${study.miasto})`,
      `Imię i nazwisko: ${imie}`,
      `Telefon: ${telefon}`,
      email ? `Email: ${email}` : null,
      wiadomosc ? `\nWiadomość:\n${wiadomosc}` : null,
    ].filter((line): line is string => line !== null);

    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:office@amicare.pl?subject=${subject}&body=${body}`;
    this.wyslano.set(true);
  }
}
