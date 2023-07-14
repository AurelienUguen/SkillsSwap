import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Category } from 'src/app/model/category';


import { User } from 'src/app/model/user';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  category!: Category;
  users: User[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.getCategoryBySlug();

    this.getUsers();
   /*  this.getSubjects(); */
  }

  getCategoryBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('category')!;

    this.apiService.getCategoryBySlug(slug)
      .subscribe(category => this.category = category);
  }

  getUsers() {
    return this.apiService.getUsers()
    .subscribe((users: any) => this.users = users['hydra:member']);
  }

  /* getSubjects() {
    return this.apiService.getSubjects()
    .subscribe((subjects: any) => this.subjects = subjects['hydra:member']);
  } */

  goBack(): void {
    this.location.back();
  }
}
