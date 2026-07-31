import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';

@Component({
  selector: 'app-o-nas',
  imports: [RouterLink, PageHero],
  templateUrl: './o-nas.html',
  styleUrl: './o-nas.scss',
})
export class ONas implements OnInit {
  private seo = inject(Seo);

  ngOnInit(): void {
    this.seo.set({
      title: 'O nas - AmiCare Centrum Medyczne | Badania kliniczne Łódź, Jelenia Góra',
      description:
        'AmiCare Centrum Medyczne to nowoczesny ośrodek mający swoje siedziby w Łodzi oraz w Jeleniej Górze. Zajmujemy się głównie badaniami klinicznymi, stale rozszerzając ofertę opieki zdrowotnej.',
      path: '/o-nas/',
    });
  }
}
