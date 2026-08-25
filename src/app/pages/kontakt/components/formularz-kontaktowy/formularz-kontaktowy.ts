import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Formularze } from '../../../../services/formularze';

@Component({
  selector: 'app-formularz-kontaktowy',
  imports: [FormsModule],
  templateUrl: './formularz-kontaktowy.html',
  styleUrl: './formularz-kontaktowy.scss',
})
export class FormularzKontaktowy {
  // Klucz decyduje o adresie odbiorcy po stronie backendu - etykietę można zmieniać dowolnie.
  // Klucze muszą się zgadzać z TEMATY_KONTAKT w server/server.js
  protected readonly tematy = [
    { klucz: 'pacjent', etykieta: 'Jestem pacjentką/em i mam pytanie' },
    { klucz: 'lekarz', etykieta: 'Jestem lekarzem interesuje mnie współpraca' },
    { klucz: 'wspolpraca', etykieta: 'Interesuje mnie współpraca' },
    { klucz: 'opinia', etykieta: 'Przesyłam moją opinię' },
    { klucz: 'badania-kliniczne', etykieta: 'Proszę o więcej informacji na temat badań klinicznych' },
    { klucz: 'wizyta', etykieta: 'Umówienie wizyty' },
  ];

  private readonly formularze = inject(Formularze);

  protected readonly wyslano = signal(false);
  protected readonly wysylanie = signal(false);
  protected readonly blad = signal(false);

  protected model = {
    imie: '',
    email: '',
    temat: '',
    tresc: '',
    zgoda: false,
    firma: '', // honeypot - ukryty w szablonie, wypełniają go tylko boty
  };

  protected async wyslij(): Promise<void> {
    const { imie, email, temat, tresc, zgoda } = this.model;
    if (!imie || !email || !temat || !tresc || !zgoda || this.wysylanie()) return;

    this.wysylanie.set(true);
    this.blad.set(false);

    const ok = await this.formularze.wyslij('kontakt', { ...this.model });

    this.wysylanie.set(false);
    if (ok) this.wyslano.set(true);
    else this.blad.set(true);
  }
}
