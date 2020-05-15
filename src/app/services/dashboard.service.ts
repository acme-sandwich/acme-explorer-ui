import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private datawarehouseUrl = environment.backendApiBaseURL + '/api/v1/datawarehouse/latest';

  constructor(private http: HttpClient) { }

  getDatawarehouse() {
    const url = `${this.datawarehouseUrl}`;
    return this.http.get<Dashboard[]>(url).toPromise();
  }
}
