import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltreCoursPipe } from '../../pipes/filtre-cours-pipe';
import { TriCoursPipe } from '../../pipes/tri-cours-pipe';
import { Cours, COURS } from '../../donnees/cours';
import { RouterLink } from '@angular/router';
import { Catalogue } from '../../services/catalogue';


@Component({
  selector: 'app-liste-cours',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltreCoursPipe, TriCoursPipe,RouterLink],
  templateUrl: './liste-cours.html',
  styleUrl: './liste-cours.css',
})
export class ListeCoursComponent {
  recherche = '';
  tri: 'asc' | 'desc' = 'asc';

    @Output() coursSelectionne = new EventEmitter<Cours>();
    coursActif: Cours | null = null;

  cours: Cours[] = COURS;

    selectionner(c: Cours) {
    this.coursActif = c;
    this.coursSelectionne.emit(c);
  }
  private catalogue = inject(Catalogue);
cours: Cours[] = this.catalogue.lister();
}
