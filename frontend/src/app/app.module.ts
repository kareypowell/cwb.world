import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { ApiLinkService } from './api-link.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    TermsandconditionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ApiLinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
