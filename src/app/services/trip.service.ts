import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
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

  createTrips(): Trip[] {
    let trips: Trip[];
    let trip: Trip;

    trips = new Array();
    // Trip 1
    trip = new Trip();
    trip.ticker = '170320-ABCD';
    trip.title = 'Swim with sharks in Huelva!';
    trip.description = 'Enjoy a 2 hour swimming experience around sharks and other marine creatures in the beach of Huelva!';
    trip.price = 273;
    trip.requirements = ['Can swim', 'Passion for new experiences'];
    trip.startDate = new Date('2020-07-15');
    trip.endDate = new Date('2020-07-16');
    //trip.picture = 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials'
      + '-images.forbesimg.com%2Fdam%2Fimageserve%2F1004792742%2F960x0.jpg';
    trip.cancelled = false;
    trip.cancelledReason = null;
    trip.creator = "yb6ORb8";
    trips.push(trip);
    // Trip 2
    trip = new Trip();
    trip.ticker = '170320-ZHJU';
    trip.title = 'Skydiving in Constantina!';
    trip.description = 'Jump off a plane at 4000 feet!';
    trip.price = 150;
    trip.requirements = ['Not having vertigo', 'Not having a phobia of flying'];
    trip.startDate = new Date('2020-05-10');
    trip.endDate = new Date('2020-05-10');
    //trip.picture = 'https://dreampeaks.com/wp-content/uploads/2018/07/Skydiving-Madrid-Spain.jpg';
    trip.cancelled = false;
    trip.cancelledReason = null;
    trip.creator = "yb6ORb8";
    trips.push(trip);

    // Trip 3
    trip = new Trip();
    trip.ticker = '170320-MGER';
    trip.title = 'Trip to Lisboa';
    trip.description = 'Bus trip to Lisboa from Seville, 8 hours.';
    trip.price = 8;
    trip.requirements = ['Be under 26 years old', 'Be a student', 'Tolerate long bus trips'];
    trip.startDate = new Date('2020-04-14');
    trip.endDate = new Date('2020-04-18');
    //trip.picture = 'https://www.guruwalk.com/blog/wp-content/uploads/2019/09/que-ver-lisboa.jpg';
    trip.cancelled = true;
    trip.cancelledReason = 'Cancelled due to COVID-19';
    trip.creator = "yb6ORb8";
    trips.push(trip);

    return trips;
  }

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
}
