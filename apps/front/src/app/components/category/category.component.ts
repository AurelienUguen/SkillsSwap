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
  categorySlug?: string;
  sheets:Sheet[] = [];
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {

    }

  ngOnInit(): void {
    this.categorySlug = this.getCategorySlug();

    this.getCategoryBySlug(this.categorySlug);

    setTimeout(() => {
      if(this.category) {
        this.sheets = this.getCategoryAndSubCategoriesSheets(this.category);
        console.log(this.sheets);
      }
    }, 5000);
  }

  getCategorySlug() {
    const slug = this.route.snapshot.paramMap.get('category');

    if (!slug) {
      throw new Error('Category slug is not defined');
    }
    return slug;
  }

  getCategoryBySlug(categorySlug: string): void {

    this.apiService.getCategoryBySlug(categorySlug)
    .subscribe((category: Category) => {
      this.category = category;
    });
  }

  getCategoryAndSubCategoriesSheets(category: Category): Sheet[] {
    let sheets: Sheet[] = [];

    category.categories.forEach((subCategory: Category) => {
      sheets = [...sheets, ...this.getCategoryAndSubCategoriesSheets(subCategory)];
    });

    sheets = [...sheets, ...category.sheets];

    return sheets;
  }
}
