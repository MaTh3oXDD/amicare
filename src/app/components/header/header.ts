import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  link: string;
  fragment?: string;
}

interface NavGroup {
  label: string;
  link: string;
  children?: NavLink[];
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly menuOpen = signal(false);
  protected readonly openGroup = signal<string | null>(null);

  protected readonly nav: NavGroup[] = [
    { label: 'Konsultacje specjalistyczne', link: '/konsultacje-specjalistyczne' },
    { label: 'Pracownia endoskopii', link: '/pracownia-endoskopii' },
    { label: 'Badania diagnostyczne', link: '/badania-diagnostyczne' },
    { label: 'Badania kliniczne', link: '/badania-kliniczne' },
    { label: 'Placówki', link: '/placowki' },
    {
      label: 'O nas',
      link: '/o-nas',
      children: [
        { label: 'O AmiCare', link: '/o-nas' },
        { label: 'Zespół', link: '/o-nas/zespol' },
        { label: 'Współpraca', link: '/wspolpraca' },
      ],
    },
  ];

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  toggleGroup(label: string): void {
    this.openGroup.update((g) => (g === label ? null : label));
  }

  close(): void {
    this.menuOpen.set(false);
    this.openGroup.set(null);
  }
}
