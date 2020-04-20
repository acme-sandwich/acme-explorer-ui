import { Component, OnInit, OnChanges } from '@angular/core';
import { Application } from '../../../models/application.model';
import { ApplicationService } from '../../../services/application.service';
import { TripService } from '../../../services/trip.service';
import { Trip } from 'src/app/models/trip.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ActorService } from '../../../services/actor.service';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {

  private applications: Application[];
  data: any[] = [];
  dtOptions: any = {};
  private currentActor: Actor;
  private activeRole: String;

  constructor(private applicationService: ApplicationService, private translateService: TranslateService,
    private tripService: TripService, private actorService: ActorService, private authService: AuthService) {
    super(translateService);
   }

   getExplorerApplications() {
      this.applicationService.getApplicationsByExplorer('5e9d9ec976ae7200126553e5')//this.currentActor._id
        .then((val) => {
          for (let i = 0; i < val.length; i ++) {
            this.tripService.getTrip(val[i].trip).then((tripVal) => {
              val[i]['tripName'] = tripVal.title;
            });
            this.actorService.getActor(val[i].explorer).then((explorerVal) => {
              val[i]['explorerName'] = explorerVal.name + ' ' + explorerVal.surname;
            });
          }
          this.data = val;
        }).catch((err) => console.error(err.message));
   }

   getManagerApplications() {
      let result;
      this.applicationService.getApplicationsByManager('5e9d9ec976ae720012655407')//this.currentActor._id
      .then((val) => {
        for (let i = 0; i < val.length; i ++) {
          this.tripService.getTrip(val[i].trip).then((tripVal) => {
            val[i]['tripName'] = tripVal.title;
          });
          this.actorService.getActor(val[i].explorer).then((explorerVal) => {
            val[i]['explorerName'] = explorerVal.name + ' ' + explorerVal.surname;
          });
        }
        this.data = val;
        result = val;
      }).catch((err) => console.error(err.message));

      return result;
   }

  ngOnInit() {
    // Recover current actor
    this.currentActor = this.authService.getCurrentActor();

    if (this.authService.getCurrentActorRole() === 'EXPLORER') {
      this.getExplorerApplications();
    } else if (this.authService.getCurrentActorRole() === 'MANAGER') {
      this.getManagerApplications();
      console.log('sabe que soy manager');
    }

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
        title: 'applications.explorer'
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
