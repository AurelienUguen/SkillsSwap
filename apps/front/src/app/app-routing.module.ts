import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';
import { HomeComponent } from './components/home-components/home/home.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { PersonalSpaceComponent } from './components/personal-space/personal-space.component';
import { SheetFormComponent } from './components/sheet-form/sheet-form.component';
import { CategoryComponent } from './components/category/category.component';

  const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent }
];

  const userRoutes: Routes = [
    { path: 'my-space/:user', component: PersonalSpaceComponent},
];

  const customRoutes: Routes = [
    { path: 'add-sheet', component: SheetFormComponent},
    { path: 'sheet', component: SheetComponent },
    { path: 'category/:category', component: CategoryComponent},
    { path: ':sheet', component: SheetDetailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(customRoutes), RouterModule.forRoot(userRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
