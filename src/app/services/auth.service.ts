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
          const url = `${environment.backendApiBaseURL + '/api/v1/actors'}`;
          const body = JSON.stringify(actor);
          this.http.post(url, body, httpOptions).toPromise()
            .then(res => {
              resolve(res);
            }, err => {
              reject(err);
            });
        }).catch(err => {
          if(err.code === 'auth/email-already-in-use') {
            this.messageService.notifyMessage('messages.auth.register.failed', 'alert alert-danger');
          } else if(err.code === 'auth/weak-password') {
            this.messageService.notifyMessage('messages.auth.register.weak.password', 'alert alert-danger');
          }
          reject(err);
        });
    });
  };

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          const url = environment.backendApiBaseURL + '/api/v1/actors?email=' + email;
          this.http.get<Actor[]>(url).toPromise()
            .then((actor: Actor[]) => {
              this.currentActor = actor[0];
              if(this.currentActor.banned) {
                this.messageService.notifyMessage('messages.auth.login.failed.ban', 'alert alert-danger');
                reject('User account banned');
              } else {
                this.userLoggedIn.next(true);
                this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-success');
                localStorage.setItem('currentActor', JSON.stringify({
                  _id: this.currentActor._id,
                  name: this.currentActor.name,
                  surname: this.currentActor.surname,
                  phone: this.currentActor.phone,
                  role: this.currentActor.role,
                  email: this.currentActor.email,
                  address: this.currentActor.address,
                  banned: this.currentActor.banned
                }));
                resolve(this.currentActor);
              }
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
          localStorage.setItem('currentActor', '');
          resolve();
        }).catch(error => {
          reject(error);
        });
    });
  }

  getRoles(): string[] {
    return ['ADMINISTRATOR', 'EXPLORER', 'MANAGER', 'SPONSOR', 'AUDITOR'];
  };

  getRolesForAdminActorCreation(): string[] {
    return ['ADMINISTRATOR', 'MANAGER', 'SPONSOR', 'AUDITOR'];
  };

  getCurrentActor() {
    if (this.currentActor == null) {
      const currentActorLocalStorage = localStorage.getItem('currentActor');
      if(currentActorLocalStorage != null && currentActorLocalStorage != ''){
        let currentActorLocalStorageObject = JSON.parse(currentActorLocalStorage);
        this.currentActor = currentActorLocalStorageObject;
      }
    }
    return this.currentActor;
    ;
  }

  getCurrentActorRole(){
    if(this.getCurrentActor()){
      return this.currentActor.role[0].toString();
    }else{
      return 'anonymous';
    }
  }

  setCurrentActor(actor: Actor) {
    this.currentActor = actor;
  }

  checkRole(roles: string): boolean {
    let result = false;

    if (this.getCurrentActor()) {
      if (roles.indexOf(this.getCurrentActor().role[0].toString()) !== -1) {
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
