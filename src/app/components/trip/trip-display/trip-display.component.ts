import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent implements OnInit {
  private trip: Trip;

  constructor() { 
    this.trip = new Trip();
    this.trip.ticker = "170320-ABCD";
    this.trip.title = "Swim with sharks in Huelva!";
    this.trip.description = "Enjoy a 2 hour swimming experience around sharks and other marine creatures in the beach of Huelva!";
    this.trip.price = 273;
    this.trip.requirements = ["Can swim", "Passion for new experiences"];
    this.trip.startDate = new Date("2020-07-15");
    this.trip.endDate = new Date("2020-07-16");
    this.trip.picture = "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1004792742%2F960x0.jpg";
    this.trip.cancelled = false;
    this.trip.cancelledReason = "Cancelled due to COVID-19";
  }

  getRequirements(){
    return this.trip.requirements;
  }

  cancelTrip(){
    this.trip.cancelled = true;
  }

  ngOnInit() {
  }

}
