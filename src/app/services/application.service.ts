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

  getApplications(){
    const url = `${this.applicationsUrl}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplicationsByExplorer(id: String) {
    const url = `${this.applicationsUrl}?explorer=${id}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  getApplicationsByManager(id: String) {
    const url = `${this.applicationsUrl}?manager=${id}`;
    return this.http.get<Application[]>(url).toPromise();
  }
}
