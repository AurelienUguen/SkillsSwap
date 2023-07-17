import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';
import { HomeComponent } from './components/home-components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { PersonalSpaceComponent } from './components/personal-space/personal-space.component';



  const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'categories', component: CategoriesComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
];

const userRoutes: Routes = [
  { path: 'my-space/:user', component: PersonalSpaceComponent},
];

  const customRoutes: Routes = [
    { path: 'sheet', component: SheetComponent },
    { path: ':sheet', component: SheetDetailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(customRoutes), RouterModule.forRoot(userRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
