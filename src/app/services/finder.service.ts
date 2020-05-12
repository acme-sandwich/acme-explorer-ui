import { Injectable } from '@angular/core';
import { Finder } from '../models/finder.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFinder(id: String, actorId: String){
    const url = environment.backendApiBaseURL+'/api/v1/actors/'+actorId+'/finders/'+id;
    return this.http.get<Finder>(url).toPromise();
  }

  getFinders(actorId: String){
    const url = environment.backendApiBaseURL+'/api/v1/actors/'+actorId+'/finders';
    return this.http.get<Finder[]>(url).toPromise();
  }

  updateFinder(finder: Finder) {
    const url = environment.backendApiBaseURL+'/api/v1/actors/'+finder.explorer+'/finders/'+finder._id;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');

    const body = JSON.stringify(finder);
    
    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }

  createFinder(finder: Finder) {
    const url = environment.backendApiBaseURL+'/api/v1/actors/'+finder.explorer+'/finders';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Access-Control-Allow-Origin','*');

    const body = JSON.stringify(finder);
    
    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.log(err); reject(err)});
    });
  }
}
