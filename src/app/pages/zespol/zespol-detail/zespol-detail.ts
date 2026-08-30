import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Seo } from '../../../services/seo';
import { slugify } from '../../../utils/slug';
import { Doctor, KADRA, KOORDYNATORZY, LEKARZE, PIELEGNIARKI } from '../../../models/doctor';
import { BIOGRAMY } from '../models/biogramy';

const ZL_WIDGET_SCRIPT_ID = 'zl-widget-s';
const ZL_WIDGET_SRC = 'https://platform.docplanner.com/js/widget.js';

/** wyciąga slug lekarza z URL ZnanyLekarz.pl, np. .../magdalena-baranska/gastrolog/lodz -> magdalena-baranska */
function znanyLekarzSlug(url: string): string | undefined {
  try {
    return new URL(url).pathname.split('/').filter(Boolean)[0];
  } catch {
    return undefined;
  }
}

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
  private doc = inject(DOCUMENT);

  readonly slug = input.required<string>();

  protected readonly doctor = computed<Doctor | undefined>(() => {
    const s = this.slug();
    const all = [...LEKARZE, ...KADRA, ...KOORDYNATORZY, ...PIELEGNIARKI];
    return all.find((d) => slugify(d.name) === s);
  });

  protected readonly znanyLekarzSlug = computed<string | undefined>(() => {
    const url = this.doctor()?.znanyLekarz;
    return url ? znanyLekarzSlug(url) : undefined;
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
        title: `${d.name} - ${d.title} w Łodzi | AmiCare Centrum Medyczne`,
        description: `${d.name} - ${d.title} w AmiCare Centrum Medyczne w Łodzi. Umów wizytę telefonicznie: 42 28 90 250.`.slice(
          0,
          160,
        ),
        path: `/o-nas/zespol/${this.slug()}`,
        image: d.photo,
      });

      this.seo.setBreadcrumbs([
        { nazwa: 'O nas', sciezka: '/o-nas' },
        { nazwa: 'Zespół', sciezka: '/o-nas/zespol' },
        { nazwa: d.name, sciezka: `/o-nas/zespol/${this.slug()}` },
      ]);
      this.seo.setJsonLd('ld-physician', {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: d.name,
        jobTitle: d.title,
        url: `https://amicare.pl/o-nas/zespol/${this.slug()}`,
        ...(d.photo ? { image: `https://amicare.pl/${d.photo}` } : {}),
        ...(d.znanyLekarz ? { sameAs: [d.znanyLekarz] } : {}),
        ...(d.bio ? { description: d.bio } : {}),
        worksFor: {
          '@type': 'MedicalOrganization',
          name: 'AmiCare Centrum Medyczne',
          url: 'https://amicare.pl/',
        },
        address: { '@type': 'PostalAddress', addressLocality: 'Łódź', addressCountry: 'PL' },
        availableService: {
          '@type': 'MedicalTherapy',
          name: d.title,
        },
      });

      if (d.znanyLekarz) {
        // Kolejny mikrotick, żeby kotwica .zl-url z @if zdążyła się wyrenderować w DOM.
        setTimeout(() => this.reloadZnanyLekarzWidget());
      }
    });
  }

  private reloadZnanyLekarzWidget(): void {
    this.doc.getElementById(ZL_WIDGET_SCRIPT_ID)?.remove();
    const script = this.doc.createElement('script');
    script.id = ZL_WIDGET_SCRIPT_ID;
    script.src = ZL_WIDGET_SRC;
    this.doc.body.appendChild(script);
  }

  ngOnInit(): void {}
}
