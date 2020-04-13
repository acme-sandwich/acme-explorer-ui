import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationsUrl = environment.backendApiBaseURL + '/applications';

  constructor(private http: HttpClient) { }

  createApplications(): Application[] {
    let applications: Application[];
    let application: Application;

    applications = new Array();

    // 1st application
    application = new Application();
    application.moment = new Date('2020-03-19');
    application.status = 'PENDING';
    application.comments = ['Please, I want to go', 'I am a good person'];
    applications.push(application);

    // 2nd application
    application = new Application();
    application.moment = new Date('2020-04-01');
    application.status = 'DUE';
    application.comments = ['Please, I want to go', 'I am a good person'];
    applications.push(application);

    // 3rd application
    application = new Application();
    application.moment = new Date('2020-01-30');
    application.status = 'ACCEPTED';
    application.comments = ['Please, I want to go', 'I am a good person'];
    applications.push(application);

    // 4th application
    application = new Application();
    application.moment = new Date('2020-02-21');
    application.status = 'PENDING';
    application.comments = ['Please, I want to go', 'I am a good person'];
    applications.push(application);

    return applications;
  }

  getApplications(){
    const url = `${this.applicationsUrl}`;
    return this.http.get<Application[]>(url).toPromise();
  }
}
