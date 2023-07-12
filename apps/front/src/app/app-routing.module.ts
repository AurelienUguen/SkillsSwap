import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home-components/home/home.component';



 const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'categories', component: CategoriesComponent},
    { path: 'categories/category/:category', component: CategoryComponent },
    { path: 'signin', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
