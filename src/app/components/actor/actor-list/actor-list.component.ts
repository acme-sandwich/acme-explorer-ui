import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent extends TranslatableComponent implements OnInit {

  private actors: Actor[];
  data: any[];
  dtOptions: any = {};

  constructor(private actorService: ActorService, private translateService: TranslateService) {
    super(translateService);
    this.actors = actorService.createActors();
   }

  getApplications() {
    return this.actors;
  }

  ngOnInit() {
    this.actorService.getActors()
      .then((val) => {
        this.data = val;
        console.log(this.data);
      })
      .catch((err) => console.error(err.message));

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
      }
  }

}
