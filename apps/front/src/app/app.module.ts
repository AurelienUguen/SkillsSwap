import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component'
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home-components/home/home.component';
import { HomeLeftComponent } from './components/home-components/home-left/home-left.component';
import { HomeRightComponent } from './components/home-components/home-right/home-right.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';
import { DatePipe } from '@angular/common';
import { FormDateComponent } from './components/form-date/form-date.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SinComponent } from './components/login/sin/sin.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryComponent,
    HeaderComponent,
    HomeComponent,
    HomeLeftComponent,
    HomeRightComponent,
    SearchBarComponent,
    SheetComponent,
    SheetDetailComponent,
    FormDateComponent,
    SignupComponent,
    SigninComponent,
    SinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
