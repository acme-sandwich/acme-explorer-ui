import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Audit } from '../models/audit.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuditsService {

  private auditsUrl = environment.backendApiBaseURL + '/api/v1/audits';

  constructor(private http: HttpClient, private authService: AuthService) {

   }

   getAudit(auditId: String, actorId: String){
    const url = `${environment.backendApiBaseURL}/api/v1/actors/${actorId}/audits/${auditId}`;
    return this.http.get<Audit>(url).toPromise();
  }

  getAuditCreator(id: String){
    return new Promise<any>((resolve, reject) => {
      let apiURL = environment.backendApiBaseURL+'/api/v1/actors/' + id;
      this.http.get(apiURL).toPromise().then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getAuditTrip(id: String){
    return new Promise<any>((resolve, reject) => {
      let apiURL = environment.backendApiBaseURL+'/api/v1/trips/' + id;
      this.http.get(apiURL).toPromise().then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getAudits(){
    const url = `${this.auditsUrl}`;
    return this.http.get<Audit[]>(url).toPromise();
  }

  getAuditsAuditor(idActor: String){
    const url = `${environment.backendApiBaseURL}/api/v1/actors/${idActor}/audits`;
    return this.http.get<Audit[]>(url).toPromise();
  }

  getAuditsTrip(idTrip: String){
    const url = `${environment.backendApiBaseURL}/api/v1/trips/${idTrip}/audits`;
    return this.http.get<Audit[]>(url).toPromise();
  }
}
