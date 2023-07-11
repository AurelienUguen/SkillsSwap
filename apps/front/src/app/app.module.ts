import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component'
import { SubjectsComponent } from './components/subjects/subjects.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeLeftComponent } from './components/home-left/home-left.component';
import { HomeRightComponent } from './components/home-right/home-right.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    SubjectsComponent,
    CoursesComponent,
    CategoryComponent,
    HeaderComponent,
    HomeComponent,
    HomeLeftComponent,
    HomeRightComponent,
    SearchBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
