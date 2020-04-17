import { Component, OnInit, OnChanges } from '@angular/core';
import { Application } from '../../../models/application.model';
import { ApplicationService } from '../../../services/application.service';
import { TripService } from '../../../services/trip.service';
import { Trip } from 'src/app/models/trip.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  private applications: Application[];
  data: any[];
  dtOptions: any = {};
  trip: Trip;

  constructor(private applicationService: ApplicationService, private translateService: TranslateService, private tripService: TripService) {
    super(translateService);
   }

   getComments(index: number) {
     return this.applications[index].comments;
   }

   getApplications() {
     return this.applications;
   }

  ngOnInit() {
    this.applicationService.getApplications()
      .then((val) => {
        for (let i = 0; i < val.length; i++) {
          this.tripService.getTrip(val[i].trip).then((tripVal) => {
            val[i]['tripName'] = tripVal.title;
          });
        }
        this.data = val;
        console.log(this.data);
      })
      .catch((err) => console.error(err.message));
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      columns: [
        {
          title: 'applications.status',
          data: 'status'
      }, {
        title: 'applications.trip',
        //data: 'tripName'
      }, {
        title: 'applications.moment',
        data: 'moment'
      }, {
        title: 'Comments',
        data: 'comments',
        class: 'none'
      }],
      responsive: true
    };
  }
}
