import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Lesson, LessonPost } from 'src/app/model/lesson';
import { Sheet } from 'src/app/model/sheet';
import { User, userConnected } from 'src/app/model/user';
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

  public currentDate: Date = new Date();
  public mySheetsToggle = true;
  public myLessonsToggle = true;
  public myLessonsToggleMaster = true;
  public myLessonsTogglePadawan = true;
  public inputToggle = true;

  private userID!: string;
  private userObject: Subscription;

  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private router: Router,
    private userObs: mySpaceService
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
        this.reloadComponent(true);
        console.log('Suppression réussie !');
      },(error) => {
        console.error('Erreur lors de la suppression :', error);
      }
    );


    if(deco){
      this.isConnected.logout();
    }
  }

  lessonCheck(lesson: Lesson, master: boolean){
    console.log((master) ? "MASTER" : "PADAWAN");

    const updateLesson: LessonPost = {
      user: "api/users/"+lesson.user.slug,
      sheet: "api/sheets/"+lesson.sheet.slug,
      masterValidate: (master ? !lesson.masterValidate : lesson.masterValidate),
      padawanValidate: (!master ? !lesson.padawanValidate : lesson.padawanValidate),
      bookingDateEntry: lesson.bookingDate.toString()
    }

    this.apiService.updateLesson(updateLesson, lesson.id).subscribe();

    alert('Le cours a bien été enregistré !');

    this.reloadComponent(true);
  }

  masterCheck(lesson : Lesson){
    this.lessonCheck(lesson, true);
  }

  padawanCheck(lesson : Lesson){
    this.lessonCheck(lesson, false);
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

  showMyLessonsMaster() {
    this.myLessonsToggleMaster = !this.myLessonsToggleMaster;
  }

  showMyLessonsPadawan() {
    this.myLessonsTogglePadawan = !this.myLessonsTogglePadawan;
  }

  gotoMessages(slug: string) {
    this.router.navigate([`/my-space/${slug}/messenger`]);
  }

  toDate(lesson: Lesson){
    return ( new Date(lesson.bookingDate) < this.currentDate ? true : false );
  }

  canValidate(lesson: Lesson, target: "MASTER" | "PADAWAN" | "DELETE"){

    if(target == "MASTER"){
      return this.toDate(lesson);

    }else if(target == "PADAWAN"){
      return ( lesson.padawanValidate || !(this.toDate(lesson) && lesson.masterValidate) );

    }else if(target == "DELETE"){
      return ( this.toDate(lesson) && lesson.masterValidate );

    }else{
      console.log("Y'a un BUG !!")
      return true;
    }
  }

  reloadComponent(self:boolean, urlToNavigateTo ?:string){

    //skipLocationChange:true means dont update the url to / when navigating
   const url = self ? this.router.url :urlToNavigateTo;
   this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
     this.router.navigate([`/${url}`]).then();
   });
 }
}
