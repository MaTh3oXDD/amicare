import { Component, inject, OnInit } from '@angular/core';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';
import { DoctorCard } from '../../components/doctor-card/doctor-card';
import { Doctor, KADRA, KOORDYNATORZY, LEKARZE, PIELEGNIARKI } from '../../models/doctor';
import { BIOGRAMY } from './models/biogramy';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-zespol',
  imports: [PageHero, DoctorCard, RouterLink],
  templateUrl: './zespol.html',
  styleUrl: './zespol.scss',
})
export class Zespol implements OnInit {
  private seo = inject(Seo);

  protected readonly lekarze = LEKARZE;
  protected readonly kadra = KADRA;
  protected readonly koordynatorzy = KOORDYNATORZY;
  protected readonly pielegniarki = PIELEGNIARKI;

  getDetailUrl(d: Doctor): string {
    const slug = d.name.toLowerCase().replace(/\s+/g, '-');
    return `/o-nas/zespol/${slug}`;
  }

  hasBiogram(d: Doctor): boolean {
    return !!BIOGRAMY[d.name];
  }

  ngOnInit(): void {
    this.seo.set({
      title: 'Zespół — AmiCare Centrum Medyczne Łódź',
      description:
        'Poznaj zespół AmiCare Centrum Medyczne w Łodzi — lekarze specjaliści, kadra zarządzająca, koordynatorzy badań klinicznych i zespół pielęgniarski. We help Patients through Science.',
      path: '/o-nas/zespol/',
    });
  }
}
