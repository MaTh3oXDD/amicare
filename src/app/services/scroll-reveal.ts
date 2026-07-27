import { Injectable, NgZone, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollReveal {
  private router = inject(Router);
  private zone = inject(NgZone);
  private observer?: IntersectionObserver;
  private reducedMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  init(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this.observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0, rootMargin: '0px 0px -64px 0px' },
      );

      this.observe();
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
        setTimeout(() => this.observe(), 0);
      });
    });
  }

  private observe(): void {
    const targets = document.querySelectorAll<HTMLElement>('.section:not(.is-visible)');

    if (this.reducedMotion || !this.observer) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }

    targets.forEach((t) => this.observer!.observe(t));
  }
}
