import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css']
})
export class DashboardDisplayComponent implements OnInit {
  dashboard: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDatawarehouse()
      .then((val) => {
        this.dashboard = val[0];
        console.log(val[0].topFinderKeyWords);
      })
      .catch((err) => {
        console.error(err);
      });

      console.log(this.dashboard);
  }

}
