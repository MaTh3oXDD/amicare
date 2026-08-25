import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { EntrySurvey } from './components/entry-survey/entry-survey';
import { AutolinkBadania } from './directives/autolink-badania';
import { ScrollReveal } from './services/scroll-reveal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, EntrySurvey, AutolinkBadania],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private scrollReveal = inject(ScrollReveal);

  ngAfterViewInit(): void {
    this.scrollReveal.init();
  }
}
