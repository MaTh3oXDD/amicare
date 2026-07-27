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
    'Diagnostyka bólu brzucha',
    'Kolonoskopia',
    'Gastroskopia',
    'Spirometria',
    'Pomiar tętna i ciśnienia',
    'Pomiar masy ciała',
    'Pobranie krwi',
    'Badanie Holtera',
    'Badanie EKG',
    'Badanie USG',
    'Leczenie biologiczne',
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Badania diagnostyczne — AmiCare Centrum Medyczne Łódź',
      description:
        'Twoje zdrowie w najlepszych rękach. Badania diagnostyczne w AmiCare: diagnostyka bólu brzucha, kolonoskopia, gastroskopia, spirometria, EKG, USG, badanie Holtera i leczenie biologiczne.',
      path: '/badania-diagnostyczne/',
    });
  }
}
