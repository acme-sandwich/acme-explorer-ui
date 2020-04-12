import { Injectable } from '@angular/core';
import { Sponsorship } from '../models/sponsorship.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {
  private sponsorshipsUrl = environment.backendApiBaseURL + '/actors/123/sponsorships';

  constructor(private http: HttpClient) { }

  getSponsorship(id: String){
    const url = `${this.sponsorshipsUrl}/${id}`;
    return this.http.get<Sponsorship>(url).toPromise();
  }
  
  getSponsorshipCreator(id: String){
    return new Promise<any>((resolve, reject) => {
      let apiURL = environment.backendApiBaseURL+'/actors/yb6ORb8';
      this.http.get(apiURL).toPromise().then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getSponsorships(){
    const url = `${this.sponsorshipsUrl}`;
    return this.http.get<Sponsorship[]>(url).toPromise();
  }
}
