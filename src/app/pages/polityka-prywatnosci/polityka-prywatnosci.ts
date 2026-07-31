import { Component, inject, OnInit } from '@angular/core';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';

@Component({
  selector: 'app-polityka-prywatnosci',
  imports: [PageHero],
  templateUrl: './polityka-prywatnosci.html',
  styleUrl: './polityka-prywatnosci.scss',
})
export class PolitykaPrywatnosci implements OnInit {
  private seo = inject(Seo);

  ngOnInit(): void {
    this.seo.set({
      title: 'Polityka prywatności i RODO - AmiCare Centrum Medyczne Łódź',
      description:
        'Polityka prywatności, ochrona danych osobowych i informacje RODO w AmiCare Centrum Medyczne w Łodzi.',
      path: '/polityka-prywatnosci/',
    });
  }
}
