import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';
import { PLACOWKI } from '../../models/placowka';

@Component({
  selector: 'app-placowki',
  imports: [RouterLink, PageHero],
  templateUrl: './placowki.html',
  styleUrl: './placowki.scss',
})
export class Placowki implements OnInit {
  private seo = inject(Seo);

  protected readonly placowki = PLACOWKI;

  ngOnInit(): void {
    this.seo.set({
      title: 'Placówki — AmiCare | Łódź Romanowska, Łódź Zgierska, Jelenia Góra',
      description:
        'Trzy placówki AmiCare: Centrum Medyczne Łódź Romanowska 55N, Centrum Medyczne Łódź Zgierska 249 oraz Ośrodek Badań Klinicznych w Jeleniej Górze. Telefon: +48 42 28 90 250.',
      path: '/placowki/',
    });
  }
}
