import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Sheet, sheetPost, updateSheet } from 'src/app/model/sheet';
import { userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-sheet-form',
  templateUrl: './sheet-form.component.html',
  styleUrls: ['./sheet-form.component.scss']
})
export class SheetFormComponent implements OnInit, OnDestroy {

  private sheetForm: Subscription;
  private slug!: string;

  sheet: Sheet[] = []
  categories: Category[] = [];
  userId = Number(localStorage.getItem('id'));
  userSlug = localStorage.getItem('@id');

  isIrlChecked = false;
  isVisioChecked = false;

  public getScreenWidth: any;
  public getScreenHeight: any;
  public form!: FormGroup;
  public updateForm!: FormGroup;

  sheetSlug?: string;
  sheetToUpdate?: Sheet;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private mySpaceObs: mySpaceService,
    private router: Router,
    private route: ActivatedRoute
    ){
      this.sheetForm = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
      });
    }

  ngOnInit() {
    this.getCategories();


    this.form = this.formBuilder.group({
      title: [null, [
        Validators.required,
        this.minLengthValidator.bind(this),
        this.maxLengthValidator.bind(this)
      ]],
      category: [null, [
        Validators.required
      ]],
      irl: [null],
      visio: [null],
      description: [null, [
        Validators.required
      ]],
      tokenPrice: [null, [
        Validators.required
      ]]
    }, {
      updateOn: 'blur'
    });

    this.updateForm = this.formBuilder.group({
      updatetitle: [null, [
        Validators.required,
        this.minLengthValidator.bind(this),
        this.maxLengthValidator.bind(this)
      ]],
      updatecategory: [null, [
        Validators.required
      ]],
      updateirl: [null],
      updatevisio: [null],
      updatedescription: [null, [
        Validators.required
      ]]
    }, {
      updateOn: 'blur'
    });

    this.sheetSlug = this.getSheetSlug();

    if (this.sheetSlug !== undefined) {
      this.getSheetBySlug(this.sheetSlug);
    }
  }

  getCategories() {
    return this.apiService.getCategories()
    .subscribe((categories: any) => this.categories = categories['hydra:member']);
  }

  getSheetSlug() {
    const slug = this.route.snapshot.paramMap.get('sheet');

    if (!slug) {
      throw new Error('Sheet slug is not defined');
    }
    return slug;
  }

  getSheetBySlug(sheetSlug: string): void {

    this.apiService.getSheetBySlug(sheetSlug)
    .subscribe((sheet: Sheet) => {
      this.sheetToUpdate = sheet;
    });
  }

  // Validators personalisés

  minLengthValidator(control: FormControl): { minLength: boolean } | null {
    const minLength = 6;
    if (control.value && control.value.length >= minLength) return null;
    return {minLength: true};
  }

  maxLengthValidator(control: FormControl): { maxLength: boolean } | null {
    const maxLength = 45;
    if (control.value && control.value.length <= maxLength) return null;
    return {maxLength: true};
  }

  // Ajout du cours en BDD

  onSubmit() {
    const newSheet: sheetPost = {
      category: `/api/categories/${this.form.value.category}`,
      title: this.form.value.title,
      user: `/api/users/${this.slug}`,
      description: this.form.value.description,
      irl: this.form.value.irl,
      visio: this.form.value.visio,
      language: ["Français"],
      tokenPrice: Number(this.form.value.tokenPrice)
    }

    this.apiService.postSheet(newSheet).subscribe();
    console.log(newSheet);

    alert('Le cours a bien été enregistré !')

    return this.router.navigateByUrl(`my-space/${this.slug}`);
  }

  onUpdate() {
    const slug = this.sheetSlug!;

    const updateSheet: updateSheet = {
      category: `/api/categories/${this.form.value.category}`,
      title: this.form.value.title,
      user: `/api/users/${this.slug}`,
      description: this.form.value.description,
      irl: this.form.value.irl,
      visio: this.form.value.visio,
      language: ["Français"],
    }

    this.apiService.updateSheet(slug, updateSheet).subscribe();

    alert('Le cours a bien été modifié!')

    return this.router.navigateByUrl(`my-space/${this.slug}`);
  }

  // Get pour les validators

  get title() {
    return this.form.get('title') as FormControl;
  }

  get category() {
    return this.form.get('category') as FormControl;
  }

  get irl() {
    return this.form.get('irl') as FormControl;
  }

  get visio() {
    return this.form.get('visio') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  ngOnDestroy() {
    this.sheetForm.unsubscribe();
  }
}
