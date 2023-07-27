import { Component, OnInit } from '@angular/core';
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
export class PersonalSpaceComponent implements OnInit {

  private mySpace: Subscription;
  private slug!: string;

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

  kill(url: string, victim: string | number):void{
    const target = `https://api.skillswap.wip/api/${url}/${victim}`;
    this.apiService.laBroyeuse(target).subscribe(
      () => {
        console.log('Suppression réussie !');
      },(error) => {
        console.error('Erreur lors de la suppression :', error);
      }
    );
        console.log(target);
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
