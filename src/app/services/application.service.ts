import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

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
}
