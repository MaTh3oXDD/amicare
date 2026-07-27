import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formularz-kontaktowy',
  imports: [FormsModule],
  templateUrl: './formularz-kontaktowy.html',
  styleUrl: './formularz-kontaktowy.scss',
})
export class FormularzKontaktowy {
  protected readonly tematy = [
    'Jestem pacjentką/em i mam pytanie',
    'Jestem lekarzem interesuje mnie współpraca',
    'Interesuje mnie współpraca',
    'Przesyłam moją opinię',
    'Proszę o więcej informacji na temat badań klinicznych',
    'Umówienie wizyty',
  ];

  protected readonly wyslano = signal(false);

  protected model = {
    imie: '',
    email: '',
    temat: '',
    tresc: '',
    zgoda: false,
  };

  wyslij(): void {
    const { imie, email, temat, tresc, zgoda } = this.model;
    if (!imie || !email || !temat || !tresc || !zgoda) return;
    const body = encodeURIComponent(`${tresc}\n\n${imie}`);
    const subject = encodeURIComponent(temat);
    window.location.href = `mailto:rejestracja@amicare.pl?subject=${subject}&body=${body}`;
    this.wyslano.set(true);
  }
}
