import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private actorsUrl = environment.backendApiBaseURL + '/actors';

  constructor(private http: HttpClient) { }

  createActors(): Actor[] {
    let actors: Actor[];
    let actor: Actor;

    actors = new Array();

    // 1st actor
    actor = new Actor();
    actor.name = 'Jorge';
    actor.surname = 'Gordo Aguilar';
    actor.phone = '675849839';
    actor.role = 'ADMINISTRATOR';
    actor.email = 'jorge@acme-explorer.com';
    actor.address = 'Calle San Juan, 7';
    actor.banned = false;
    actors.push(actor);

    // 2nd actor
    actor = new Actor();
    actor.name = 'Antonio';
    actor.surname = 'Rodríguez Artacho';
    actor.phone = '633617283';
    actor.role = 'MANAGER';
    actor.email = 'antonio@acme-explorer.com';
    actor.address = 'Calle Feria, 33';
    actor.banned = false;
    actors.push(actor);

    // 3rd actor
    actor = new Actor();
    actor.name = 'Rafael';
    actor.surname = 'Fresno Aranda';
    actor.phone = '622727388';
    actor.role = 'MANAGER';
    actor.email = 'rafael@acme-explorer.com';
    actor.address = 'Avenida Milagros, 41';
    actor.banned = false;
    actors.push(actor);

    // 4th actor
    actor = new Actor();
    actor.name = 'Clara';
    actor.surname = 'Fernández Díaz';
    actor.phone = '666787678';
    actor.role = 'EXPLORER';
    actor.email = 'clara@gmail.com';
    actor.address = 'Calle Rosalía, 22';
    actor.banned = false;
    actors.push(actor);

    // 5th actor
    actor = new Actor();
    actor.name = 'Julia';
    actor.surname = 'Smith Corrales';
    actor.phone = '666757099';
    actor.role = 'EXPLORER';
    actor.email = 'julia@gmail.com';
    actor.address = 'Calle Smith, 8';
    actor.banned = true;
    actors.push(actor);

    return actors;
  }

  getActors() {
    const url = `${this.actorsUrl}`;
    return this.http.get<Actor[]>(url).toPromise();
  }

  getActor(id: String) {
    const url = `${this.actorsUrl}/${id}`;
    return this.http.get<Actor>(url).toPromise();
  }
}
