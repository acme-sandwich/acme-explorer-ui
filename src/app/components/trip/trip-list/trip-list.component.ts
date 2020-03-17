import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  private trips: Trip[];

  constructor(private tripService: TripService) { 
    this.trips = tripService.createTrips();
  }

  cancellTrip(index: number){
    this.trips[index].cancelled = true;
  }

  getRequirements(index: number){
    return this.trips[index].requirements;
  }
  
  ngOnInit() {
  }

}
