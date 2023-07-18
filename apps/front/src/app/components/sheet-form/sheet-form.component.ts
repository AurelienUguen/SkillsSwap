import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Language } from 'src/app/model/language';
import { Sheet, sheetPost } from 'src/app/model/sheet';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sheet-form',
  templateUrl: './sheet-form.component.html',
  styleUrls: ['./sheet-form.component.scss']
})
export class SheetFormComponent implements OnInit {

  sheet: Sheet[] = []
  categories: Category[] = [];
  languages: Language[] = [];

  userId = Number(localStorage.getItem('id'));
  userSlug = localStorage.getItem('@id');


  form = new FormGroup({
    category: new FormControl(),
    title: new FormControl(),
    irl: new FormControl(),
    visio: new FormControl(),
    description: new FormControl(),
    language: new FormControl(),
  })

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.getCategories();
    this.getLanguages();
  }

  getCategories() {
    return this.apiService.getCategories()
    .subscribe((categories: any) => this.categories = categories['hydra:member']);
  }

  getLanguages() {
    return this.apiService.getLanguages()
    .subscribe((languages: any) => this.languages = languages['hydra:member']);
  }

  onSubmit() {
    console.log(this.form);

    let userSlug = this.userSlug;

    const newSheet: sheetPost = {
      category: this.form.value.category,
      title: this.form.value.title,
      user: `${userSlug}`,
      description: this.form.value.description,
      irl: this.form.value.irl,
      visio: this.form.value.visio,
      language: this.form.value.language,
    }

    console.log(newSheet);

    this.apiService.postSheet(newSheet).subscribe();



  }

}
