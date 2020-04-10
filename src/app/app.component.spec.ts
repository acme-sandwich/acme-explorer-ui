import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
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
      imports: [FormsModule, AppRoutingModule, ReactiveFormsModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      FontAwesomeModule,
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      ],
      declarations: [
        AppComponent, TripListComponent, TripDisplayComponent, HeaderComponent, FooterComponent, HomeComponent, LoginComponent, 
        RegisterComponent, LocalizedDataPipe, TranslatableComponent
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
