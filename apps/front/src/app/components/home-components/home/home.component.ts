import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
/* 
  public prenom: string;
  public nom: string;
 */
  constructor(private route: ActivatedRoute) {
    /* 
    this.prenom = this.route.snapshot.paramMap.get('prenom');
    this.nom = this.route.snapshot.paramMap.get('nom');
   */
  }
}
