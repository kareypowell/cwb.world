import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path:"",
    component:HomepageComponent
  },
  {
    path:"contact",
    component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
