import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserAuth, userConnected, userUpdate } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-user-form-update',
  templateUrl: './user-form-update.component.html',
  styleUrls: ['./user-form-update.component.scss']
})
export class UserFormUpdateComponent implements OnInit {

  private subscription: Subscription;
  public user?: User;
  public updateUserForm!: FormGroup;
  public status?: string;
  private slug!: string;
  private userID!: string;
  private mySpace: Subscription;
  private userObject: Subscription;

  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private userObs: mySpaceService,
    private router: Router,
    private formBuilder: FormBuilder
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
        this.status = status;
      });
      this.mySpace = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
      });
      this.userObject = this.userObs.getStatusObservable().subscribe((user: userConnected) => {this.userID = user.slug;});
    }

    ngOnInit(): void {
      this.getUserBySlug();

      this.updateUserForm = this.formBuilder.group({
        firstname: [null],
        lastname: [null],
        email: [null],
        plaintextPassword: [null],
        phone: [null],
        district: [null],
        city: [null],
        description: [null],
        slug: [null]
      }, {
        updateOn: 'blur'
      });

      setTimeout(() => {
        console.log(this.user);
      }, 1000);
    }

    getUserBySlug() {
      this.apiService.getUserBySlug(this.slug)
        .subscribe(user => {
          this.user = user;
        });
    }

    updateUser() {

      console.log(this.user);

      const updateUser: userUpdate = {
        roles: this.user!.roles,
        firstname: this.updateUserForm.value.firstname,
        lastname: this.updateUserForm.value.lastname,
        email: this.updateUserForm.value.email,
        plaintextPassword: 'adminUpdateProfile.911',
        phone: this.updateUserForm.value.phone,
        district: this.updateUserForm.value.district,
        city: this.updateUserForm.value.city,
        description: this.updateUserForm.value.description,
      }

      const user: UserAuth = {
        email: this.updateUserForm.value.userEmail,
        password: this.updateUserForm.value.userPassword
      }

      this.apiService.updateUser(this.userID, updateUser).subscribe(
        next => {
          this.isConnected.authentication(user);
        }
      );




      // alert('Vos changements ont été pris en compte');

    }

    reloadComponent(self:boolean,urlToNavigateTo ?:string){
      //skipLocationChange:true means dont update the url to / when navigating
     console.log("Current route I am on:",this.router.url);
     const url=self ? this.router.url :urlToNavigateTo;
     this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
       this.router.navigate([`/${url}`]).then(()=>{
         console.log(`After navigation I am on:${this.router.url}`)
       })
     })
   }



}
