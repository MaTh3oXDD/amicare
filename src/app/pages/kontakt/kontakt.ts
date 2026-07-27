import { Component, inject, OnInit } from '@angular/core';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';
import { PlacowkaCard } from '../../components/placowka-card/placowka-card';
import { FormularzKontaktowy } from './components/formularz-kontaktowy/formularz-kontaktowy';
import { PLACOWKI } from '../../models/placowka';

@Component({
  selector: 'app-kontakt',
  imports: [PageHero, PlacowkaCard, FormularzKontaktowy],
  templateUrl: './kontakt.html',
  styleUrl: './kontakt.scss',
})
export class Kontakt implements OnInit {
  private seo = inject(Seo);

  protected readonly placowki = PLACOWKI;

  ngOnInit(): void {
    this.seo.set({
      title: 'Kontakt — AmiCare Centrum Medyczne | Łódź, Jelenia Góra',
      description:
        'Skontaktuj się z AmiCare Centrum Medyczne. Oddziały Łódź: Ul. Romanowska 55N i Ul. Zgierska 249. Telefon: +48 42 28 90 250, email: rejestracja@amicare.pl. Badania kliniczne: +48 786 086 331.',
      path: '/kontakt/',
    });
  }
}
