import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationsUrl = environment.backendApiBaseURL + '/api';

  constructor(private http: HttpClient) { }

  getApplications(){
    const url = `${this.applicationsUrl}/v1/my-applications`;
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplicationsByExplorer(id: String) {
    const url = `${this.applicationsUrl}/v2/my-applications?explorer=${id}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplicationsByManager(id: String) {
    const url = `${this.applicationsUrl}/v2/my-applications?manager=${id}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplication(id: String) {
    const url = `${this.applicationsUrl}/v1/applications/${id}`;
    return this.http.get<Application>(url).toPromise();
  }

  createApplication(application: Application) {
    const url = `${this.applicationsUrl}/v1/my-applications`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Access-Control-Allow-Origin','*');

    const body = JSON.stringify(application);
    
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  updateApplication(application: Application) {
    const url = `${this.applicationsUrl}/v1/applications/${application._id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    const body = JSON.stringify(application);

    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  getApplicationsByTrip(trip: Trip) {
    const url = `${this.applicationsUrl}/v1/trips/${trip._id}/applications`;
    return this.http.get<Application>(url).toPromise();
  }

  cancelApplication(application: Application) {
    const url = `${this.applicationsUrl}/v1/applications/cancel/${application._id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    const body = JSON.stringify(application);

    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  rejectApplication(application: Application) {
    const url = `${this.applicationsUrl}/v1/applications/reject/${application._id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    const body = JSON.stringify(application);

    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  dueApplication(application: Application) {
    const url = `${this.applicationsUrl}/v1/applications/due/${application._id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    const body = JSON.stringify(application);

    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }
}
