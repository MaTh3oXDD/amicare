import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';

interface Badanie {
  nazwa: string;
  link: string;
  opis: string;
  icon:
    | 'brzuch'
    | 'kolonoskopia'
    | 'gastroskopia'
    | 'puls'
    | 'holter'
    | 'ekg'
    | 'waga'
    | 'krew'
    | 'usg';
}

interface Kategoria {
  nazwa: string;
  opis: string;
  badania: Badanie[];
}

@Component({
  selector: 'app-badania-diagnostyczne',
  imports: [RouterLink, PageHero],
  templateUrl: './badania-diagnostyczne.html',
  styleUrl: './badania-diagnostyczne.scss',
})
export class BadaniaDiagnostyczne implements OnInit {
  private seo = inject(Seo);

  protected readonly kategorie: Kategoria[] = [
    {
      nazwa: 'Gastroenterologia',
      opis: 'Diagnostyka przewodu pokarmowego, od wywiadu po endoskopię.',
      badania: [
        {
          nazwa: 'Diagnostyka bólu brzucha',
          link: '/badania-diagnostyczne/diagnostyka-bolu-brzucha',
          opis: 'Ustalamy przyczynę dolegliwości i dobieramy dalsze badania.',
          icon: 'brzuch',
        },
        {
          nazwa: 'Kolonoskopia',
          link: '/pracownia-endoskopii/kolonoskopia',
          opis: 'Ocena jelita grubego kamerą - wykrywa polipy i stany zapalne.',
          icon: 'kolonoskopia',
        },
        {
          nazwa: 'Gastroskopia',
          link: '/pracownia-endoskopii/gastroskopia',
          opis: 'Wgląd w przełyk, żołądek i dwunastnicę przez cienki endoskop.',
          icon: 'gastroskopia',
        },
      ],
    },
    {
      nazwa: 'Serce',
      opis: 'Podstawowa diagnostyka układu krążenia.',
      badania: [
        {
          nazwa: 'Pomiar tętna i ciśnienia',
          link: '/badania-diagnostyczne/pomiar-tetna-i-cisnienia',
          opis: 'Szybka kontrola pracy serca i ciśnienia krwi.',
          icon: 'puls',
        },
        {
          nazwa: 'Badanie Holtera',
          link: '/badania-diagnostyczne/badanie-holtera',
          opis: 'Całodobowy zapis pracy serca podczas codziennych aktywności.',
          icon: 'holter',
        },
        {
          nazwa: 'Badanie EKG',
          link: '/badania-diagnostyczne/badanie-ekg',
          opis: 'Zapis elektrycznej czynności serca w kilka minut.',
          icon: 'ekg',
        },
      ],
    },
    {
      nazwa: 'Badania ogólne',
      opis: 'Podstawowe pomiary i badania laboratoryjne.',
      badania: [
        {
          nazwa: 'Pomiar masy ciała',
          link: '/badania-diagnostyczne/pomiar-masy-ciala',
          opis: 'Kontrola masy ciała i wskaźnika BMI.',
          icon: 'waga',
        },
        {
          nazwa: 'Pobranie krwi',
          link: '/badania-diagnostyczne/pobranie-krwi',
          opis: 'Pobranie próbki krwi do badań laboratoryjnych.',
          icon: 'krew',
        },
        {
          nazwa: 'Badanie USG',
          link: '/badania-diagnostyczne/badanie-usg',
          opis: 'Obrazowanie narządów jamy brzusznej falą ultradźwiękową.',
          icon: 'usg',
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Badania diagnostyczne - AmiCare Centrum Medyczne Łódź',
      description:
        'Twoje zdrowie w najlepszych rękach. Badania diagnostyczne w AmiCare Łódź: diagnostyka bólu brzucha, kolonoskopia, gastroskopia, EKG, USG, badanie Holtera i pobranie krwi.',
      path: '/badania-diagnostyczne',
    });
  }
}
