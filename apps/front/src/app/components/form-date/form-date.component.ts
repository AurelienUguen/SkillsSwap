import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { LessonPost } from 'src/app/model/lesson';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent {

  localStorageId: string | null = localStorage.getItem('id');
  userSlug = localStorage.getItem('@id');
  sheetId?: string | null;

  currentDate: number = Date.now();

  form = new FormGroup({
    date: new FormControl(),
  })

  constructor(private router: Router, private apiService : ApiService, private activatedRoute: ActivatedRoute) {
    this.sheetId = this.activatedRoute.snapshot.paramMap.get('sheet');
    }

  onSubmit() {
    let userSlug = this.userSlug;

    console.log(this.form);

    if (this.localStorageId === null || !this.sheetId) {
      this.router.navigateByUrl("/login");
      return;
    }

    const newLesson:LessonPost = {
      bookingDate: this.form.value.date,
      user: `${userSlug}`,
      sheet: `/api/sheets/${this.sheetId}`
    }

    console.log(this.form.value.date);

    alert('Le cours a bien été enregistré !');

    return this.apiService.postLesson(newLesson).subscribe();

  }
}
