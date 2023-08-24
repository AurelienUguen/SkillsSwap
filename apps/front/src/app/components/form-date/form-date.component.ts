import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { LessonPost } from 'src/app/model/lesson';
import '@angular/common/locales/global/fr';
import { userConnected } from 'src/app/model/user';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent implements OnInit {

  private userObject: Subscription;
  private userID!: string;

  public userSlug = localStorage.getItem('@id');
  public sheetID?: string | null;
  public currentDate: Date = new Date();

  public form = new FormGroup({date: new FormControl()})

  constructor(
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userObs: mySpaceService
    ){
      this.userObject = this.userObs.getStatusObservable().subscribe((user: userConnected) => {this.userID = user.slug;});
      this.sheetID = this.activatedRoute.snapshot.paramMap.get('sheet');
  }

  ngOnInit(){
    console.log(this.sheetID);
  }

  onSubmit() {
    if (this.userID === "slug") return this.router.navigateByUrl("/signin");

    const newLesson:LessonPost = {
      user: `/api/users/${this.userID}`,
      sheet: `/api/sheets/${this.sheetID}`,
      bookingDateEntry: this.form.value.date,
      masterValidate: false,
      padawanValidate: false
    }

    this.apiService.postLesson(newLesson).subscribe();

    alert('Le cours a bien été enregistré !');

    return this.router.navigateByUrl(`my-space/${this.userID}`);
  }
}
