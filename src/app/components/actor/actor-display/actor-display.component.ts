import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.css']
})
export class ActorDisplayComponent extends TranslatableComponent implements OnInit {

  private actor: Actor; // Actor cuyo perfil se está mostrando
  id: String;
  private activeRole: String;
  private currentActor: Actor; // Actor logueado ahora mismo

  constructor(private actorService: ActorService, private router: Router, private route: ActivatedRoute, 
    private translateService: TranslateService, private authService: AuthService) {
    super(translateService);
   }

  ngOnInit() {

    this.currentActor = this.authService.getCurrentActor();
    this.activeRole = this.currentActor.role.toString();

    this.id = this.route.snapshot.params['id'];

    this.actorService.getActor(this.id)
      .then((val) => {
        this.actor = val;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onBanActor() {
    console.log(this.actor);
    this.actorService.banActor(this.actor).then((val) => {
      this.router.navigate(['/actors']);
    }).catch((err) => {
      console.error(err);
    });
  }

  onUnbanActor() {
    console.log(this.actor);
    this.actorService.unbanActor(this.actor).then((val) => {
      this.router.navigate(['/actors']);
    }).catch((err) => {
      console.error(err);
    });
  }

}
