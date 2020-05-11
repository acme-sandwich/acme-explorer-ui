import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Dashboard, TripsPerManager, ApplicationsPerTrip, PricePerTrip, RatioApplicationsPerStatus, AvgFinderPrices, TopFinderKeywords } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css']
})
export class DashboardDisplayComponent implements OnInit {


  dashboard = new Dashboard();
  tripsPerManagers = new TripsPerManager();
  applicationsPerTrip = new ApplicationsPerTrip();
  pricePerTrip = new PricePerTrip();
  ratioApplicationsPerStatus = new RatioApplicationsPerStatus();
  avgFinderPrices = new AvgFinderPrices();
  topFinderKeyword = new TopFinderKeywords();
  topFinderKeywords = [this.topFinderKeyword];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboard.tripsPerManagers = this.tripsPerManagers;
    this.dashboard.applicationsPerTrip = this.applicationsPerTrip;
    this.dashboard.pricePerTrip = this.pricePerTrip;
    this.dashboard.ratioApplicationsPerStatus = this.ratioApplicationsPerStatus;
    this.dashboard.avgFinderPrices = this.avgFinderPrices;
    this.dashboard.topFinderKeyWords = this.topFinderKeywords;
    this.dashboardService.getDatawarehouse()
      .then((val) => {
        if(val[0].tripsPerManagers != null) this.dashboard.tripsPerManagers = val[0].tripsPerManagers;
        if(val[0].applicationsPerTrip != null) this.dashboard.applicationsPerTrip = val[0].applicationsPerTrip;
        if(val[0].pricePerTrip != null) this.dashboard.pricePerTrip = val[0].pricePerTrip;
        if(val[0].ratioApplicationsPerStatus != null) this.dashboard.ratioApplicationsPerStatus = val[0].ratioApplicationsPerStatus;
        if(val[0].avgFinderPrices != null) this.dashboard.avgFinderPrices = val[0].avgFinderPrices;
        if(val[0].topFinderKeyWords != null) this.dashboard.topFinderKeyWords = val[0].topFinderKeyWords;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
