import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Category } from './model/category';
import { Subject } from './model/subject';
import { Course } from './model/course';

import { Observable } from 'rxjs';
import { Lesson } from './model/lesson';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private categoriesUrl = 'https://127.0.0.1:8000/api/categories';
  private subjectsUrl = 'https://127.0.0.1:8000/api/subjects';
  private courseUrl = 'https://127.0.0.1:8000/api/courses';
  private lessonUrl = 'https://127.0.0.1:8000/api/lessons'


  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category>(this.categoriesUrl);
  }


  getCategoryBySlug(slug: string): Observable<Category> {

    const url = `${this.categoriesUrl}/${slug}`;

    return this.http.get<Category>(url);
  }

  getSubjects() {

    return this.http.get<Subject>(this.subjectsUrl);
  }

  getSubjectBySlug(slug: string): Observable<Subject> {
    const url = `${this.subjectsUrl}/${slug}`;

    return this.http.get<Subject>(url);
  }

  getCourses() {

    return this.http.get<Course>(this.courseUrl);
  }

  getCourseBySlug(slug: string): Observable<Course> {
    const url = `${this.courseUrl}/${slug}`;

    return this.http.get<Course>(url);
  }

  getLessons() {

    return this.http.get<Lesson>(this.lessonUrl);
  }

}
