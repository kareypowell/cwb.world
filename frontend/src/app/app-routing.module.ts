import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { RetrieveLoginComponent } from './retrieve-login/retrieve-login.component';

const routes: Routes = [
  {
    path:"",
    component:HomepageComponent
  },
  {
    path:"contact",
    component:ContactComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"about",
    component: AboutComponent
  },
  {
    path: "termsandconditions",
    component: TermsandconditionsComponent
  },
  {
    path: "retrievelogin",
    component: RetrieveLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
