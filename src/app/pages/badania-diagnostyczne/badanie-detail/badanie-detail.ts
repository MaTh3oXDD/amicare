import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Seo } from '../../../services/seo';
import { PageHero } from '../../../components/page-hero/page-hero';
import { DIAGNOSTYKA, DiagnostykaEntry } from '../models/diagnostyka-data';

@Component({
  selector: 'app-badanie-detail',
  imports: [RouterLink, PageHero],
  templateUrl: './badanie-detail.html',
  styleUrl: './badanie-detail.scss',
})
export class BadanieDetail {
  private seo = inject(Seo);
  private router = inject(Router);

  readonly slug = input.required<string>();

  protected readonly badanie = computed<DiagnostykaEntry | undefined>(() =>
    DIAGNOSTYKA.find((b) => b.slug === this.slug()),
  );

  protected readonly tresc = computed(
    () => this.badanie()?.bloki.filter((b) => b.typ !== 'cena' && b.typ !== 'linki') ?? [],
  );

  protected readonly cena = computed(() =>
    this.badanie()?.bloki.find((b): b is Extract<typeof b, { typ: 'cena' }> => b.typ === 'cena'),
  );

  protected readonly linki = computed(() =>
    this.badanie()?.bloki.find((b): b is Extract<typeof b, { typ: 'linki' }> => b.typ === 'linki'),
  );

  constructor() {
    toObservable(this.badanie).subscribe((b) => {
      if (!b) {
        this.router.navigateByUrl('/badania-diagnostyczne');
        return;
      }
      this.seo.set({
        title: `${b.nazwa} - Badania diagnostyczne | AmiCare Centrum Medyczne`,
        description: `${b.nazwa} w AmiCare Łódź. ${b.lead}`.slice(0, 160),
        path: `/badania-diagnostyczne/${b.slug}`,
      });

      this.seo.setBreadcrumbs([
        { nazwa: 'Badania diagnostyczne', sciezka: '/badania-diagnostyczne' },
        { nazwa: b.nazwa, sciezka: `/badania-diagnostyczne/${b.slug}` },
      ]);
    });
  }
}
