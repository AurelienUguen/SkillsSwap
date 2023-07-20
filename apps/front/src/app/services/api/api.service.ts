import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../../model/category';
import { User, UserPost } from '../../model/user';
import { Observable } from 'rxjs';
import { Sheet, sheetPost } from '../../model/sheet';
import { LessonPost } from '../../model/lesson';



@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = 'https://127.0.0.1:8000/api';
  private categoriesUrl = 'https://127.0.0.1:8000/api/categories';
  private usersUrl = 'https://127.0.0.1:8000/api/users';
  private sheetUrl = 'https://127.0.0.1:8000/api/sheets';
  private lessonUrl = 'https://127.0.0.1:8000/api/lessons';


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

  getSheets() {

    return this.http.get<Sheet>(this.sheetUrl);
  }

  getSheetBySlug(slug: string): Observable<Sheet> {
    const url = `${this.sheetUrl}/${slug}`;

    return this.http.get<Sheet>(url);
  }

  getLessons(){
    return this.http.get<User>(this.lessonUrl);
  }

  postSheet(sheet: sheetPost) {
    return this.http.post<sheetPost>(this.sheetUrl, sheet);
  }

  postLesson(lesson : LessonPost) {
    return this.http.post<LessonPost>(this.lessonUrl, lesson);
  }

  postUser(user : UserPost) {
    return this.http.post<UserPost>(this.usersUrl, user);
  }

  getFilteredCategory(filterParams: any): Observable<any> {

    let params = new HttpParams();

    for (const key in filterParams) {
      if (filterParams.hasOwnProperty(key)) {
        params = params.set(key, filterParams[key]);
      }
    }

    return this.http.get<any>(`${this.apiUrl}/categories`, { params });
  }
}
