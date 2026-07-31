import { Component, inject, OnInit } from '@angular/core';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';

@Component({
  selector: 'app-regulamin-platnosci',
  imports: [PageHero],
  templateUrl: './regulamin-platnosci.html',
  styleUrl: './regulamin-platnosci.scss',
})
export class RegulaminPlatnosci implements OnInit {
  private seo = inject(Seo);

  ngOnInit(): void {
    this.seo.set({
      title: 'Regulamin płatności online - AmiCare Centrum Medyczne Łódź',
      description:
        'Regulamin płatności online i warunki transakcji w AmiCare Centrum Medyczne w Łodzi.',
      path: '/regulamin-platnosci/',
    });
  }
}
