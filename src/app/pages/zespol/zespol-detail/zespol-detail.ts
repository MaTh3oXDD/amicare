import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Seo } from '../../../services/seo';
import { Doctor, KADRA, KOORDYNATORZY, LEKARZE, PIELEGNIARKI } from '../../../models/doctor';
import { BIOGRAMY } from '../models/biogramy';

interface PriceRow {
  label: string;
  price: string;
}

interface BiogramContent {
  narrative: string[];
  priceRows: PriceRow[];
}

const CONTACT_RE = /^(zarezerwuj|telefonicznie|umów)/i;
const PRICE_HEADER_RE = /^(cennik|usługa|cena)$/i;
const ZNANY_RE = /znanylekarz/i;
const PHONE_ONLY_RE = /^\+?[\d\s]{7,}$/;

function isSkippable(line: string): boolean {
  const trimmed = line.trim();
  return CONTACT_RE.test(trimmed) || PRICE_HEADER_RE.test(trimmed) || ZNANY_RE.test(trimmed) || PHONE_ONLY_RE.test(trimmed);
}

function parseBiogram(bio: string[]): BiogramContent {
  const pricingStart = bio.findIndex((line) => /^cennik$/i.test(line.trim()));
  const uslugaFallback = pricingStart === -1 ? bio.findIndex((line) => /^usługa$/i.test(line.trim())) : -1;
  const splitIndex = pricingStart !== -1 ? pricingStart : uslugaFallback;

  const narrativeLines = splitIndex === -1 ? bio : bio.slice(0, splitIndex);
  const pricingLines = splitIndex === -1 ? [] : bio.slice(splitIndex);

  const narrative = narrativeLines.filter((line) => !isSkippable(line) && line.trim().length > 0);

  const priceTokens = pricingLines.filter((line) => !isSkippable(line) && line.trim().length > 0);
  const priceRows: PriceRow[] = [];
  for (let i = 0; i + 1 < priceTokens.length; i += 2) {
    priceRows.push({ label: priceTokens[i], price: priceTokens[i + 1] });
  }

  return { narrative, priceRows };
}

@Component({
  selector: 'app-zespol-detail',
  imports: [RouterLink],
  templateUrl: './zespol-detail.html',
  styleUrl: './zespol-detail.scss',
})
export class ZespolDetail implements OnInit {
  private seo = inject(Seo);
  private router = inject(Router);

  readonly slug = input.required<string>();

  protected readonly doctor = computed<Doctor | undefined>(() => {
    const s = this.slug();
    const all = [...LEKARZE, ...KADRA, ...KOORDYNATORZY, ...PIELEGNIARKI];
    return all.find((d) => d.name.toLowerCase().replace(/\s+/g, '-') === s);
  });

  protected readonly biogram = computed<string[] | undefined>(() => {
    const d = this.doctor();
    return d ? BIOGRAMY[d.name] : undefined;
  });

  protected readonly content = computed<BiogramContent | undefined>(() => {
    const bio = this.biogram();
    return bio ? parseBiogram(bio) : undefined;
  });

  constructor() {
    toObservable(this.doctor).subscribe((d) => {
      if (!d) {
        this.router.navigateByUrl('/o-nas/zespol');
        return;
      }
      this.seo.set({
        title: `${d.name} — ${d.title} w Łodzi | AmiCare Centrum Medyczne`,
        description: `${d.name} — ${d.title} w AmiCare Centrum Medyczne w Łodzi. Umów wizytę telefonicznie: 42 28 90 250.`.slice(
          0,
          160,
        ),
        path: `/o-nas/zespol/${this.slug()}/`,
      });
      this.seo.setJsonLd('ld-physician', {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: d.name,
        medicalSpecialty: d.title,
        worksFor: {
          '@type': 'MedicalOrganization',
          name: 'AmiCare Centrum Medyczne',
          url: 'https://amicare.pl/',
        },
        address: { '@type': 'PostalAddress', addressLocality: 'Łódź', addressCountry: 'PL' },
      });
    });
  }

  ngOnInit(): void {}
}
