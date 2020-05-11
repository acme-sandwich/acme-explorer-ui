import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TripListComponent } from './trip-list.component';
import { TripService } from 'src/app/services/trip.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { NgModule } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataTablesModule } from 'angular-datatables';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { TripDisplayComponent, CancelTripDialog, DeleteTripDialog } from '../trip-display/trip-display.component';
import { HeaderComponent } from '../../master/header/header.component';
import { RegisterComponent } from '../../security/register/register.component';
import { LoginComponent } from '../../security/login/login.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { LocalizedDataPipe } from '../../shared/LocalizedDatePipe';
import { HomeComponent } from '../../home/home.component';
import { MessageComponent } from '../../master/message/message.component';
import { NotFoundPageComponent } from '../../shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../../security/denied-access-page/denied-access-page.component';
import { ApplicationListComponent } from '../../application/application-list/application-list.component';
import { ActorListComponent } from '../../actor/actor-list/actor-list.component';
import { ActorDisplayComponent } from '../../actor/actor-display/actor-display.component';
import { SponsorshipListComponent } from '../../sponsorship/sponsorship-list/sponsorship-list.component';
import { SponsorshipDisplayComponent } from '../../sponsorship/sponsorship-display/sponsorship-display.component';
import { TripEditComponent } from '../trip-edit/trip-edit.component';
import { DashboardDisplayComponent } from '../../dashboard/dashboard-display/dashboard-display.component';
import { AuditsListComponent } from '../../audits/audits-list/audits-list.component';
import { AuditsDisplayComponent } from '../../audits/audits-display/audits-display.component';
import { ActorEditComponent } from '../../actor/actor-edit/actor-edit.component';
import { ApplicationEditComponent } from '../../application/application-edit/application-edit.component';
import { AuditsEditComponent } from '../../audits/audits-edit/audits-edit.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;
  let tripService: TripService;

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
      providers: [AngularFireAuth],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    tripService = TestBed.get(TripService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have more than 1 trips in the collection', async (done) => {
    expect(component.data).toBeUndefined;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrips').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.data.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('should have trip to Antarctica', async (done) => {
    expect(component.data).toBeUndefined;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrips').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tripAntarctica = component.data.find(trip => trip.title === 'Vive La Antártida');
      expect(tripAntarctica).not.toBeUndefined;
      expect(tripAntarctica.requirements.length).toEqual(2);
      expect(tripAntarctica.published).toBeTruthy();
      expect(tripAntarctica.startDate).toEqual('2020-07-20T22:00:00.000Z');
      done();
    });
  });
});
