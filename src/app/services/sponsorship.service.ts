import { Injectable } from '@angular/core';
import { Sponsorship } from '../models/sponsorship.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { promise } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {
  private sponsorshipsUrl = environment.backendApiBaseURL + '/sponsorships';

  constructor(private http: HttpClient) { }

  getSponsorship(id: String){
    const url = `${this.sponsorshipsUrl}/${id}`;
    return this.http.get<Sponsorship>(url).toPromise();
  }
  
  getSponsorshipCreator(id: String){
    return new Promise<any>((resolve, reject) => {
      let apiURL = environment.backendApiBaseURL+'/actors/'+id;
      this.http.get(apiURL).toPromise().then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
  
  getSponsorshipTrips(ids: [String]){
    return new Promise<any>((resolve, reject) => {
      let promises = [];
      let trips = [];
      ids.forEach(id => {
        promises.push(new Promise<any>((resolve, reject) => {
          let apiURL = environment.backendApiBaseURL+'/trips/'+id;
          this.http.get(apiURL).toPromise().then(res => {
            trips.push(res);
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        }));
      });
      Promise.all(promises).then(() => {
        resolve(trips);
      });
    });
  }

  getSponsorships(){
    const url = `${this.sponsorshipsUrl}`;
    return this.http.get<Sponsorship[]>(url).toPromise();
  }

  getSponsorshipsSponsor(id: String){
    const url = `${this.sponsorshipsUrl}?creator=${id}`;
    return this.http.get<Sponsorship[]>(url).toPromise();
  }
}
