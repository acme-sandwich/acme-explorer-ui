import { Injectable } from '@angular/core';
import { Trip, PictureObject } from '../models/trip.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsUrl = environment.backendApiBaseURL + '/api/v1/trips';

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Devuelve el objeto Trip cuyo id coincide con el parámetro
   * @param id id del trip
   */
  getTrip(id: String){
    const url = `${this.tripsUrl}/${id}`;
    return this.http.get<Trip>(url).toPromise();
  }

  /**
   * Devuelve el objeto Actor del mánager que creó el Trip
   * @param id creador del trip (trip.creator)
   */
  getTripCreator(id: String){
    return new Promise<any>((resolve, reject) => {
      let apiURL = environment.backendApiBaseURL+'/api/v1/actors/' + id;
      this.http.get(apiURL).toPromise().then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getTrips(){
    const url = `${this.tripsUrl}`;
    return this.http.get<Trip[]>(url).toPromise();
  }

  getTripsPage(pstart: number, psize: number, keyword:string, myTrips: boolean) {
    const url = `${this.tripsUrl}`;
    let idCreator = '';
    if(myTrips){
       idCreator = this.authService.getCurrentActor()._id;
    }
    
    const parameters = {
      page: '' + pstart,
      pageSize: '' + psize,
      keyword: keyword == null ? '' : keyword,
      published: 'true',
      creator: idCreator,
    };

    if(keyword == null) {
      delete parameters.keyword;
    }

    return this.http.get<Trip[]>(url, {
      params: parameters, observe: 'body',
    }).toPromise();
  }

  updateTrip(trip: Trip) {
    const url = `${this.tripsUrl}/${trip._id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');

    const body = JSON.stringify(trip);
    
    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  createTrip(trip: Trip) {
    const url = `${this.tripsUrl}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Access-Control-Allow-Origin','*');

    const body = JSON.stringify(trip);
    
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  cancelTrip(tripId: string, reason: string) {
    const url = `${this.tripsUrl}/${tripId}/cancel`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const body = {
      "reason": reason
    };
    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  deleteTrip(tripId: string) {
    const url = `${this.tripsUrl}/${tripId}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    //return this.http.delete(url).toPromise();
    console.log('intentando borrar...');

    return new Promise<any>((resolve, reject) => {
      this.http.delete(url, httpOptions).toPromise()
        .then(res => {
          console.log(res);
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  getCreatedTrips() {
    const url = `${this.tripsUrl}`;
    let idCreator = '';

    idCreator = this.authService.getCurrentActor()._id;

    const parameters = {
      creator: idCreator,
    };

    return this.http.get<Trip[]>(url, {
      params: parameters, observe: 'body',
    }).toPromise();
  }

  addPictureToTrip(tripId: string, pictureObject: PictureObject) {
    const url = `${this.tripsUrl}/${tripId}/photos`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');

    const body = JSON.stringify(pictureObject);
    console.log(body);
    
    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  deletePictureFromTrip(tripId: string, pictureIndex: number) {
    const url = `${this.tripsUrl}/${tripId}/photos?photoIndex=${pictureIndex}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');

    return new Promise<any>((resolve, reject) => {
      this.http.delete(url, httpOptions).toPromise()
        .then(res => {
          console.log(res);
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }
}
