import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
    { path: 'categories', component: CategoriesComponent},
    { path: 'categories/category/:category', component: CategoryComponent },
    { path: 'categories/category/:category/subject/:subject', component: SubjectsComponent },
    { path: 'categories/category/:category/subject/:subject/course/:course', component: CoursesComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
