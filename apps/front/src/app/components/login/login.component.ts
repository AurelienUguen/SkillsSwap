import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy  {

  users: User[] = [];
  public loginForm!: FormGroup;
  public status?: string;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService, private isConnected: LoginService) {
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
  }

  ngOnInit(): void {
    console.log(this.status);
    this.loginForm = this.formBuilder.group({
      userEmail: [null, [Validators.required]],
      userPassword: [null, [Validators.required]]
    })
  }

  login(){
    this.http.get<any>('https://127.0.0.1:8000/api/users').subscribe((users: any) => {
      const hydras = users['hydra:member'];
      for(let i = 0;i < hydras.length;i++){
        if(
          this.loginForm.value.userEmail === hydras[i].email
          /*&& this.loginForm.value.userPassword === hydras[i].password*/
          ){
            for (const prop in hydras[i]){
              localStorage.setItem(prop,hydras[i][prop]);
              console.log(localStorage.getItem(prop));
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
