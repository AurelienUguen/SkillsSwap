import { Component } from '@angular/core';
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
export class FormDateComponent {

  private userObject: Subscription;
  private userID!: string;

  userSlug = localStorage.getItem('@id');
  sheetID?: string | null;
  currentDate: Date = new Date();

  form = new FormGroup({
    date: new FormControl(),
  })

  constructor(
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userObs: mySpaceService
    ){
      this.userObject = this.userObs.getStatusObservable().subscribe((user: userConnected) => {this.userID = user.slug;});
      this.sheetID = this.activatedRoute.snapshot.paramMap.get('sheet');
  }

  onSubmit() {
    console.log(this.userID)
    if (this.userID === "slug") return this.router.navigateByUrl("/signin");

    const newLesson:LessonPost = {
      bookingDate: this.form.value.date,
      user: `/api/users/${this.userID}`,
      sheet: `/api/sheets/${this.sheetID}`
    }

    console.log(this.form);
    console.log(newLesson);

    alert('Le cours a bien été enregistré !');
    this.apiService.postLesson(newLesson).subscribe();
    return this.router.navigateByUrl(`my-space/${this.userID}`);
  }
}
