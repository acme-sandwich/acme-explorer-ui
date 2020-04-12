import { Component, OnInit } from '@angular/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sponsorship-display',
  templateUrl: './sponsorship-display.component.html',
  styleUrls: ['./sponsorship-display.component.css']
})
export class SponsorshipDisplayComponent extends TranslatableComponent implements OnInit {
  sponsorship = new Sponsorship();
  creator = new Actor();
  id: String;
  private currentActor: Actor;
  private activeRole: String;

  constructor(private authService: AuthService, private sponsorshipService: SponsorshipService, private router: Router, 
    private route: ActivatedRoute, private translateService: TranslateService) { 
      super(translateService);
  }

  paySponsorship(){
    this.sponsorship.payed = true;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Recover sponsorship
    this.sponsorshipService.getSponsorship(this.id)
      .then((val) => {
        this.sponsorship = val;
      })
      .catch((err) => {
        console.error(err);
      });

      // Recover current actor
      this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.currentActor = this.authService.getCurrentActor();
          this.activeRole = this.currentActor.role.toString();
        } else {
          this.currentActor = null;
          this.activeRole = 'anonymous';
        }
      });
    
  }

  goBack(): void {
    this.router.navigate(['/sponsorships']);
  }

  newSponsorship(): void{
    console.log("New sponsorship functionallity not implemented yet");
  }
}
