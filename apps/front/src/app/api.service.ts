import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Category } from './model/category';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private categoriesUrl = 'https://127.0.0.1:8000/api/categories';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category>(this.categoriesUrl);
  }

}
