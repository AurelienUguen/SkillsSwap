import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/model/lesson';
import { Sheet } from 'src/app/model/sheet';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.scss']
})
export class PersonalSpaceComponent {

  private mySpace: Subscription;
  private slug!: string;

  public killForm!: FormGroup;
  public user?: User
  public sheets: Sheet[] = [];
  public lessons: Lesson[] = [];

  constructor(
    private apiService: ApiService,
    private mySpaceObs: mySpaceService
    ){
      this.mySpace = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
      });
    }


  ngOnInit() {
    this.getUserBySlug();
    this.getSheets();
    this.getLessons();
  }

  kill(victim: string):void{
    console.log(victim);
    this.apiService.deleteSheet(victim);
    console.log(`Ca marche pas T_T`)
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
}
