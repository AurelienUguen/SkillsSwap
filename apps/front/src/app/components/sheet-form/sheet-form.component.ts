import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Sheet, sheetPost } from 'src/app/model/sheet';
import { userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-sheet-form',
  templateUrl: './sheet-form.component.html',
  styleUrls: ['./sheet-form.component.scss']
})
export class SheetFormComponent implements OnInit {

  private sheetForm: Subscription;
  private slug!: string;

  sheet: Sheet[] = []
  categories: Category[] = [];
  userId = Number(localStorage.getItem('id'));
  userSlug = localStorage.getItem('@id');

  isIrlChecked = false;
  isVisioChecked = false;

  form = new FormGroup({
    category: new FormControl(),
    title: new FormControl(),
    irl: new FormControl(),
    visio: new FormControl(),
    description: new FormControl(),
    language: new FormControl(),
  })

  constructor(
    private apiService: ApiService,
    private mySpaceObs: mySpaceService,
    private router: Router
    ){
      this.sheetForm = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
      });
    }

  ngOnInit() {
    console.log(this.slug);
    this.getCategories();
  }

  getCategories() {
    return this.apiService.getCategories()
    .subscribe((categories: any) => this.categories = categories['hydra:member']);
  }

  onSubmit() {
    const newSheet: sheetPost = {
      category: `/api/categories/${this.form.value.category}`,
      title: this.form.value.title,
      user: `/api/users/${this.slug}`,
      description: this.form.value.description,
      irl: this.form.value.irl,
      visio: this.form.value.visio,
      language: ["Français"],
    }
    this.apiService.postSheet(newSheet).subscribe();
    console.log(newSheet);
    alert('Le cours a bien été enregistré !')
    return this.router.navigateByUrl(`my-space/${this.slug}`);
  }
}
