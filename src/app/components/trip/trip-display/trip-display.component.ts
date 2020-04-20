import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuditsService } from 'src/app/services/audits.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {
  
  trip = new Trip();
  creator = new Actor();
  id: String;
  pictures = [];
  private currentActor: Actor;
  private activeRole: String;
  private purchasable: boolean;
  audits = [];

  constructor(private authService: AuthService, private tripService: TripService, private router: Router, 
    private route: ActivatedRoute, private translateService: TranslateService, private auditService: AuditsService) { 
      super(translateService);
  }

  getRequirements(){
    console.log(this.trip.requirements);
    return this.trip.requirements;
  }

  cancelTrip(){
    this.trip.cancelled = true;
  }

  ngOnInit() {
    // Recover id param
    this.id = this.route.snapshot.params['id'];
    // Todays date
    const today = new Date();

    // Recover trip
    this.tripService.getTrip(this.id)
      .then((val) => {
        this.trip = val;
        // Checks if the trip can be bought
        if(this.trip.cancelled || today > this.trip.startDate){
          this.purchasable = false;
        }else{
          this.purchasable = true;
        };
        this.tripService.getTripCreator(this.trip.creator)
        .then((val1) => {
          this.creator = val1;
        }).catch((err1) => {
          console.log(err1);
        });
        for(var i = 0; i < this.trip.picture.length; i++){
          this.pictures.push(this.trip.picture[i]);
        }
        this.auditService.getAuditsTrip(this.id)
          .then((val) => {
            this.audits = val;
          }).catch((err1) => {
            console.log(err1);
          });
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
    this.router.navigate(['/trips']);
  }

  newTrip(): void{
    console.log("New trip functionallity not implemented yet");
  }

}
