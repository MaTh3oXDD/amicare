import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Seo } from '../../services/seo';
import { PageHero } from '../../components/page-hero/page-hero';
import { StudyCard } from './components/study-card/study-card';
import { ZgloszenieDialog } from './components/zgloszenie-dialog/zgloszenie-dialog';
import { BADANIA, Study } from './models/study';

interface Phase {
  numeral: string;
  title: string;
  desc: string;
}

const PHASES: Phase[] = [
  {
    numeral: 'I',
    title: 'Bezpieczeństwo',
    desc: 'W pierwszej kolejności wstępnie oceniane jest bezpieczeństwo badanej substancji. Badania prowadzone są na grupie kilkudziesięciu zdrowych ochotników, u których oceniany jest metabolizm, wchłanianie, eliminacja, ewentualna toksyczność oraz interakcje badanej substancji. Faza ta pozwala na określenie dawkowania badanej substancji. Badania prowadzone są w wyspecjalizowanych ośrodkach, najczęściej należących do firm farmaceutycznych lub instytucji badawczych. W przypadku terapii onkologicznych I fazę badań łączy się z fazą II, aby nie narażać zdrowych ochotników na kontakt z wysoce toksycznymi substancjami.',
  },
  {
    numeral: 'II',
    title: 'Skuteczność',
    desc: 'Na tym etapie badań określa się, czy lek działa w określonej grupie chorych oraz czy jest dla nich bezpieczny. Oceniana jest także zależność między dawką a efektem terapeutycznym, co pozwala ustalić dawkowanie w kolejnych fazach badania. Przez cały czas trwania II Fazy monitorowana jest skuteczność i bezpieczeństwo leku. Szczegółowej ocenie podlegają dane dotyczące wchłaniania, metabolizmu i wydalania leku w zależności od płci i wieku. Nowy lek porównywany jest z placebo lub standardowym leczeniem metodą ślepej próby - ani pacjent, ani badacz nie wiedzą, czy choremu podawana jest substancja będąca przedmiotem badania, czy też placebo. Uczestnikami są losowo wybrani ochotnicy, zwykle kilkaset osób z badaną chorobą. Faza kończy się sukcesem, gdy korzyści istotnie przewyższają ryzyko, co pozwala przejść do kolejnego etapu badania.',
  },
  {
    numeral: 'III',
    title: 'Porównanie',
    desc: 'III Faza badań klinicznych ma na celu ostateczne potwierdzenie skuteczności badanej substancji w leczeniu danej choroby. Badany jest związek między bezpieczeństwem a skutecznością leku zarówno przy krótko-, jak i długoterminowym stosowaniu. Uczestniczą w niej grupy liczące nawet kilka tysięcy pacjentów, a czas trwania badania wynosi od roku do kilku lat. Podobnie jak w Fazie II, stosuje się metodę podwójnie ślepej próby i losowy dobór pacjentów. Po pomyślnym zakończeniu III Fazy lek może otrzymać rejestrację i dopuszczenie do obrotu. Dokumentacja przekazywana do urzędu rejestracyjnego obejmuje wszystkie dane zebrane podczas badań przedklinicznych i klinicznych (Fazy I-III) i może liczyć nawet tysiące stron. Przed rozpoczęciem programu badawczego producenci leków konsultują się z urzędami rejestracji leków, aby precyzyjnie określić populację pacjentów i zminimalizować ryzyko odrzucenia dokumentacji z powodu braku kluczowych informacji.',
  },
  {
    numeral: 'IV',
    title: 'Obserwacja',
    desc: 'Ostatnia faza badań klinicznych dotyczy leków zarejestrowanych i wprowadzonych do obrotu, czyli dostępnych w sprzedaży. Etap ten ma na celu określenie, czy lek jest bezpieczny we wszystkich wskazaniach zalecanych przez producenta i dla wszystkich grup chorych. W tej fazie weryfikowane są wyniki uzyskane we wcześniejszych etapach badań, a także poszukiwane są nowe zastosowania dla leków już dopuszczonych do obrotu.',
  },
];

const AUTOPLAY_MS = 6_000;

@Component({
  selector: 'app-badania-kliniczne',
  imports: [PageHero, StudyCard, ZgloszenieDialog],
  templateUrl: './badania-kliniczne.html',
  styleUrl: './badania-kliniczne.scss',
})
export class BadaniaKliniczne implements OnInit, OnDestroy {
  private seo = inject(Seo);

  protected readonly phases = PHASES;
  protected readonly activePhase = signal(0);

  private autoplayTimer?: ReturnType<typeof setInterval>;
  private readonly reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  protected readonly miasta = ['Wszystkie', 'Łódź', 'Jelenia Góra'] as const;
  protected readonly filtr = signal<string>('Wszystkie');

  protected readonly badania = computed(() =>
    this.filtr() === 'Wszystkie' ? BADANIA : BADANIA.filter((b) => b.miasto === this.filtr()),
  );

  protected readonly selectedStudy = signal<Study | null>(null);

  protected openZgloszenie(study: Study): void {
    this.selectedStudy.set(study);
  }

  protected onZgloszenieClosed(): void {
    this.selectedStudy.set(null);
  }

  protected goToPhase(index: number): void {
    this.activePhase.set(index);
    this.restartAutoplay();
  }

  protected nextPhase(): void {
    this.activePhase.update((i) => (i + 1) % this.phases.length);
  }

  protected prevPhase(): void {
    this.activePhase.update((i) => (i - 1 + this.phases.length) % this.phases.length);
  }

  protected onPrevClick(): void {
    this.prevPhase();
    this.restartAutoplay();
  }

  protected onNextClick(): void {
    this.nextPhase();
    this.restartAutoplay();
  }

  private startAutoplay(): void {
    if (this.reducedMotion) return;
    this.autoplayTimer = setInterval(() => this.nextPhase(), AUTOPLAY_MS);
  }

  private stopAutoplay(): void {
    clearInterval(this.autoplayTimer);
  }

  protected restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  protected pauseAutoplay(): void {
    this.stopAutoplay();
  }

  protected resumeAutoplay(): void {
    this.startAutoplay();
  }

  ngOnInit(): void {
    this.seo.set({
      title: 'Badania kliniczne - AmiCare | Łódź i Jelenia Góra',
      description:
        'Obecnie prowadzone badania kliniczne i ankiety kwalifikujące w ośrodkach AmiCare w Łodzi i Jeleniej Górze. Dlaczego badania kliniczne są tak istotne? Jakie są etapy badań klinicznych?',
      path: '/badania-kliniczne/',
    });
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
