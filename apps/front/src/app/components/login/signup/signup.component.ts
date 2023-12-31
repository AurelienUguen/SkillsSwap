import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { User, UserAuth, UserPost } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy  {

  users: User[] = [];
  //regexPassword!: RegExp;
  regexUppercase!: RegExp;
  regexLowercase!: RegExp;
  regexDigits!: RegExp;
  regexSpecial!: RegExp;
  regexLength!: RegExp;
  regexWhitespace!: RegExp;

  private subscription: Subscription;

  public getScreenWidth: any;
  public getScreenHeight: any;

  public loginForm!: FormGroup;
  public status?: string;

  constructor(
    private formBuilder: FormBuilder,
    private isConnected: LoginService,
    private apiService : ApiService
    ) {
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
  }

  ngOnInit(): void {

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    //this.regexPassword = /^(?!.*\s)+(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&^*+-=_\;:,.(){}<>]).{8,}/;

    this.regexUppercase = /(?=.*[A-Z]).{1,}/;
    this.regexLowercase = /(?=.*[a-z]).{1,}/;
    this.regexDigits = /(?=.*\d).{1,}/;
    this.regexSpecial = /(?=.*[!@#$%&^*+\-=_\;:,.(){}<>]).{1,}/;
    this.regexWhitespace = /^(?!.* ).{1,}/;

    this.loginForm = this.formBuilder.group({
      userLastname: [null, [
        Validators.required
      ]],
      userFirstname: [null, [
        Validators.required
      ]],
      userCity: [null],
      userDistrict: [null],
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
        this.specialValidator.bind(this),
        this.whitespaceValidator.bind(this)
      ]],
      userPassTest: [null, [
        Validators.required,
        //this.testValidator.bind(this)
      ]]
    }, {
      updateOn: 'blur'
    });
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
  whitespaceValidator(control: FormControl): {whitespace: true} | null{
    if (this.regexWhitespace.test(control.value)) return null;
    return {whitespace: true};
  }
  testValidator(): {test: boolean} | null{
    const password = this.loginForm.get('userPassword')?.value;
    const passtest = this.loginForm.get('userPassTest')?.value;
    if (passtest === password) return null;
    return {test: true};
  }

  signUp(){
    const newUser: UserPost = {
      roles:["ROLE_USER"],
      firstname: this.loginForm.value.userFirstname,
      lastname: this.loginForm.value.userLastname,
      email: this.loginForm.value.userEmail,
      phone: "+00000000000",
      plaintextPassword: this.loginForm.value.userPassword,
      district: 75,
      city: "Somewhere on earth",
      description: "No Description yet"
    }
    console.log (newUser);
    const user: UserAuth = {
      email: this.loginForm.value.userEmail,
      password: this.loginForm.value.userPassword
    }
    this.apiService.postUser(newUser).subscribe(
      next => {
        this.isConnected.authentication(user);
      }
    );
  }

  get lastname() {
    return this.loginForm.get('userLastname') as FormControl;
  }

  get firstname() {
    return this.loginForm.get('userFirstname') as FormControl;
  }

  get email() {
    return this.loginForm.get('userEmail') as FormControl;
  }

  get phone() {
    return this.loginForm.get('userPhone') as FormControl;
  }

  get password() {
    return this.loginForm.get('userPassword') as FormControl;
  }

  get passTest() {
    return this.loginForm.get('userPassTest') as FormControl;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
