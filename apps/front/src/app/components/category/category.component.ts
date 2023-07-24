import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Category } from 'src/app/model/category';
import { Sheet } from 'src/app/model/sheet';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  category?: Category;
  sheets:Sheet[] = [];
  sheetsFromParent: Category[] = [];
  Object = Object;


  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.getCategoryBySlug();
  }

  getCategoryBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('category')!;

    this.apiService.getCategoryBySlug(slug)
      .subscribe(category => this.category = category);

    this.getSheets();
  }

  getSheets() {
    const slug = this.route.snapshot.paramMap.get('category')!;


    this.apiService.getCategoryBySlug(slug)
    .subscribe((category: any) => this.sheets = category.sheets);


    this.apiService.getCategoryBySlug(slug)
    .subscribe((category: any) => console.log(this.sheetsFromParent = category.categories));
  }

  goBack(): void {
    this.location.back();
  }
}
