import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripAddPhotoComponent } from './trip-add-photo.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from 'src/app/app.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule } from '@angular/material';
import { SlickModule } from 'ngx-slick';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPayPalModule } from 'ngx-paypal';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { TripListComponent } from '../trip-list/trip-list.component';
import { TripDisplayComponent, CancelTripDialog, DeleteTripDialog, DeleteImageDialog } from '../trip-display/trip-display.component';
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
import { CheckoutComponent } from '../../checkout/checkout.component';
import { FinderEditComponent } from '../../finder/finder-edit/finder-edit.component';
import { FinderListComponent } from '../../finder/finder-list/finder-list.component';
import { OsmViewComponent } from '../trip-display/osm-view/osm-view.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanDeactivateService } from 'src/app/services/can-deactivate.service';
import { AppComponent } from 'src/app/app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('TripAddPhotoComponent', () => {
  let component: TripAddPhotoComponent;
  let fixture: ComponentFixture<TripAddPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripAddPhotoComponent, TranslatableComponent,
        TripListComponent,
        TripDisplayComponent,
        CancelTripDialog,
        DeleteTripDialog,
        HeaderComponent,
        RegisterComponent,
        LoginComponent,
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
        CheckoutComponent, 
        FinderEditComponent, 
        FinderListComponent, 
        OsmViewComponent ],
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
      providers: [AngularFireAuth, CanDeactivateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripAddPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
