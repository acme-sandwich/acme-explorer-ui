import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  private actors: Actor[];
  dtOptions: DataTables.Settings = {};

  constructor(private actorService: ActorService) {
    this.actors = actorService.createActors();
   }

  getApplications() {
    return this.actors;
  }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 2
    }
  }

}
