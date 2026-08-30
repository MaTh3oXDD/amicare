import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHero } from '../../components/page-hero/page-hero';
import { Seo } from '../../services/seo';
import { CENNIK } from './models/cennik-data';

@Component({
  selector: 'app-cennik',
  imports: [RouterLink, PageHero],
  templateUrl: './cennik.html',
  styleUrl: './cennik.scss',
})
export class Cennik implements OnInit {
  private readonly seo = inject(Seo);

  protected readonly sekcje = CENNIK;

  ngOnInit(): void {
    this.seo.set({
      title: 'Cennik - AmiCare Centrum Medyczne Łódź',
      description:
        'Cennik AmiCare Łódź: gastroskopia, kolonoskopia, konsultacje specjalistyczne, badania diagnostyczne. Ceny w dni robocze i w weekend.',
      path: '/cennik',
    });
  }
}
