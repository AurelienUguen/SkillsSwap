import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api.service';

import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];


  constructor(private apiService: ApiService, private location: Location) {

  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    return this.apiService.getCategories()
    .subscribe((categories: any) => this.categories = categories['hydra:member']);
  }

  goBack(): void {
    this.location.back();
  }
}
