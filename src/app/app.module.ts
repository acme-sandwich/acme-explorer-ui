import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { TripDisplayComponent, CancelTripDialog, DeleteTripDialog } from './components/trip/trip-display/trip-display.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/master/header/header.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterComponent } from './components/security/register/register.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './components/security/login/login.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { LocalizedDataPipe } from './components/shared/LocalizedDatePipe';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { MessageComponent } from './components/master/message/message.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { HttpModule } from '@angular/http';
import { DeniedAccessPageComponent } from './components/security/denied-access-page/denied-access-page.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { DataTablesModule } from 'angular-datatables';
import { ActorListComponent } from './components/actor/actor-list/actor-list.component';
import { ActorDisplayComponent } from './components/actor/actor-display/actor-display.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { SponsorshipDisplayComponent } from './components/sponsorship/sponsorship-display/sponsorship-display.component';
import { TripEditComponent } from './components/trip/trip-edit/trip-edit.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';
import { AuditsListComponent } from './components/audits/audits-list/audits-list.component';
import { AuditsDisplayComponent } from './components/audits/audits-display/audits-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { ActorEditComponent } from './components/actor/actor-edit/actor-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ApplicationEditComponent } from './components/application/application-edit/application-edit.component';
import { AuditsEditComponent } from './components/audits/audits-edit/audits-edit.component';
import { TripAddPhotoComponent } from './components/trip/trip-add-photo/trip-add-photo.component';

export const firebaseConfig  = {
  apiKey: "AIzaSyBuwZbbyFSAa_PlNx8asvkrVXH-41QBqhg",
  authDomain: "acme-sandwich-explorer.firebaseapp.com",
  databaseURL: "https://acme-sandwich-explorer.firebaseio.com",
  projectId: "acme-sandwich-explorer",
  storageBucket: "acme-sandwich-explorer.appspot.com",
  messagingSenderId: "806476166067",
  appId: "1:806476166067:web:2cc6135fb8f553f84711c6",
  measurementId: "G-VG730MX3T7"
};

registerLocaleData(locales, 'es');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDisplayComponent,
    CancelTripDialog,
    DeleteTripDialog,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    TranslatableComponent,
    FooterComponent,
    LocalizedDataPipe,
    HomeComponent,
    MessageComponent,
    NotFoundPageComponent,
    TermsAndConditionsComponent,
    DeniedAccessPageComponent,
    ApplicationListComponent,
    ActorListComponent,
    ActorDisplayComponent,
    SponsorshipListComponent,
    SponsorshipDisplayComponent,
    TripEditComponent,
    DashboardDisplayComponent,
    AuditsListComponent,
    AuditsDisplayComponent,
    ActorEditComponent,
    ApplicationEditComponent,
    AuditsEditComponent,
    TripAddPhotoComponent
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    FontAwesomeModule,
    HttpModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule, 
    MatDialogModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
  entryComponents: [CancelTripDialog, DeleteTripDialog]
})
export class AppModule { }
