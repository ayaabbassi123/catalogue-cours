import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cours } from '../../donnees/cours';
import { Session } from '../../services/session';
import { Catalogue } from '../../services/catalogue';
import { Inscriptions } from '../../services/inscriptions';
import { nomComplet } from '../../validators/nom-complet';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,DatePipe, RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription implements OnInit {
  private session = inject(Session);
  private catalogue = inject(Catalogue);
  private inscriptions = inject(Inscriptions);

  @Input() id = '';
  confirmation = '';

  get cours(): Cours | undefined {
    return this.catalogue.trouver(Number(this.id));
  }

  form = new FormGroup({
    nom: new FormControl('', [Validators.required, nomComplet]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.pattern(/^[0-9]{8}$/)]),
    niveau: new FormControl('', [Validators.required]),
    motivation: new FormControl('', [Validators.required, Validators.minLength(20)]),
    conditions: new FormControl(false, [Validators.requiredTrue]),
  });

  ngOnInit() {
    this.form.patchValue({ nom: this.session.nom() });
  }

  get nom() { return this.form.controls.nom; }
  get email() { return this.form.controls.email; }
  get telephone() { return this.form.controls.telephone; }
  get niveau() { return this.form.controls.niveau; }
  get motivation() { return this.form.controls.motivation; }
  get conditions() { return this.form.controls.conditions; }

  envoyer() {
    const cours = this.cours;
    if (this.form.invalid || !cours) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    this.inscriptions.ajouter({
      coursId: cours.id,
      nom: v.nom ?? '',
      email: v.email ?? '',
      niveau: v.niveau ?? '',
      date: new Date(),
    });

    this.confirmation = `Merci ${v.nom} ! Votre inscription à « ${cours.titre} » est enregistrée.`;
    this.form.reset();
  }
}
