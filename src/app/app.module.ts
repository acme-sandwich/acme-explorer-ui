import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/master/header/header.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterComponent } from './components/security/register/register.component';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDisplayComponent,
    HeaderComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
