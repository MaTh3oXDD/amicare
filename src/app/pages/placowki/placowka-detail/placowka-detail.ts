import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Seo } from '../../../services/seo';
import { PLACOWKI, Placowka } from '../../../models/placowka';
import { BADANIA, Study } from '../../badania-kliniczne/models/study';

@Component({
  selector: 'app-placowka-detail',
  imports: [RouterLink],
  templateUrl: './placowka-detail.html',
  styleUrl: './placowka-detail.scss',
})
export class PlacowkaDetail {
  private seo = inject(Seo);
  private router = inject(Router);

  readonly slug = input.required<string>();

  protected readonly placowka = computed<Placowka | undefined>(() =>
    PLACOWKI.find((p) => p.slug === this.slug()),
  );

  protected readonly inne = computed(() => PLACOWKI.filter((p) => p.slug !== this.slug()));

  protected readonly badania = computed<Study[]>(() => {
    const p = this.placowka();
    return p ? BADANIA.filter((b) => b.miasto === p.miasto) : [];
  });

  constructor() {
    toObservable(this.placowka).subscribe((p) => {
      if (!p) {
        this.router.navigateByUrl('/placowki');
        return;
      }
      this.seo.set({
        title:
          p.miasto === 'Łódź'
            ? `${p.nazwa} Łódź - ${p.adres ? p.adres.split(',')[0] : p.typ} | AmiCare`
            : `${p.nazwa} - ${p.miasto}${p.adres ? ', ' + p.adres.split(',')[0] : ''} | AmiCare`,
        description: `${p.typ} AmiCare w ${p.miasto}. ${p.adres ?? ''} ${p.godziny ?? ''} Telefon: ${p.telefon}, email: ${p.email}.`,
        path: `/placowki/${p.slug}/`,
      });
      this.seo.setJsonLd('ld-placowka', {
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name: `${p.nazwa} - ${p.miasto}`,
        url: `https://amicare.pl/placowki/${p.slug}/`,
        ...(p.zdjecie ? { image: `https://amicare.pl/${p.zdjecie}` } : {}),
        telephone: p.telefon,
        email: p.email,
        priceRange: '$$',
        areaServed: { '@type': 'City', name: p.miasto },
        sameAs: ['https://www.facebook.com/profile.php?id=100063902769454'],
        parentOrganization: {
          '@type': 'MedicalOrganization',
          name: 'AmiCare Centrum Medyczne',
          url: 'https://amicare.pl/',
        },
        address: {
          '@type': 'PostalAddress',
          ...(p.adres ? { streetAddress: p.adres.split(',')[0] } : {}),
          addressLocality: p.miasto,
          addressCountry: 'PL',
        },
        ...(p.godziny ? { openingHours: this.toOpeningHours(p.godziny) } : {}),
      });
    });
  }

  private toOpeningHours(godziny: string): string {
    const match = godziny.match(/(\d{1,2})\.(\d{2})-(\d{1,2})\.(\d{2})/);
    if (!match) return godziny;
    const [, h1, m1, h2, m2] = match;
    return `Mo-Fr ${h1.padStart(2, '0')}:${m1}-${h2.padStart(2, '0')}:${m2}`;
  }
}
