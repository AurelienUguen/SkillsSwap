import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent {

  localStorageId: string | null = localStorage.getItem('id');

  currentDate: number = Date.now();

  constructor(private router: Router) {

  }

  onSubmit() {
    let connectedUserId: number;

    if (this.localStorageId !== null) {
      connectedUserId = parseInt(this.localStorageId);
    } else {
      this.router.navigateByUrl("/login");
    }


  }
}
