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
  trips = [];
  id: String;
  private currentActor: Actor;

  constructor(private authService: AuthService, private sponsorshipService: SponsorshipService, private router: Router, 
    private route: ActivatedRoute, private translateService: TranslateService) { 
      super(translateService);
  }

  paySponsorship(){
    this.sponsorship.payed = true;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.currentActor = this.authService.getCurrentActor();
    console.log(this.route);
    // Recover sponsorship
    this.sponsorshipService.getSponsorship(this.id)
      .then((val) => {
        this.sponsorship = val;
        if (!this.currentActor || !this.currentActor.id || this.currentActor.id != this.sponsorship.creator) {
          this.router.navigate(['/denied-access']);
        } else {
          this.sponsorshipService.getSponsorshipCreator(this.sponsorship.creator)
          .then((val1) => {
            this.creator = val1;
            this.sponsorshipService.getSponsorshipTrips(this.sponsorship.trips)
            .then((val2) => {
              this.trips = val2;
            }).catch((err2) => {
              console.log(err2);
            })
          }).catch((err1) => {
            console.log(err1);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    
  }

  goBack(): void {
    this.router.navigate(['/sponsorships']);
  }

  newSponsorship(): void{
    console.log("New sponsorship functionallity not implemented yet");
  }
}
