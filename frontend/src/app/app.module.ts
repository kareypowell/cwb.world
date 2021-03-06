import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { ApiLinkService } from './api-link.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MemberGuard } from './guards/member.guard';
import { AdminGuard } from './guards/admin.guard';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
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
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { CompleteRegistrationDetailsComponent } from './complete-registration-details/complete-registration-details.component';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { CreateGroupComponent } from './crud/create-group/create-group.component';
import { CreateEventComponent } from './crud/create-event/create-event.component';
import { CreateCommunityComponent } from './crud/create-community/create-community.component';
import { CreateSectorComponent } from './crud/create-sector/create-sector.component';
import { AddUserComponent } from './crud/add-user/add-user.component';
import { MakeLeadComponent } from './crud/make-lead/make-lead.component';
import { MakeAdminComponent } from './crud/make-admin/make-admin.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RequestToJoinGroupComponent } from './dialog-components/request-to-join-group/request-to-join-group.component';
import { EditProfileComponent } from './dialog-components/edit-profile/edit-profile.component';
import { PreviewProfileComponent } from './dialog-components/preview-profile/preview-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventViewComponent } from './group-pages/event-view/event-view.component';
import { EventsViewComponent } from './group-pages/events-view/events-view.component';
import { PostsComponent } from './group-pages/posts/posts.component';
import { PostComponent } from './group-pages/post/post.component';
import { FilesComponent } from './group-pages/files/files.component';
import { AllMembersComponent } from './group-pages/all-members/all-members.component';
import { GroupHomeComponent } from './group-pages/group-home/group-home.component';
import { AdminCalendarComponent } from './calendars/admin-calendar/admin-calendar.component';
import { GroupLeadCalendarComponent } from './calendars/group-lead-calendar/group-lead-calendar.component';
import { SectorLeadCalendarComponent } from './calendars/sector-lead-calendar/sector-lead-calendar.component';
import { HostPartnerCalendarComponent } from './calendars/host-partner-calendar/host-partner-calendar.component';
import { GuestHostCalendarComponent } from './calendars/guest-host-calendar/guest-host-calendar.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';
import { UpdateGroupComponent } from './crud/update-group/update-group.component';
import { UpdateEventComponent } from './crud/update-event/update-event.component';
import { UpdateCommunityComponent } from './crud/update-community/update-community.component';
import { UpdateSectorComponent } from './crud/update-sector/update-sector.component';
import { ConfirmDeleteComponent } from './crud/confirm-delete/confirm-delete.component';
import { CreateAirRmsSpaceComponent } from './crud/create-air-rms-space/create-air-rms-space.component';
import { UpdateAirRmsSpaceComponent } from './crud/update-air-rms-space/update-air-rms-space.component';
import { CreateSuperSectorComponent } from './crud/create-super-sector/create-super-sector.component';
import { UpdateSuperSectorComponent } from './crud/update-super-sector/update-super-sector.component';
import { LinebreakPipe } from './linebreak.pipe';
import { BoolPipePipe } from './pipes/bool-pipe.pipe';
import { LoginGuard } from './guards/login.guard';
import { DesignGroupHomepageComponent } from './dialog-components/design-group-homepage/design-group-homepage.component';
import { QuillModule } from 'ngx-quill';
import { BloggerComponent } from './dialog-components/blogger/blogger.component';
import { AllPostsComponent } from './group-pages/all-posts/all-posts.component';
import { GroupFileUploadComponent } from './dialog-components/group-file-upload/group-file-upload.component';
import { NgAddToCalendarModule } from '@trademe/ng-add-to-calendar';
import { CountdownComponent } from './countdown/countdown.component';
import { CountdownModule } from 'ngx-countdown';

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
    BoolPipePipe,
    AdminRoleInfoComponent,
    SectorLeadRoleInfoComponent,
    GroupLeadRoleInfoComponent,
    HostPartnerRoleInfoComponent,
    UpdateUserProfileComponent,
    CompleteRegistrationDetailsComponent,
    CreateGroupComponent,
    CreateEventComponent,
    CreateCommunityComponent,
    CreateSectorComponent,
    AddUserComponent,
    MakeLeadComponent,
    MakeAdminComponent,
    CompareValidatorDirective,
    RequestToJoinGroupComponent,
    EditProfileComponent,
    PreviewProfileComponent,
    PageNotFoundComponent,
    EventViewComponent,
    EventsViewComponent,
    PostsComponent,
    PostComponent,
    FilesComponent,
    AllMembersComponent,
    GroupHomeComponent,
    AdminCalendarComponent,
    GroupLeadCalendarComponent,
    SectorLeadCalendarComponent,
    HostPartnerCalendarComponent,
    GuestHostCalendarComponent,
    EventRegistrationComponent,
    UpdateGroupComponent,
    UpdateEventComponent,
    UpdateCommunityComponent,
    UpdateSectorComponent,
    ConfirmDeleteComponent,
    CreateAirRmsSpaceComponent,
    UpdateAirRmsSpaceComponent,
    CreateSuperSectorComponent,
    UpdateSuperSectorComponent,
    LinebreakPipe,
    DesignGroupHomepageComponent,
    BloggerComponent,
    AllPostsComponent,
    GroupFileUploadComponent,
    CountdownComponent,
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
    AngularFireStorageModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    PerfectScrollbarModule,
    MatNativeDateModule,
    MatInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    QuillModule,
    NgAddToCalendarModule,
    CountdownModule
  ],
  entryComponents:
    [ DialogComponent, UpdateCommunityComponent, UpdateEventComponent, UpdateGroupComponent, UpdateSectorComponent,
      ConfirmDeleteComponent, CreateAirRmsSpaceComponent, CreateGroupComponent, CreateEventComponent, CreateCommunityComponent,
      RequestToJoinGroupComponent, EditProfileComponent, PreviewProfileComponent, CreateSectorComponent, CreateSuperSectorComponent,
      UpdateSuperSectorComponent, UpdateAirRmsSpaceComponent, EventRegistrationComponent, DesignGroupHomepageComponent, BloggerComponent,
      GroupFileUploadComponent
    ],
  providers: [ApiLinkService, AuthService, DataTransferService, MemberGuard, LoginGuard,AdminGuard, GroupLeadGuard, HostPartnerGuard,
    SectorLeadGuard, {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
