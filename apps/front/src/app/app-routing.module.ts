import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';
import { HomeComponent } from './components/home-components/home/home.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { PersonalSpaceComponent } from './components/personal-space/personal-space.component';
import { SheetFormComponent } from './components/sheet-form/sheet-form.component';
import { CategoryComponent } from './components/category/category.component';
import { MessengerComponent } from './components/messenger/messenger/messenger.component';
import { UserFormUpdateComponent } from './components/user-form-update/user-form-update.component';
import { TokkenPacksComponent } from './components/tokken-packs/tokken-packs.component';
import { StripeCongratulationComponent } from './components/stripe-congratulation/stripe-congratulation.component';

  const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'stripe/:stripe', component: StripeCongratulationComponent},
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent }
];

  const userRoutes: Routes = [
    { path: 'my-space/:user', component: PersonalSpaceComponent},
    { path: 'update/:user', component: UserFormUpdateComponent},
    { path: 'tokken/:user', component: TokkenPacksComponent},

];
  const messengerRoutes: Routes = [
    { path: 'my-space/:user/messenger', component: MessengerComponent},
];

  const customRoutes: Routes = [
    { path: 'add-sheet', component: SheetFormComponent},
    { path: 'sheet-update/:sheet', component: SheetFormComponent},
    { path: 'category/:category', component: CategoryComponent},
    { path: ':sheet', component: SheetDetailComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(customRoutes), RouterModule.forRoot(userRoutes), RouterModule.forRoot(messengerRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
