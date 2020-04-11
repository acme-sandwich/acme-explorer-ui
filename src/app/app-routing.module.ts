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

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'trips', children: [
    {path: '', component: TripListComponent},
  ]},
  {path: 'sponsorships', children: [
    {path: 'new', component: TripListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: 'edit', component: TripListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: ':id', component: TripListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: '', component: TripListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}}
  ]},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'not-found', component: NotFoundPageComponent},
  {path: 'denied-access', component: DeniedAccessPageComponent},
  {path: '**', redirectTo: '/not-found'}
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
