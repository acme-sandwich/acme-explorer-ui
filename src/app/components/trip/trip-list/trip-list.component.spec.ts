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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListComponent, TranslatableComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }), HttpClientModule, DataTablesModule, AngularFireModule.initializeApp(firebaseConfig), ], 
      providers: [AngularFireAuth],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have more than 1 trips n the collection', () => {
    expect(component.data.length).toBeGreaterThan(1);
  });


  it('should display a table with 3 rows', () => {
    const compiled = fixture.debugElement.nativeElement;
    const elements = compiled.querySelector('table').getElementsByTagName('tr');
    expect(elements.length).toBe(3);
  });

  it('should have the same trips than the ones created in the service', () => {
    const tripService = fixture.debugElement.injector.get(TripService);
    const componentTrips = component.data;
    const serviceTrips = tripService.createTrips();
    expect(componentTrips.length).toBe(serviceTrips.length);
    for(let i = 0; i < componentTrips.length; i++){
      expect(componentTrips[i].ticker).toBe(serviceTrips[i].ticker);
    }
  });

});
