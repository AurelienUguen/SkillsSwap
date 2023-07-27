import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../../model/category';
import { User, UserAuth, UserPost } from '../../model/user';
import { Observable } from 'rxjs';
import { Sheet, sheetPost } from '../../model/sheet';
import { Lesson, LessonPost } from '../../model/lesson';



@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private domain = `api.skillswap.wip`
  private authUrl = `https://${this.domain}/auth`;
  private apiUrl = `https://${this.domain}/api`;
  private categoriesUrl = `${this.apiUrl}/categories`;
  private usersUrl = `${this.apiUrl}/users`;
  private sheetUrl = `${this.apiUrl}/sheets`;
  private lessonUrl = `${this.apiUrl}/lessons`;


  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category>(this.categoriesUrl, {withCredentials: true});
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    const url = `${this.categoriesUrl}/${slug}`;
    return this.http.get<Category>(url, {withCredentials: true});
  }

  getUsers() {
    return this.http.get<User>(this.usersUrl, {withCredentials: true});
  }

  getUserBySlug(slug: string): Observable<User> {
    const url = `${this.usersUrl}/${slug}`;
    return this.http.get<User>(url, {withCredentials: true});
  }

  getSheets() {
    return this.http.get<Sheet>(this.sheetUrl, {withCredentials: true});
  }

  getSheetBySlug(slug: string): Observable<Sheet> {
    const url = `${this.sheetUrl}/${slug}`;
    return this.http.get<Sheet>(url, {withCredentials: true});
  }

  getLessons(){
    return this.http.get<User>(this.lessonUrl, {withCredentials: true});
  }

  postSheet(sheet: sheetPost) {
    return this.http.post<sheetPost>(this.sheetUrl, sheet, {withCredentials: true});
  }

  postLesson(lesson : LessonPost) {
    return this.http.post<LessonPost>(this.lessonUrl, lesson, {withCredentials: true});
  }

  postAuth(user : UserAuth) {
    return this.http.post<UserAuth>(this.authUrl, user, {withCredentials: true});
  }

  postUser(user : UserPost) {
    return this.http.post<UserPost>(this.usersUrl, user, {withCredentials: true});
  }

  getFilteredCategory(filterParams: any): Observable<any> {
    let params = new HttpParams();
    for (const key in filterParams) {
      if (filterParams.hasOwnProperty(key)) {
        params = params.set(key, filterParams[key]);
      }
    }
    return this.http.get<any>(`${this.apiUrl}/categories`, { params, withCredentials: true });
  }

  laBroyeuse(victim: any){
    return this.http.delete<any>(victim);
  }

  laBroyeuse(victim: any){
    const cible = this.apiUrl + victim;
    return this.http.delete<any>(victim);
  }
}
