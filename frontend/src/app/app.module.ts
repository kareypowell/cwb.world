import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { ApiLinkService } from './api-link.service';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { DataTransferService } from './data-transfer.service';
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
import { RetrieveLoginComponent } from './retrieve-login/retrieve-login.component';
import { AuthService } from './auth-service';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { MemberUiComponent } from './member-ui/member-ui.component';
import { CommunitiesComponent } from './communities/communities.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommunityComponent } from './community/community.component';
import { GroupFilterPipe } from './group-filter.pipe';
import { GroupComponent } from './group/group.component';
import { GetInvoledComponent } from './get-involed/get-involed.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment'; 
import { AngularFireModule } from 'angularfire2';
import { MemberGuard } from './guards/member.guard';
import { AdminGuard } from './guards/admin.guard';
import { AngularFirestore , AngularFirestoreModule} from 'angularfire2/firestore';
import { CalendarModule } from 'angular-calendar';
import { CalendarComponent } from './calendar/calendar.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { SectorLeadViewComponent } from './sector-lead-view/sector-lead-view.component';
import { GroupLeadViewComponent } from './group-lead-view/group-lead-view.component';
import { HostPartnerViewComponent } from './host-partner-view/host-partner-view.component';
import { GroupLeadGuard } from './guards/group-lead.guard';
import { HostPartnerGuard } from './guards/host-partner.guard';
import { SectorLeadGuard } from './guards/sector-lead.guard';
import { DialogComponent } from './dialog/dialog.component';
import { SearchPipe } from './pipes/search.pipe';
import { AdminRoleInfoComponent } from './roleInfo/admin-role-info/admin-role-info.component';
import { SectorLeadRoleInfoComponent } from './roleInfo/sector-lead-role-info/sector-lead-role-info.component';
import { GroupLeadRoleInfoComponent } from './roleInfo/group-lead-role-info/group-lead-role-info.component';
import { HostPartnerRoleInfoComponent } from './roleInfo/host-partner-role-info/host-partner-role-info.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
 
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    TermsandconditionsComponent,
    RetrieveLoginComponent,
    RegisterLoginComponent,
    MemberUiComponent,
    CommunitiesComponent,
    HeaderComponent,
    FooterComponent,
    CommunityComponent,
    GroupFilterPipe,
    GroupComponent,
    GetInvoledComponent,
    CalendarComponent,
    MemberViewComponent,
    AdminViewComponent,
    SectorLeadViewComponent,
    GroupLeadViewComponent,
    HostPartnerViewComponent,
    DialogComponent,
    SearchPipe,
    AdminRoleInfoComponent,
    SectorLeadRoleInfoComponent,
    GroupLeadRoleInfoComponent,
    HostPartnerRoleInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    PerfectScrollbarModule
  ],
  entryComponents:[DialogComponent],
  providers: [ApiLinkService, AuthService, DataTransferService, MemberGuard, AdminGuard, GroupLeadGuard,HostPartnerGuard,
    SectorLeadGuard,{provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}],
  bootstrap: [AppComponent]
})
export class AppModule { }
