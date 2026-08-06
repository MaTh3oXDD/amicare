import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PLACOWKI } from '../../models/placowka';
import { Aktualnosci } from './components/aktualnosci/aktualnosci';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Aktualnosci],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private seo = inject(Seo);

  protected readonly placowki = PLACOWKI;

  protected readonly specjalizacje = [
    { slug: 'gastroenterologia', label: 'Gastroenterologia' },
    { slug: 'chirurgia', label: 'Chirurgia' },
    { slug: 'reumatologia', label: 'Reumatologia' },
    { slug: 'kardiologia', label: 'Kardiologia' },
    { slug: 'psychologia', label: 'Psychologia' },
    { slug: 'dietetyka', label: 'Dietetyka' },
    { slug: 'proktologia', label: 'Proktologia' },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'AmiCare Centrum Medyczne- kolonoskopia, gastroskopia, poradnie specjalistyczne',
      description:
        'AmiCare Łódź - centrum medyczne z dwiema przychodniami (ul. Romanowska 55N i ul. Zgierska 249). Konsultacje specjalistyczne, badania kliniczne, endoskopia i diagnostyka w jednym miejscu.',
      path: '/',
    });

    this.seo.setJsonLd('ld-org', {
      '@context': 'https://schema.org',
      '@type': 'MedicalOrganization',
      name: 'AmiCare Centrum Medyczne',
      alternateName: 'AmiCare Łódź',
      url: 'https://amicare.pl/',
      logo: 'https://amicare.pl/images/slogan.svg',
      image: 'https://amicare.pl/images/centrum-020.webp',
      slogan: 'We help Patients through Science - Pomagamy pacjentom przez naukę',
      telephone: '+48 42 28 90 250',
      email: 'rejestracja@amicare.pl',
      areaServed: [
        { '@type': 'City', name: 'Łódź' },
        { '@type': 'City', name: 'Jelenia Góra' },
      ],
      sameAs: ['https://www.facebook.com/profile.php?id=100063902769454'],
      department: [
        {
          '@type': 'MedicalClinic',
          name: 'Amicare Centrum Medyczne - Łódź, Romanowska',
          url: 'https://amicare.pl/placowki/lodz-romanowska/',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Ul. Romanowska 55N',
            postalCode: '91-174',
            addressLocality: 'Łódź',
            addressCountry: 'PL',
          },
          telephone: '+48 42 28 90 250',
          openingHours: 'Mo-Fr 08:00-20:00',
        },
        {
          '@type': 'MedicalClinic',
          name: 'Amicare Centrum Medyczne - Łódź, Zgierska',
          url: 'https://amicare.pl/placowki/lodz-zgierska/',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Ul. Zgierska 249',
            postalCode: '91-495',
            addressLocality: 'Łódź',
            addressCountry: 'PL',
          },
          telephone: '+48 42 28 90 250',
          openingHours: 'Mo-Fr 08:00-16:00',
        },
        {
          '@type': 'MedicalClinic',
          name: 'Amicare Ośrodek Badań Klinicznych - Jelenia Góra',
          url: 'https://amicare.pl/placowki/jelenia-gora/',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jelenia Góra',
            addressCountry: 'PL',
          },
          telephone: '+48 786 086 331',
        },
      ],
    });
  }
}
