import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { MessageService } from '../services/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentActor: Actor;
  userLoggedIn = new Subject();

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient,
    private messageService: MessageService) { }

  registerUser(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
        .then(_ => {
          // if the authentication was ok, then we proceed
          const headers = new HttpHeaders();
          headers.append('Content-type', 'application/json');
          const url = `${environment.backendApiBaseURL + '/actors'}`;
          const body = JSON.stringify(actor);
          this.http.post(url, body, httpOptions).toPromise()
            .then(res => {
              resolve(res);
            }, err => {
              reject(err);
            });
        }).catch(err => {
          reject(err);
        });
    });
  };

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          const url = environment.backendApiBaseURL + '/actors?email=' + email;
          this.http.get<Actor[]>(url).toPromise()
            .then((actor: Actor[]) => {
              this.currentActor = actor[0];
              this.userLoggedIn.next(true);
              this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-success');
              localStorage.setItem('currentActor', JSON.stringify(this.currentActor));
              resolve(this.currentActor);
            }).catch(error => {
              this.messageService.notifyMessage('messages.auth.login.failed', 'alert alert-danger');
              reject(error);
            });
        }).catch(error => {
          this.messageService.notifyMessage('messages.' + error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
          reject(error);
        });
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          this.currentActor = null;
          localStorage.setItem('currentActor', null);
          resolve();
        }).catch(error => {
          reject(error);
        });
    });
  }

  getRoles(): string[] {
    return ['ADMINISTRATOR', 'EXPLORER', 'MANAGER', 'SPONSOR'];
  };

  getCurrentActor() {
    if (this.currentActor == null) {
      const currentActorLocalStorage = localStorage.getItem('currentActor');
      if(currentActorLocalStorage != null){
        let currentActorLocalStorageObject = JSON.parse(currentActorLocalStorage);
        this.currentActor = currentActorLocalStorageObject;
      }
    }
    return this.currentActor;
    ;
  }

  checkRole(roles: string): boolean {
    let result = false;

    if (this.getCurrentActor()) {
      if (roles.indexOf(this.getCurrentActor().role.toString()) !== -1) {
        result = true;
      } else {
        result = false;
      }
    } else {
      if (roles.indexOf('anonymous') !== -1) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }
}
