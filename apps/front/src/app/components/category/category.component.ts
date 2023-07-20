import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Category } from 'src/app/model/category';


import { User } from 'src/app/model/user';
import { Sheet } from 'src/app/model/sheet';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  category?: Category;
  users: User[] = [];
  sheets: Sheet[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.getCategoryBySlug();
    this.getSheets();
  }

  getCategoryBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('category')!;

    this.apiService.getCategoryBySlug(slug)
      .subscribe(category => this.category = category);
  }

  getSheets() {
    return this.apiService.getSheets()
    .subscribe((sheets: any) => this.sheets = sheets['hydra:member']);
  }


  goBack(): void {
    this.location.back();
  }
}
