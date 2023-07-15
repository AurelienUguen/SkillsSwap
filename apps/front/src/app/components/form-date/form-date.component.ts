import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { LessonPost } from 'src/app/model/lesson';
import '@angular/common/locales/global/fr';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent implements OnInit {

  userSlug = localStorage.getItem('@id');
  sheetId?: string | null;
  currentDate: Date = new Date();

  form = new FormGroup({
    date: new FormControl(),
  })

  constructor(private router: Router, private apiService : ApiService, private activatedRoute: ActivatedRoute) {
    this.sheetId = this.activatedRoute.snapshot.paramMap.get('sheet');
  }

  ngOnInit(){
    console.log(localStorage.getItem('id'));
  }

  onSubmit() {
    //console.log(this.form);
    let userSlug = this.userSlug;

    if (!localStorage.getItem('id') || !this.sheetId) {
      this.router.navigateByUrl("/signin");
      return;
    }

    const newLesson:LessonPost = {
      bookingDate: this.form.value.date,
      user: `${userSlug}`,
      sheet: `/api/sheets/${this.sheetId}`
    }

    console.log(newLesson);

    alert('Le cours a bien été enregistré !');
    return this.apiService.postLesson(newLesson).subscribe();
  }
}
