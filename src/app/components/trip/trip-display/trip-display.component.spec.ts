import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDisplayComponent, CancelTripDialog, DeleteTripDialog } from './trip-display.component';
import { AppComponent } from 'src/app/app.component';
import { TripListComponent } from '../trip-list/trip-list.component';
import { HeaderComponent } from '../../master/header/header.component';
import { RegisterComponent } from '../../security/register/register.component';
import { LoginComponent } from '../../security/login/login.component';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
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
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TripService } from 'src/app/services/trip.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { TripAddPhotoComponent } from '../trip-add-photo/trip-add-photo.component';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { FinderEditComponent } from '../../finder/finder-edit/finder-edit.component';
import { FinderListComponent } from '../../finder/finder-list/finder-list.component';
import { SlickModule } from 'ngx-slick';
import { OsmViewComponent } from './osm-view/osm-view.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AngularOpenlayersModule } from 'ngx-openlayers';

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

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams = {};
  get testParams() {return this._testParams;}
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  get snapshot() {
    return {params: this.testParams};
  }
}

describe('TripDisplayComponent', () => {
  let component: TripDisplayComponent;
  let fixture: ComponentFixture<TripDisplayComponent>;
  let tripService: TripService;
  let mockActivatedRoute;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();

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
        AuditsEditComponent,
        TripAddPhotoComponent,
        CheckoutComponent,
        FinderEditComponent,
        FinderListComponent,
        OsmViewComponent
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
        MatDialogModule,
        SlickModule.forRoot(),
        NgxPayPalModule,
        AngularOpenlayersModule
      ],
      providers: [AngularFireAuth, {provide: ActivatedRoute, useValue: mockActivatedRoute}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDisplayComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.testParams = {id: '5ebeb4f16ca50c0019fc6506'};
    tripService = TestBed.get(TripService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be trip to Antarctica', async (done) => {
    expect(component.trip).toBeUndefined;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.trip).not.toBeUndefined;
      expect(component.trip.title).toEqual('Vive La Antártida');
      expect(component.trip.requirements.length).toBeGreaterThanOrEqual(2);
      expect(component.trip.published).toBeTruthy();
      done();
    });
  });

  it('should be created by a manager', async (done) => {
    expect(component.trip).toBeUndefined;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.trip).not.toBeUndefined;
      expect(component.creator).not.toBeUndefined;
      expect(component.creator.role.length).toBeGreaterThanOrEqual(1);
      expect(component.creator.role).toContain('MANAGER');
      done();
    });
  });
});
