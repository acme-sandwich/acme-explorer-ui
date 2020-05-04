import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { HomeComponent } from './components/home/home.component';
import {APP_BASE_HREF} from '@angular/common';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from './components/security/denied-access-page/denied-access-page.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { ActorListComponent } from './components/actor/actor-list/actor-list.component';
import { ActorDisplayComponent } from './components/actor/actor-display/actor-display.component';
import { SponsorshipDisplayComponent } from './components/sponsorship/sponsorship-display/sponsorship-display.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { TripEditComponent } from './components/trip/trip-edit/trip-edit.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';
import { AuditsListComponent } from './components/audits/audits-list/audits-list.component';
import { AuditsDisplayComponent } from './components/audits/audits-display/audits-display.component';
import { ActorEditComponent } from './components/actor/actor-edit/actor-edit.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'trips', children: [
    {path: 'display/:id', component: TripDisplayComponent},
    {path: 'my-trips', component: TripListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'MANAGER', myTrips:true}},
    {path: '', component: TripListComponent},
  ]},
  {path: 'applications', children: [
    {path: '', component: ApplicationListComponent },
  ]},
  {path: 'actors', children: [
    {path: 'display/:id', component: ActorDisplayComponent},
    {path: ':id/applications', component: ApplicationListComponent},
    {path: '', component: ActorListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'ADMINISTRATOR'}},
    {path: 'edit/:id', component: ActorEditComponent}
  ]},
  {path: 'sponsorships', children: [
    {path: 'new', component: SponsorshipListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: 'edit', component: SponsorshipListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: ':id', component: SponsorshipDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: '', component: SponsorshipListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}}
  ]},
  {path: 'audits', children: [
    {path: ':id', component: AuditsDisplayComponent},
    {path: '', component: AuditsListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'AUDITOR'}}
  ]},
  {path: 'dashboard', component: DashboardDisplayComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'not-found', component: NotFoundPageComponent},
  {path: 'denied-access', component: DeniedAccessPageComponent},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule { }
