import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

export const firebaseConfig = {
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }), HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig),],
      providers: [AngularFireAuth]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
