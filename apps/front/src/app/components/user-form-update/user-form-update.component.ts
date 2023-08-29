import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public userSlug!: string;
  private userID!: string;
  private mySpace: Subscription;
  private userObject: Subscription;

  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private userObs: mySpaceService,
    private route: ActivatedRoute,
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
      this.userSlug = this.getUserSlug();
      this.getUserBySlug(this.userSlug);

      this.updateUserForm = this.formBuilder.group({
        firstname: [null],
        lastname: [null],
        email: [null],
        phone: [null],
        district: [null],
        city: [null],
        description: [null],
        slug: [null],
        currentPassword: [null,
          [Validators.required]]
      }, {
        updateOn: 'blur'
      });
    }

   /*  passwordValidator(control: FormControl): { password: boolean } | null {

      if(this.user) {
        if(control.value === this.user.password) return null;
        return {password: true};
      }
      return {password: true};
    } */

    getUserSlug() {
      const slug = this.route.snapshot.paramMap.get('user');

      if (!slug) {
        throw new Error('Sheet slug is not defined');
      }
      return slug;
    }

    getUserBySlug(userSlug: string): void {

      this.apiService.getUserBySlug(userSlug)
      .subscribe((user: User) => {
        this.user = user;
      });
    }

    updateUser() {

      const updateUser: userUpdate = {
        tokken:0,
        roles: this.user!.roles,
        firstname: this.updateUserForm.value.firstname,
        lastname: this.updateUserForm.value.lastname,
        email: this.updateUserForm.value.email,
        phone: this.updateUserForm.value.phone,
        district: this.updateUserForm.value.district,
        city: this.updateUserForm.value.city,
        description: this.updateUserForm.value.description,
        plaintextPassword: 'adminUpdateProfile.911',
      }

      const user: UserAuth = {
        email: this.updateUserForm.value.email,
        password: this.updateUserForm.value.currentPassword
      }

      this.apiService.updateUser(this.userID, updateUser).subscribe(
        next => {
          this.isConnected.authentication(user);
        }
      );
      alert('Vos changements ont été pris en compte');
    }

    get currentPassword() {
      return this.updateUserForm.get('currentPassword') as FormControl;
    }
}
