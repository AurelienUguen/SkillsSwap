import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';
import { HomeComponent } from './components/home-components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { SinComponent } from './components/login/sin/sin.component';



  const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'categories', component: CategoriesComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'sin', component: SinComponent },
    { path: 'sheet', component: SheetComponent },
    { path: ':sheet', component: SheetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
