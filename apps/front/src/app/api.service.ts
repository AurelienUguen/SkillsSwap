import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Category } from './model/category';
import { Subject } from './model/subject';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private categoriesUrl = 'https://127.0.0.1:8000/api/categories';
  private subjectsUrl = 'https://127.0.0.1:8000/api/subjects';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category>(this.categoriesUrl);
  }

  getCategory(slug: string): Observable<Category> {
    const url = `${this.categoriesUrl}/${slug}`;

    return this.http.get<Category>(url);
  }

  getSubjects() {
    return this.http.get<Subject>(this.subjectsUrl);
  }

}
