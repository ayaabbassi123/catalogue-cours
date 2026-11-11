import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnTete } from './composants/en-tete/en-tete';
import { ListeCoursComponent, Cours } from './composants/liste-cours/liste-cours';
import { DetailCours } from './composants/detail-cours/detail-cours';
import { PiedPage } from './composants/pied-page/pied-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EnTete,
    ListeCoursComponent,
    DetailCours,
    PiedPage
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
}