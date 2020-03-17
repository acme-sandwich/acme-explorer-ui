import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor() { }

  createTrips(): Trip[]{
    let trip: Trip;
    let trips: Trip[];

    trips = new Array();
    //Trip 1
    trip = new Trip();
    trip.ticker = "170320-ABCD";
    trip.title = "Swim with sharks in Huelva!";
    trip.description = "Enjoy a 2 hour swimming experience around sharks and other marine creatures in the beach of Huelva!";
    trip.price = 273;
    trip.requirements = ["Can swim", "Passion for new experiences"];
    trip.startDate = new Date("2020-07-15");
    trip.endDate = new Date("2020-07-16");
    trip.picture = "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1004792742%2F960x0.jpg";
    trip.cancelled = false;
    trip.cancelledReason = "Cancelled due to COVID-19";
    trips.push(trip);
    //Trip 2
    trip = new Trip();
    trip.ticker = "170320-ZHJU";
    trip.title = "Skydiving in Constantina!";
    trip.description = "Jump off a plane at 4000 feet!";
    trip.price = 150;
    trip.requirements = ["Not having vertigo", "Not having a phobia of flying"];
    trip.startDate = new Date("2020-05-10");
    trip.endDate = new Date("2020-05-10");
    trip.picture = "https://dreampeaks.com/wp-content/uploads/2018/07/Skydiving-Madrid-Spain.jpg";
    trip.cancelled = false;
    trip.cancelledReason = "Cancelled due to COVID-19";
    trips.push(trip);

    return trips;
  }
}
