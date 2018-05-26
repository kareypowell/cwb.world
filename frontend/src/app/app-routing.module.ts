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
import { CalendarComponent } from './calendar/calendar.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { GroupLeadViewComponent } from './group-lead-view/group-lead-view.component';
import { SectorLeadViewComponent } from './sector-lead-view/sector-lead-view.component';
import { HostPartnerViewComponent } from './host-partner-view/host-partner-view.component';
import { SectorLeadGuard } from './guards/sector-lead.guard';
import { GroupLeadGuard } from './guards/group-lead.guard';
import { HostPartnerGuard } from './guards/host-partner.guard';

const routes: Routes = [
  {path: "",component: HomepageComponent},
  {path: "contact",component: ContactComponent},
  {path: "login",component: LoginComponent},
  {path: "register",component: RegisterComponent},
  {path: "about",component: AboutComponent},
  {path: "termsandconditions",component: TermsandconditionsComponent},
  {path: "retrievelogin",component: RetrieveLoginComponent},
  {path: "register-login",component: RegisterLoginComponent},
  {path: "member-ui",component: MemberUiComponent,canActivate:[MemberGuard],
    children: [
      { path: '', redirectTo: 'member', pathMatch: 'full' },
      { path: 'member', component: MemberViewComponent },
      { path: 'admin', component: AdminViewComponent,canActivate:[AdminGuard] },
      { path: 'group-lead', component: GroupLeadViewComponent,canActivate:[GroupLeadGuard] },
      { path: 'sector-lead', component: SectorLeadViewComponent,canActivate:[SectorLeadGuard] },
      { path: 'host-partner', component: HostPartnerViewComponent,canActivate:[HostPartnerGuard] }
    ]},
  {path: "communities",component: CommunitiesComponent},
  {path: "community",component: CommunityComponent},
  {path: "group",component: GroupComponent},
  {path: "get-involved",component: GetInvoledComponent},
  {path: "calendar",component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
