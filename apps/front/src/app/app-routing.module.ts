import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
    { path: 'category', component: CategoriesComponent},
    { path: 'category/subjects/:slug', component: SubjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
