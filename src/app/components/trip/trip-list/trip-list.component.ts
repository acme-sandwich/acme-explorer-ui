import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent extends TranslatableComponent implements OnInit {

  data: any[];
  actor: Actor;

  constructor(private tripService: TripService, private router: Router, public authService: AuthService,
    private translateService: TranslateService) {
      super(translateService);
  }

  ngOnInit() {
    this.tripService.getTrips()
      .then((val) => {
        this.data = val;
      })
      .catch((err) => console.error(err.message));

    this.actor = this.authService.getCurrentActor();
  }

  newTrip() {
    this.router.navigate(['/trips/new']);
  }

}
