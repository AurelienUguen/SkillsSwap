import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userEmail?: string;
  userPassword?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm) {
    console.log(this.userEmail);
    console.log(this.userPassword);
    console.log(form.value);
}
}
