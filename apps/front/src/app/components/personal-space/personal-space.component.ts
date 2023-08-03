import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/model/lesson';
import { Sheet } from 'src/app/model/sheet';
import { User, userConnected, userUpdate } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.scss']
})
export class PersonalSpaceComponent implements OnInit {

  private subscription: Subscription;
  private mySpace: Subscription;
  private slug!: string;

  public status?: string;
  public user?: User;
  public sheets: Sheet[] = [];
  public lessons: Lesson[] = [];

  public mySheetsToggle = true;
  public myLessonsToggle = true;
  public inputToggle = true;

  private userID!: string;
  private userObject: Subscription;

  public updateUserForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private router: Router,
    private userObs: mySpaceService,
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


  ngOnInit() {
    this.getUserBySlug();
    this.getSheets();
    this.getLessons();


    setTimeout(() => {
      console.log(this.user);
    }, 1000);
  }

  kill(
    url: string,
    victim: string | number,
    deco: boolean = false
  ):void{
    const target = `https://api.skillswap.wip/api/${url}/${victim}`;

    this.apiService.laBroyeuse(target).subscribe(
      () => {
        alert(`${victim} a été supprimé avec succès`);
        console.log('Suppression réussie !');
      },(error) => {
        console.error('Erreur lors de la suppression :', error);
      }
    );

    if(deco){
      this.isConnected.logout();
    }
  }

  getUserBySlug() {
    this.apiService.getUserBySlug(this.slug)
      .subscribe(user => {
        this.user = user;
      });
  }

  getSheets() {
    return this.apiService.getSheets()
    .subscribe((sheets: any) => this.sheets = sheets['hydra:member']);
  }

  getLessons() {
    return this.apiService.getLessons()
    .subscribe((lessons: any) => this.lessons = lessons['hydra:member']);
  }

  showMySheets() {
    this.mySheetsToggle= !this.mySheetsToggle;
  }

  showMyLessons() {
    this.myLessonsToggle = !this.myLessonsToggle;
  }

  addDescriptionToggle() {
    this.inputToggle = !this.inputToggle;
  }


}
