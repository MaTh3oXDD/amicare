import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';

@Component({
  selector: 'app-badania-diagnostyczne',
  imports: [RouterLink, PageHero],
  templateUrl: './badania-diagnostyczne.html',
  styleUrl: './badania-diagnostyczne.scss',
})
export class BadaniaDiagnostyczne implements OnInit {
  private seo = inject(Seo);

  protected readonly badania = [
    { nazwa: 'Diagnostyka bólu brzucha', link: '/badania-diagnostyczne/diagnostyka-bolu-brzucha' },
    { nazwa: 'Kolonoskopia', link: '/pracownia-endoskopii/kolonoskopia' },
    { nazwa: 'Gastroskopia', link: '/pracownia-endoskopii/gastroskopia' },
    { nazwa: 'Spirometria', link: '/badania-diagnostyczne/spirometria' },
    { nazwa: 'Pomiar tętna i ciśnienia', link: '/badania-diagnostyczne/pomiar-tetna-i-cisnienia' },
    { nazwa: 'Pomiar masy ciała', link: '/badania-diagnostyczne/pomiar-masy-ciala' },
    { nazwa: 'Pobranie krwi', link: '/badania-diagnostyczne/pobranie-krwi' },
    { nazwa: 'Badanie Holtera', link: '/badania-diagnostyczne/badanie-holtera' },
    { nazwa: 'Badanie EKG', link: '/badania-diagnostyczne/badanie-ekg' },
    { nazwa: 'Badanie USG', link: '/badania-diagnostyczne/badanie-usg' },
    { nazwa: 'Leczenie biologiczne', link: '/badania-diagnostyczne/leczenie-biologiczne' },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Badania diagnostyczne - AmiCare Centrum Medyczne Łódź',
      description:
        'Twoje zdrowie w najlepszych rękach. Badania diagnostyczne w AmiCare: diagnostyka bólu brzucha, kolonoskopia, gastroskopia, spirometria, EKG, USG, badanie Holtera i leczenie biologiczne.',
      path: '/badania-diagnostyczne/',
    });
  }
}
