import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { TripDisplayComponent, CancelTripDialog, DeleteTripDialog } from './components/trip/trip-display/trip-display.component';
import { HeaderComponent } from './components/master/header/header.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { LocalizedDataPipe } from './components/shared/LocalizedDatePipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import locales from '@angular/common/locales/es';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { ActorDisplayComponent } from './components/actor/actor-display/actor-display.component';
import { ActorListComponent } from './components/actor/actor-list/actor-list.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { SponsorshipDisplayComponent } from './components/sponsorship/sponsorship-display/sponsorship-display.component';
import { AuditsListComponent } from './components/audits/audits-list/audits-list.component';
import { AuditsDisplayComponent } from './components/audits/audits-display/audits-display.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { DeniedAccessPageComponent } from './components/security/denied-access-page/denied-access-page.component';
import { MessageComponent } from './components/master/message/message.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DataTablesModule } from 'angular-datatables';
import { TripEditComponent } from './components/trip/trip-edit/trip-edit.component';
import { ActorEditComponent } from './components/actor/actor-edit/actor-edit.component';
import { ApplicationEditComponent } from './components/application/application-edit/application-edit.component';
import { AuditsEditComponent } from './components/audits/audits-edit/audits-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule } from '@angular/material';

registerLocaleData(locales, 'es');

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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        AuditsEditComponent
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
      providers: [AngularFireAuth]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'acme-explorer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('acme-explorer');
  });
});
