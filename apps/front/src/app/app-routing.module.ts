import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './components/subjects/subjects.component';

const routes: Routes = [
    { path: 'subjects/:id', component: SubjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
