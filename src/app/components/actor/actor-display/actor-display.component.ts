import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.css']
})
export class ActorDisplayComponent implements OnInit {

  private actor: Actor;

  constructor(private actorService: ActorService) {
    this.actor = actorService.createActors()[0];
   }

  ngOnInit() {
  }

}
