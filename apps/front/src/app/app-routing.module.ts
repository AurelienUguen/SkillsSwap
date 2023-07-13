import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home-components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SheetComponent } from './components/sheet/sheet.component';



  const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'sheet', component: SheetComponent },
    { path: ':sheet', component: SheetDetailComponent }
    { path: 'categories', component: CategoriesComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
