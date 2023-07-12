import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  users: User[] = [];
  public stockLog?: object;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: [null, [Validators.required]],
      userPassword: [null, [Validators.required]]
    })
  }

  login(){
    //console.log(this.loginForm.value);

    this.http.get<any>('https://127.0.0.1:8000/api/users').subscribe((users: any) => {
      //console.log(users['hydra:member']);

      const hydras = users['hydra:member'];
      //console.log(hydras);

      for(let i = 0;i < hydras.length;i++){
        //console.log(hydras[i]);

        if(
          this.loginForm.value.userEmail === hydras[i].email
          /*&& this.loginForm.value.userPassword === hydras[i].password*/
          ){
          //console.log("gagné"); console.log(hydras[i]);

          localStorage.setItem('connexion',"true");

          localStorage.setItem('id',hydras[i].id);
          localStorage.setItem('firstname',hydras[i].firstname);
          localStorage.setItem('lastname',hydras[i].lastname);
          localStorage.setItem('slug',hydras[i].slug);
          localStorage.setItem('district',hydras[i].district);
          localStorage.setItem('city',hydras[i].city);
          localStorage.setItem('email',hydras[i].email);
          localStorage.setItem('description',hydras[i].description);
          localStorage.setItem('password',hydras[i].password);

          this.stockLog = {
            id : localStorage.getItem('id'),
            firstname : localStorage.getItem('firstname'),
            lastname : localStorage.getItem('lastname'),
            slug : localStorage.getItem('slug'),
            district : localStorage.getItem('district'),
            city : localStorage.getItem('city'),
            email : localStorage.getItem('email'),
            description : localStorage.getItem('description'),
            password : localStorage.getItem('password')
          }
          console.log(this.stockLog);
        }
      }
      if(this.stockLog){
        console.log("Wheeeeee");
      }else{
        console.log("Nooooooo");
      }
    });






/*
    this.http.get<any>('https://127.0.0.1:8000/api/users').subscribe(res=>{

      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.userEmail && a.password === this.loginForm.value.userPassword
      });

      if(user){
        alert('Login Succesful');
        this.loginForm.reset()
      this.router.navigate(["/"])

      }else{
        alert("user not found")
      }
    });*/
  }
}
