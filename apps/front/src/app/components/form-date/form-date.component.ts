import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LessonPost } from 'src/app/model/lesson';


@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent {

  localStorageId: string | null = localStorage.getItem('id');
  sheetId?: string | null;

  currentDate: number = Date.now();

  form = new FormGroup({
    date: new FormControl(null),
  })

  constructor(private router: Router, private apiService : ApiService, private activatedRoute: ActivatedRoute) {
    this.sheetId = this.activatedRoute.snapshot.paramMap.get('sheet');
    }


  onSubmit() {
    let connectedUserId: number;
    const userSlug = localStorage.getItem('slug');

    console.log(this.form);

    if (this.localStorageId === null || !this.sheetId) {
      this.router.navigateByUrl("/login");
      return;
    }

    connectedUserId = parseInt(this.localStorageId);

    const newLesson:LessonPost = {
      user: `${userSlug}`,
      sheet: `/api/sheets/${this.sheetId}`
    }

    console.log(connectedUserId);
    console.log(this.sheetId);

    this.apiService.postLesson(newLesson).subscribe();


  }
}
