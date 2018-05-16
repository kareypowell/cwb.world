import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { RetrieveLoginComponent } from './retrieve-login/retrieve-login.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { MemberUiComponent } from './member-ui/member-ui.component';
import { CommunitiesComponent } from './communities/communities.component';
import { CommunityComponent } from './community/community.component';
import { GroupComponent } from './group/group.component';
import { GetInvoledComponent } from './get-involed/get-involed.component';

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
  },
  {
    path: "register-login",
    component: RegisterLoginComponent
  },
  {
    path: "member-ui",
    component: MemberUiComponent
  },
  {
    path: "communities",
    component: CommunitiesComponent
  },
  {
    path: "community",
    component: CommunityComponent
  },
  {
    path: "group",
    component: GroupComponent
  },
  {
    path: "get-involved",
    component: GetInvoledComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
