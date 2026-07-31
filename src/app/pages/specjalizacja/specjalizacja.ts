import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';
import { DoctorCard } from '../../components/doctor-card/doctor-card';
import { DIETETYCY, KADRA, KOORDYNATORZY, LEKARZE, Doctor } from '../../models/doctor';
import { SPECJALIZACJE, SpecjalizacjaInfo } from './models/specjalizacja-data';

@Component({
  selector: 'app-specjalizacja',
  imports: [RouterLink, PageHero, DoctorCard],
  templateUrl: './specjalizacja.html',
  styleUrl: './specjalizacja.scss',
})
export class Specjalizacja {
  private seo = inject(Seo);
  private router = inject(Router);

  readonly slug = input.required<string>();

  protected readonly spec = computed<SpecjalizacjaInfo | undefined>(() =>
    SPECJALIZACJE.find((s) => s.slug === this.slug()),
  );

  protected readonly lekarze = computed<Doctor[]>(() => {
    const s = this.spec();
    if (!s) return [];
    const all = [...LEKARZE, ...DIETETYCY, ...KADRA, ...KOORDYNATORZY];
    return s.lekarze
      .map((name) => all.find((d) => d.name === name) ?? { name, title: '' })
      .filter((d): d is Doctor => !!d);
  });

  constructor() {
    toObservable(this.spec).subscribe((s) => {
      if (!s) {
        this.router.navigateByUrl('/konsultacje-specjalistyczne');
        return;
      }
      this.seo.set({
        title: `${s.nazwa} Łódź - Konsultacje | AmiCare Centrum Medyczne`,
        description: `${s.nazwa} w Łodzi - AmiCare Centrum Medyczne. ${s.opis[0]}`.slice(0, 160),
        path: `/konsultacje-specjalistyczne/${s.slug}/`,
      });
      this.seo.setJsonLd('ld-specjalizacja', {
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name: `AmiCare Centrum Medyczne - ${s.nazwa}`,
        medicalSpecialty: s.nazwa,
        areaServed: { '@type': 'City', name: 'Łódź' },
        url: `https://amicare.pl/konsultacje-specjalistyczne/${s.slug}/`,
        telephone: '+48 42 28 90 250',
      });
    });
  }
}
