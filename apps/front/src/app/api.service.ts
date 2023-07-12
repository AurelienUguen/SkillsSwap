import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from './model/category';
import { User } from './model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private categoriesUrl = 'https://127.0.0.1:8000/api/categories';
  private usersUrl = 'https://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) { }

  getCategories() {

    return this.http.get<Category>(this.categoriesUrl);
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    const url = `${this.categoriesUrl}/${slug}`;

    return this.http.get<Category>(url);
  }

  getUsers() {
    return this.http.get<User>(this.usersUrl);
  }

  getUserBySlug(slug: string): Observable<User> {
    const url = `${this.usersUrl}/${slug}`;

    return this.http.get<User>(url);
  }

  /* getSubjects() {

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
  } */

}
