import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home-components/home/home.component';
import { HomeLeftComponent } from './components/home-components/home-left/home-left.component';
import { HomeRightComponent } from './components/home-components/home-right/home-right.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';
import { DatePipe } from '@angular/common';
import { FormDateComponent } from './components/form-date/form-date.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { PersonalSpaceComponent } from './components/personal-space/personal-space.component';
import { SheetFormComponent } from './components/sheet-form/sheet-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessengerComponent } from './components/messenger/messenger/messenger.component';
import { MessengerListComponent } from './components/messenger/messenger-list/messenger-list.component';
import { MessengerChatComponent } from './components/messenger/messenger-chat/messenger-chat.component';
import { UserFormUpdateComponent } from './components/user-form-update/user-form-update.component';
import { MessengerSendFormComponent } from './components/messenger/messenger-send-form/messenger-send-form.component';
import { TokkenPacksComponent } from './components/tokken-packs/tokken-packs.component';
import { StripeCongratulationComponent } from './components/stripe-congratulation/stripe-congratulation.component';
import { MessengerListDetailComponent } from './components/messenger/messenger-list-detail/messenger-list-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HeaderComponent,
    HomeComponent,
    HomeLeftComponent,
    HomeRightComponent,
    SearchBarComponent,
    SheetComponent,
    SheetDetailComponent,
    FormDateComponent,
    SignupComponent,
    SigninComponent,
    PersonalSpaceComponent,
    SheetFormComponent,
    FooterComponent,
    MessengerComponent,
    MessengerListComponent,
    MessengerListDetailComponent,
    MessengerChatComponent,
    UserFormUpdateComponent,
    MessengerSendFormComponent,
    TokkenPacksComponent,
    StripeCongratulationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
