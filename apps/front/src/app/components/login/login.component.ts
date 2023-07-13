import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy  {

  users: User[] = [];
  //regexPassword!: RegExp;
  regexUppercase!: RegExp;
  regexLowercase!: RegExp;
  regexDigits!: RegExp;
  regexSpecial!: RegExp;
  regexLength!: RegExp;

  private subscription: Subscription;

  public getScreenWidth: any;
  public getScreenHeight: any;

  public loginForm!: FormGroup;
  public status?: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService, private isConnected: LoginService) {
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
  }

  ngOnInit(): void {

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    //this.regexPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&^*+-=_\;:,.(){}<>]).{8,}/;

    this.regexUppercase = /(?=.*[A-Z]).{1,}/;
    this.regexLowercase = /(?=.*[a-z]){1,}/;
    this.regexDigits = /(?=.*\d).{1,}/;
    this.regexSpecial = /(?=.*[!@#$%&^*+-=_\;:,.(){}<>]).{1,}/;

    this.loginForm = this.formBuilder.group({
      userEmail: [null, [
        Validators.required,
        Validators.email
      ]],
      userPassword: [null, [
        Validators.required,
        //Validators.pattern(this.regexPassword),
        this.minLengthValidator.bind(this),
        this.uppercaseValidator.bind(this),
        this.lowercaseValidator.bind(this),
        this.digitsValidator.bind(this),
        this.specialValidator.bind(this)
      ]]
    })
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  minLengthValidator(control: FormControl): { minLength: boolean } | null {
    const minLength = 8;
    if (control.value && control.value.length >= minLength) return null;
    return {minLength: true};
  }
  uppercaseValidator(control: FormControl): {uppercase: boolean} | null{
    if (this.regexUppercase.test(control.value)) return null;
    return {uppercase: true};
  }
  lowercaseValidator(control: FormControl): {lowercase: boolean} | null{
    if (this.regexLowercase.test(control.value)) return null;
    return {lowercase: true};
  }
  digitsValidator(control: FormControl): {digits: boolean} | null{
    if (this.regexDigits.test(control.value)) return null;
    return {digits: true};
  }
  specialValidator(control: FormControl): {special: boolean} | null{
    if (this.regexSpecial.test(control.value)) return null;
    return {special: true};
  }

  login(){
    this.http.get<any>('https://127.0.0.1:8000/api/users').subscribe((users: any) => {
      const hydras = users['hydra:member'];
      for(let i = 0;i < hydras.length;i++){
        if(this.loginForm.value.userEmail === hydras[i].email/* &&
           this.loginForm.value.userPassword === hydras[i].password*/){
          for (const prop in hydras[i]){
            localStorage.setItem(prop,hydras[i][prop]);
          }
        }
      }
      if(localStorage.getItem('id')){
        console.log("Wheeeeee");
        this.isConnected.updateStatus("connected");
        this.router.navigateByUrl("/");
      }else{
        console.log("Nooooooo");
      }
    });
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
