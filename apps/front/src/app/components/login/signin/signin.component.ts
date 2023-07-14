import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    private http: HttpClient,
    private router: Router,
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
