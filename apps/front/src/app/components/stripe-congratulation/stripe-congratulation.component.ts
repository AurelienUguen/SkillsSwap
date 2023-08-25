import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-stripe-congratulation',
  templateUrl: './stripe-congratulation.component.html',
  styleUrls: ['./stripe-congratulation.component.scss']
})
export class StripeCongratulationComponent implements OnInit {

    users: User[] = [];

    private subscription: Subscription;
    
    public stripe?;
    public getScreenWidth: any;
    public getScreenHeight: any;
    public loginForm!: FormGroup;
    public status?: string;
    
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private isConnected: LoginService,
    ) {
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {this.status = status;});
      this.stripe = this.route.snapshot.paramMap.get('stripe');
    }
  
    ngOnInit(){
      this.stripe = this.route.snapshot.paramMap.get('stripe');
      (this.stripe === "standard" || this.stripe === "smart" || this.stripe === "genius")
      ? this.stripe = this.stripe.toLocaleUpperCase()
      : console.log("ERROR");
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
      //return this.router.navigateByUrl("");
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
  
    capitalizer(stripe: string | null){
      if(!stripe){return;}
      stripe = stripe[0].toUpperCase() + stripe.slice(1).toLowerCase();
      return stripe;
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