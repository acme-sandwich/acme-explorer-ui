import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';

const MAX_TRIPS = 12;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent extends TranslatableComponent implements OnInit {

  numObjects = MAX_TRIPS;
  page = 1;
  data: any[];
  filteredTrips: any[];
  actor: Actor;
  keyword: string;
  direction: string;

  constructor(private tripService: TripService, private router: Router, private route: ActivatedRoute,
    public authService: AuthService, private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.keyword = params['keyword']);

    this.tripService.getTripsPage(this.page, MAX_TRIPS, this.keyword)
      .then((val) => {
        this.data = val;
        this.assignCopy();
      })
      .catch((err) => console.error(err.message));

    this.actor = this.authService.getCurrentActor();
  }

  assignCopy() {
    this.filteredTrips = Object.assign([], this.data);
  }

  filterTrip(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredTrips = Object.assign([], this.data).filter(
      item => (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.description.toLowerCase().indexOf(value.toLowerCase()) > -1) || (item.ticker.toLowerCase().indexOf(value.toLowerCase()) > -1)
    )
  }

  newTrip() {
    this.router.navigate(['/trips/new']);
  }

  onScrollDown(ev) {
    this.page = this.page + 1;
    const start = this.page;
    this.numObjects += MAX_TRIPS;
    this.appendTrips(start, this.numObjects);
    this.direction = 'down';
  }

  onScrollUp(ev) {
    this.page = this.page + 1;
    const start = this.page;
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
    this.tripService.getTripsPage(startIndex, MAX_TRIPS, this.keyword)
      .then(val => {
        this.data = this.data.concat(val);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
