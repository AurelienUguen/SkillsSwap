import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component'
import { SubjectsComponent } from './components/subjects/subjects.component';
import { CoursesComponent } from './components/courses/courses.component';

import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';

import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    SubjectsComponent,
    CoursesComponent,
    CategoryComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
