import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { PageHero } from '../../components/page-hero/page-hero';

@Component({
  selector: 'app-nie-znaleziono',
  imports: [PageHero, RouterLink],
  templateUrl: './nie-znaleziono.html',
})
export class NieZnaleziono implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Strona nie została znaleziona - AmiCare Centrum Medyczne');
    /* Bez noindex Google potrafi zaindeksować stronę błędu jako zwykłą podstronę. */
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}
