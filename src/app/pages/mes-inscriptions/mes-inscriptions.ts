import { Component, inject } from '@angular/core';
import { Session } from '../../services/session';
import { Inscriptions } from '../../services/inscriptions';
import { Catalogue } from '../../services/catalogue';

@Component({
  selector: 'app-mes-inscriptions',
  standalone: true,
  imports: [],
  templateUrl: './mes-inscriptions.html',
  styleUrl: './mes-inscriptions.css'
})
export class MesInscriptions {
  session = inject(Session);
  catalogue = inject(Catalogue);
inscriptions = inject(Inscriptions);
}

