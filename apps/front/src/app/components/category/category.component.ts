import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/model/category';

import { Subject } from 'src/app/model/subject';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  category!: Category;
  subjects: Subject[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.getCategoryBySlug();

    this.getSubjects();
  }

  getCategoryBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('category')!;

    this.apiService.getCategoryBySlug(slug)
      .subscribe(category => this.category = category);
  }

  getSubjects() {
    return this.apiService.getSubjects()
    .subscribe((subjects: any) => this.subjects = subjects['hydra:member']);
  }

  goBack(): void {
    this.location.back();
  }
}
