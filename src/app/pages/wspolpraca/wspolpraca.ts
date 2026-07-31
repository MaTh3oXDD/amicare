import { Component, inject, OnInit } from '@angular/core';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';

@Component({
  selector: 'app-wspolpraca',
  imports: [PageHero],
  templateUrl: './wspolpraca.html',
  styleUrl: './wspolpraca.scss',
})
export class Wspolpraca implements OnInit {
  private seo = inject(Seo);

  protected readonly oferta = [
    'Konkurencyjne wynagrodzenie za przeprowadzone badania',
    'Pełna obsługa administracyjna i koordynacja badań',
    'Wspólne planowanie harmonogramu badań',
    'Dedykowany koordynator ds. badań klinicznych',
    'Dostęp do nowoczesnego sprzętu diagnostycznego',
    'Wsparcie w rekrutacji pacjentów',
    'Szkolenia w zakresie GCP i regulacji badań',
    'Ubezpieczenie odpowiedzialności cywilnej',
  ];

  protected readonly sprzet = ['Endoskop', 'USG', 'EKG', 'Holter', 'Spirometr', 'System monitorowania'];

  ngOnInit(): void {
    this.seo.set({
      title: 'Współpraca - Dla lekarzy i Sponsorów/CRO | AmiCare Łódź',
      description:
        'Dołącz do zespołu AmiCare w Łodzi w roli Badacza. Badania realizowane zgodnie z ICH GCP. Oferujemy konkurencyjne wynagrodzenie, nowoczesny sprzęt diagnostyczny oraz wynajem gabinetów lekarskich.',
      path: '/wspolpraca/',
    });
  }
}
