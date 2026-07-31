import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';
import { SPECJALIZACJE } from '../specjalizacja/models/specjalizacja-data';

@Component({
  selector: 'app-konsultacje',
  imports: [RouterLink, PageHero],
  templateUrl: './konsultacje.html',
  styleUrl: './konsultacje.scss',
})
export class Konsultacje implements OnInit {
  private seo = inject(Seo);

  protected readonly specjalizacje = SPECJALIZACJE;

  ngOnInit(): void {
    this.seo.set({
      title: 'Konsultacje specjalistyczne — AmiCare Centrum Medyczne Łódź',
      description:
        'Konsultacje specjalistyczne w AmiCare: gastroenterologia, chirurgia, reumatologia, kardiologia, psychologia, dietetyka, proktologia. Łatwy i szybki dostęp do wysoko specjalistycznej diagnostyki.',
      path: '/konsultacje-specjalistyczne/',
    });
  }
}
