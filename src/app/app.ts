import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnTete } from './composants/en-tete/en-tete';
import { ListeCoursComponent } from './composants/liste-cours/liste-cours';
import { DetailCours } from './composants/detail-cours/detail-cours';
import { PiedPage } from './composants/pied-page/pied-page';
import { Cours } from './donnees/cours';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from './services/session';
import { Inscriptions } from './services/inscriptions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    EnTete,
    PiedPage,
    CommonModule,
    ListeCoursComponent,
    DetailCours,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'catalogue-cours';
  coursSelectionne: Cours | null = null;

  onSelectionCours(c: Cours) {
    this.coursSelectionne = c;
  }

  session = inject(Session);
  private router = inject(Router);
  inscriptions = inject(Inscriptions); 

  deconnecter() {
    this.session.deconnecter();
    this.router.navigateByUrl('/');
  }
}