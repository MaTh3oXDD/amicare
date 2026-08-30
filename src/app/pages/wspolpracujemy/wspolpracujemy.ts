import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';
import { GRUPY_PARTNEROW, GrupaPartnerow } from './models/partnerzy';

@Component({
  selector: 'app-wspolpracujemy',
  imports: [PageHero, RouterLink],
  templateUrl: './wspolpracujemy.html',
  styleUrl: './wspolpracujemy.scss',
})
export class Wspolpracujemy implements OnInit {
  private seo = inject(Seo);

  protected readonly grupy = GRUPY_PARTNEROW;

  /* Grupa z dwoma partnerami ma zajac cala szerokosc w dwoch kolumnach,
     zamiast zostawiac puste miejsce po trzeciej. */
  protected kolumny(g: GrupaPartnerow): number {
    return Math.min(3, g.partnerzy.length);
  }

  ngOnInit(): void {
    this.seo.set({
      title: 'Współpracujemy - ubezpieczyciele i partnerzy | AmiCare Łódź',
      description:
        'AmiCare realizuje świadczenia w ramach polis i abonamentów: Allianz, Generali Zdrowie, JP Medica, LUX MED, Medicover, POLMED, PZU Zdrowie, Saneo, Telemedi. Współpracujemy też z Ostoją Seniora i DASMED w Łodzi.',
      path: '/o-nas/wspolpracujemy',
    });

    this.seo.setBreadcrumbs([
      { nazwa: 'O nas', sciezka: '/o-nas' },
      { nazwa: 'Współpracujemy', sciezka: '/o-nas/wspolpracujemy' },
    ]);

    this.seo.setJsonLd('ld-partnerzy', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Współpracujemy - partnerzy AmiCare',
      url: 'https://amicare.pl/o-nas/wspolpracujemy',
      about: {
        '@type': 'MedicalOrganization',
        name: 'AmiCare Centrum Medyczne',
        url: 'https://amicare.pl/',
        telephone: '+48422890250',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ul. Romanowska 55N',
          addressLocality: 'Łódź',
          addressCountry: 'PL',
        },
      },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Partnerzy i ubezpieczyciele',
        itemListElement: this.grupy
          .flatMap((g) => g.partnerzy)
          .map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Organization',
              name: p.nazwa,
              description: p.opis,
              ...(p.logo ? { logo: `https://amicare.pl/${p.logo}` } : {}),
              ...(p.url ? { url: p.url } : {}),
            },
          })),
      },
    });
  }
}
