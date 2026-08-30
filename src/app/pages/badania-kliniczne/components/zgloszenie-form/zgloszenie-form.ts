import { Component, inject, input, signal } from '@angular/core';
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
  selector: 'app-zgloszenie-form',
  imports: [FormsModule],
  templateUrl: './zgloszenie-form.html',
  styleUrl: './zgloszenie-form.scss',
})
export class ZgloszenieForm {
  readonly study = input.required<Study>();

  protected readonly wyslano = signal(false);
  protected readonly wysylanie = signal(false);
  protected readonly blad = signal(false);
  protected model = emptyModel();

  private readonly formularze = inject(Formularze);

  protected async wyslij(): Promise<void> {
    const study = this.study();
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
    if (ok) {
      this.wyslano.set(true);
      this.model = emptyModel();
    } else {
      this.blad.set(true);
    }
  }
}
