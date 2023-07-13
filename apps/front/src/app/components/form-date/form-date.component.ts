import { Component } from '@angular/core';


@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent {

  currentDate: number = Date.now();

  onSubmit() {

  }

}
