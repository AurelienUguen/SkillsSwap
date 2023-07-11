import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';



 const routes: Routes = [
    { path: 'categories', component: CategoriesComponent},
    { path: 'categories/category/:category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
