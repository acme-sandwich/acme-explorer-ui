import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.css']
})
export class ActorDisplayComponent implements OnInit {

  private actor: Actor;
  id: String;

  constructor(private actorService: ActorService, private router: Router, private route: ActivatedRoute) {
    //this.actor = actorService.createActors()[0];
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.actorService.getActor(this.id)
      .then((val) => {
        this.actor = val;
      })
      .catch((err) => {
        console.error(err);
      });
  }

}
