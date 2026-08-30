import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Seo } from '../../../services/seo';
import { PageHero } from '../../../components/page-hero/page-hero';
import { ZgloszenieForm } from '../components/zgloszenie-form/zgloszenie-form';
import { BADANIA, Study } from '../models/study';

@Component({
  selector: 'app-badanie-kliniczne-detail',
  imports: [RouterLink, PageHero, ZgloszenieForm],
  templateUrl: './badanie-kliniczne-detail.html',
  styleUrl: './badanie-kliniczne-detail.scss',
})
export class BadanieKliniczneDetail {
  private seo = inject(Seo);
  private router = inject(Router);

  readonly slug = input.required<string>();

  protected readonly badanie = computed<Study | undefined>(() =>
    BADANIA.find((b) => b.slug === this.slug()),
  );

  constructor() {
    toObservable(this.badanie).subscribe((b) => {
      if (!b) {
        this.router.navigateByUrl('/badania-kliniczne');
        return;
      }

      this.seo.set({
        title: `${b.jednostka} - badanie kliniczne | AmiCare ${b.miasto}`,
        description: (
          b.lead ?? `Badanie kliniczne: ${b.jednostka}. Ośrodek AmiCare ${b.miasto}.`
        ).slice(0, 160),
        path: `/badania-kliniczne/${b.slug}`,
      });

      this.seo.setBreadcrumbs([
        { nazwa: 'Badania kliniczne', sciezka: '/badania-kliniczne' },
        { nazwa: b.jednostka, sciezka: `/badania-kliniczne/${b.slug}` },
      ]);
    });
  }
}
