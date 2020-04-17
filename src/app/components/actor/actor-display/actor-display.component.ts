import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.css']
})
export class ActorDisplayComponent extends TranslatableComponent implements OnInit {

  private actor: Actor;
  id: String;

  constructor(private actorService: ActorService, private router: Router, private route: ActivatedRoute, private translateService: TranslateService) {
    super(translateService);
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
