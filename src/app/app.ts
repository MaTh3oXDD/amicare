import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ColorPicker } from './components/color-picker/color-picker';
import { EntrySurvey } from './components/entry-survey/entry-survey';
import { ScrollReveal } from './services/scroll-reveal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ColorPicker, EntrySurvey],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private scrollReveal = inject(ScrollReveal);

  ngAfterViewInit(): void {
    this.scrollReveal.init();
  }
}
