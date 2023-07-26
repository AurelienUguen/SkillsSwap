import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy  {

  users: User[] = [];

  private subscription: Subscription;

  public getScreenWidth: any;
  public getScreenHeight: any;
  public loginForm!: FormGroup;
  public status?: string;

  constructor(
    private formBuilder: FormBuilder,
    private isConnected: LoginService,
    ) {
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.loginForm = this.formBuilder.group({
      userEmail: [null, [
        Validators.required,
        Validators.email
      ]],
      userPassword: [null, [
        Validators.required
      ]]
    })
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  signIn(){
    let user = {
      email : this.loginForm.value.userEmail,
      password : this.loginForm.value.userPassword
    }
    this.isConnected.authentication(user);
  }

  get password() {
    return this.loginForm.get('userPassword') as FormControl;
  }

  get email() {
    return this.loginForm.get('userEmail') as FormControl;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
