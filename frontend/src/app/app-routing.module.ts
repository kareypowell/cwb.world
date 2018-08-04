import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
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
import { MemberGuard } from './guards/member.guard';
import { AdminGuard } from './guards/admin.guard';
import { MemberViewComponent } from './member-view/member-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { GroupLeadViewComponent } from './group-lead-view/group-lead-view.component';
import { SectorLeadViewComponent } from './sector-lead-view/sector-lead-view.component';
import { HostPartnerViewComponent } from './host-partner-view/host-partner-view.component';
import { SectorLeadGuard } from './guards/sector-lead.guard';
import { GroupLeadGuard } from './guards/group-lead.guard';
import { HostPartnerGuard } from './guards/host-partner.guard';
import { AdminRoleInfoComponent } from './roleInfo/admin-role-info/admin-role-info.component';
import { HostPartnerRoleInfoComponent } from './roleInfo/host-partner-role-info/host-partner-role-info.component';
import { SectorLeadRoleInfoComponent } from './roleInfo/sector-lead-role-info/sector-lead-role-info.component';
import { GroupLeadRoleInfoComponent } from './roleInfo/group-lead-role-info/group-lead-role-info.component';
import { CompleteRegistrationDetailsComponent } from './complete-registration-details/complete-registration-details.component';
import { CreateGroupComponent } from './crud/create-group/create-group.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateEventComponent } from './crud/create-event/create-event.component';
import { EventsViewComponent } from './group-pages/events-view/events-view.component';
import { PostsComponent } from './group-pages/posts/posts.component';
import { FilesComponent } from './group-pages/files/files.component';
import { GroupHomeComponent } from './group-pages/group-home/group-home.component';
import { AllMembersComponent } from './group-pages/all-members/all-members.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent, canActivate: [] },
  { path: "register", component: RegisterComponent, canActivate: [] },
  { path: "about", component: AboutComponent },
  { path: "termsandconditions", component: TermsandconditionsComponent },
  { path: "retrievelogin", component: RetrieveLoginComponent },
  { path: "register-login", component: RegisterLoginComponent },
  {
    path: "member-ui", component: MemberUiComponent, canActivate: [MemberGuard],
    children: [
      { path: '', redirectTo: 'member', pathMatch: 'full' },
      { path: 'member', component: MemberViewComponent },
      { path: 'admin', component: AdminViewComponent, canActivate: [AdminGuard] },
      { path: 'group-lead', component: GroupLeadViewComponent, canActivate: [GroupLeadGuard] },
      { path: 'sector-lead', component: SectorLeadViewComponent, canActivate: [SectorLeadGuard] },
      { path: 'host-partner', component: HostPartnerViewComponent, canActivate: [HostPartnerGuard] },
      { path: 'adm-rl-info', component: AdminRoleInfoComponent },
      { path: 'host-rl-info', component: HostPartnerRoleInfoComponent },
      { path: 'seclead-rl-info', component: SectorLeadRoleInfoComponent },
      { path: 'grplead-rl-info', component: GroupLeadRoleInfoComponent }
    ]
  },
  { path: "communities", component: CommunitiesComponent },
  { path: "community/:id", component: CommunityComponent },
  { 
    path: "group/:id", component: GroupComponent ,
    children:[
      { path: '', component: GroupHomeComponent },
      { path: 'events', component: EventsViewComponent },
      { path: 'events/:id', component: EventsViewComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'files', component: FilesComponent },
      { path: 'all-members', component: AllMembersComponent }
    ]
  },
  { path: "get-involved", component: GetInvoledComponent },
  { path: "complete-registration", component: CompleteRegistrationDetailsComponent},
  { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
