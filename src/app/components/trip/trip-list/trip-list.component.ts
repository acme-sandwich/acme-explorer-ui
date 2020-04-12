import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';

const MAX_TRIPS = 3;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent extends TranslatableComponent implements OnInit {

  numObjects = MAX_TRIPS;
  data: any[];
  actor: Actor;
  keyword: string;
  direction: string;

  constructor(private tripService: TripService, private router: Router, private route: ActivatedRoute, 
    public authService: AuthService, private translateService: TranslateService) {
      super(translateService);
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.keyword = params['keyword']);

    this.tripService.getTripsPage(0, MAX_TRIPS, this.keyword)
      .then((val) => {
        this.data = val;
      })
      .catch((err) => console.error(err.message));

    this.actor = this.authService.getCurrentActor();
  }

  newTrip() {
    this.router.navigate(['/trips/new']);
  }

  onScrollDown(ev){
    console.log('En el down');
    const start = this.numObjects;
    console.log('start: ' +start);
    this.numObjects += MAX_TRIPS;
    console.log('numObjects'+ this.numObjects);
    this.appendTrips(start, this.numObjects);

    this.direction = 'down';
  }

  onScrollUp(ev) {
    console.log('En el up');
    const start = this.numObjects;
    
    this.numObjects += MAX_TRIPS;
    
    this.prependTrips(start, this.numObjects);

    this.direction = 'up';
  }

  appendTrips(startIndex, endIndex) {
    this.addTrips(startIndex, endIndex, 'push');
  }

  prependTrips(startIndex, endIndex) {
    this.addTrips(startIndex, endIndex, 'unshift');
  }

  addTrips(startIndex, endIndex, _method) {
    console.log('en el add trips');
    this.tripService.getTripsPage(startIndex, MAX_TRIPS, this.keyword)
      .then(val => { 
        this.data = this.data.concat(val); 
        console.log(this.data);
      })
      .catch(err => { 
        console.log(err); 
      });
  }

}
