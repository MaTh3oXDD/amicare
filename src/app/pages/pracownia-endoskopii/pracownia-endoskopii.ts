import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';

@Component({
  selector: 'app-pracownia-endoskopii',
  imports: [RouterLink, PageHero],
  templateUrl: './pracownia-endoskopii.html',
  styleUrl: './pracownia-endoskopii.scss',
})
export class PracowniaEndoskopii implements OnInit {
  private seo = inject(Seo);

  ngOnInit(): void {
    this.seo.set({
      title: 'Pracownia Endoskopii - AmiCare Centrum Medyczne Łódź',
      description:
        'Nowoczesna pracownia endoskopii AmiCare w Łodzi: kolonoskopia i gastroskopia. Wybierz badanie, aby poznać szczegóły, przygotowanie i cennik.',
      path: '/pracownia-endoskopii',
    });
  }
}
