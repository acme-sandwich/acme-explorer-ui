import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ApplicationListComponent } from './application-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { DataTablesModule } from 'angular-datatables';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from '../../home/home.component';
import { LoginComponent } from '../../security/login/login.component';
import { AppComponent } from 'src/app/app.component';
import { TripListComponent } from '../../trip/trip-list/trip-list.component';
import { TripDisplayComponent, CancelTripDialog, DeleteTripDialog } from '../../trip/trip-display/trip-display.component';
import { HeaderComponent } from '../../master/header/header.component';
import { RegisterComponent } from '../../security/register/register.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { LocalizedDataPipe } from '../../shared/LocalizedDatePipe';
import { MessageComponent } from '../../master/message/message.component';
import { NotFoundPageComponent } from '../../shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from '../../master/terms-and-conditions/terms-and-conditions.component';
import { DeniedAccessPageComponent } from '../../security/denied-access-page/denied-access-page.component';
import { ActorListComponent } from '../../actor/actor-list/actor-list.component';
import { ActorDisplayComponent } from '../../actor/actor-display/actor-display.component';
import { SponsorshipListComponent } from '../../sponsorship/sponsorship-list/sponsorship-list.component';
import { SponsorshipDisplayComponent } from '../../sponsorship/sponsorship-display/sponsorship-display.component';
import { TripEditComponent } from '../../trip/trip-edit/trip-edit.component';
import { DashboardDisplayComponent } from '../../dashboard/dashboard-display/dashboard-display.component';
import { AuditsListComponent } from '../../audits/audits-list/audits-list.component';
import { AuditsDisplayComponent } from '../../audits/audits-display/audits-display.component';
import { ActorEditComponent } from '../../actor/actor-edit/actor-edit.component';
import { ApplicationEditComponent } from '../application-edit/application-edit.component';
import { AuditsEditComponent } from '../../audits/audits-edit/audits-edit.component';
import { TripAddPhotoComponent } from '../../trip/trip-add-photo/trip-add-photo.component';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { FinderListComponent } from '../../finder/finder-list/finder-list.component';
import { FinderEditComponent } from '../../finder/finder-edit/finder-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule } from '@angular/material';
import { SlickModule } from 'ngx-slick';
import { OsmViewComponent } from '../../trip/trip-display/osm-view/osm-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPayPalModule } from 'ngx-paypal';
import { GeoLocationService } from '../../trip/trip-display/osm-view/geo-location.service';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';

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

describe('ApplicationListComponent', () => {
  let component: ApplicationListComponent;
  let fixture: ComponentFixture<ApplicationListComponent>;
  let applicationService: ApplicationService;
  let mockActivatedRoute;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [AppComponent,
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
      ApplicationListComponent, TripAddPhotoComponent, CheckoutComponent, FinderEditComponent, FinderListComponent, OsmViewComponent],
      imports: [AppRoutingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }), HttpClientModule, DataTablesModule, AngularFireModule.initializeApp(firebaseConfig),RouterModule, FormsModule,
      InfiniteScrollModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      MatDialogModule,
      SlickModule.forRoot(), FontAwesomeModule, ReactiveFormsModule, NgxPayPalModule, AngularOpenlayersModule],
      providers: [AngularFireAuth, GeoLocationService, {provide: ActivatedRoute, useValue: mockActivatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationListComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.testParams = {id: '5ebec7c06ca50c0019fc6522'};
    applicationService = TestBed.get(ApplicationService);
    localStorage.setItem('currentActor', JSON.stringify({
      role: ["EXPLORER"],
      banned: false,
      _id: "5ebec7c06ca50c0019fc6522",
      name: "Explorador",
      surname: "Guerrero",
      email: "explorer1@mail.com",
      phone: "7868231",
      address: "explorer street",
    }));
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.setItem('currentActor', '');
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have more than 1 application in the collection', async (done) => {
    expect(component.data).toBeUndefined;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(applicationService, 'getApplicationsByExplorer').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.data.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('should have application to trip to Antarctica', async (done) => {
    expect(component.data).toBeUndefined;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(applicationService, 'getApplicationsByExplorer').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const appAntarctica = component.data.find(application => application.trip === '5ebeb4f16ca50c0019fc6506');
      expect(appAntarctica).not.toBeUndefined;
      expect(appAntarctica.comments.length).toBeGreaterThanOrEqual(1);
      expect(appAntarctica.explorer).toEqual('5ebec7c06ca50c0019fc6522');
      expect(appAntarctica.status).toEqual('PENDING');
      done();
    });
  });
});
