Voici mon Component HTML:

<form [formGroup]="loginForm">
  <div>
    <label for="password">Mot de passe*</label>
    <input type="text" id="password" name="userPassword" formControlName="userPassword">
    <div *ngIf="password.touched && password.invalid && password.errors">
      <ng-container *ngIf="password.errors['required']">
        Password is needed !<br>
      </ng-container>
    </div>
  </div>
  <div>
    <label for="passTest">Retaper votre mot de passe*</label>
    <input type="text" id="passTest" name="userPassTest" formControlName="userPassTest">
    <div *ngIf="passTest.touched && passTest.invalid && passTest.errors">
      <ng-container *ngIf="passTest.errors['required']">
        PassTest is needed !<br>
      </ng-container>
      <ng-container *ngIf="passTest.errors['special']">
        Les mots de passe ne correspondent pas
      </ng-container>
    </div>
  </div>
  <button type="submit" (click)="login()" [disabled]="loginForm.invalid">Connexion</button>
</form>

Et voici mon Component Script:

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public loginForm!: FormGroup;
  public status?: string;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userPassword: [null, [
        Validators.required
      ]],
      userPassTest: [null, [
        Validators.required,
        this.TestValidator.bind(this)
      ]]
    })
  }
  TestValidator(): {test: boolean} | null{
    const password = this.loginForm.get('userPassword')?.value;
    const test = this.loginForm.get('userPassTest')?.value;
    if (test !== password) return null;
    return {test: true};
  }
  login(){ }
  get password() {
    return this.loginForm.get('userPassword') as FormControl;
  }
  get passTest() {
    return this.loginForm.get('userPassTest') as FormControl;
  }
}

###################################################################################################

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public loginForm!: FormGroup;
  public status?: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userPassword: [null, [
        Validators.required
      ]],
      userPassTest: [null, [
        Validators.required
      ]]
    }, { validator: this.testValidator });
  }

  testValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('userPassword')?.value;
    const passTest = form.get('userPassTest')?.value;

    if (password !== passTest) {
      return { passwordsMismatch: true };
    }

    return null;
  }

  login() {
    // Effectue les actions souhaitées lors de la soumission du formulaire
  }

  get password() {
    return this.loginForm.get('userPassword') as FormControl;
  }

  get passTest() {
    return this.loginForm.get('userPassTest') as FormControl;
  }
}
