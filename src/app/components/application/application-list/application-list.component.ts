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
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {
  private applications: Application[] = [];
  data: any[] = [];
  dtOptions: any = {};
  private currentActor: Actor;
  private activeRole: String;
  dtTrigger: Subject<any> = new Subject();
  private isCancelable: boolean;

  constructor(private applicationService: ApplicationService, private translateService: TranslateService,
    private tripService: TripService, private actorService: ActorService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    super(translateService);
   }

   getExplorerApplications() {
      this.applicationService.getApplicationsByExplorer(this.currentActor._id)
        .then((val) => {
          for (let i = 0; i < val.length; i ++) {
            this.tripService.getTrip(val[i].trip).then((tripVal) => {
              val[i]['tripName'] = tripVal.title;
              val[i]['isCancelable'] = this.checkCancelable(tripVal.startDate);
              val[i]['tripPrice'] = tripVal.price;
            });
            this.actorService.getActor(val[i].explorer).then((explorerVal) => {
              val[i]['explorerName'] = explorerVal.name + ' ' + explorerVal.surname;
            });
          }
          this.data = val;
          this.dtTrigger.next();
        }).catch((err) => console.error(err.message));
   }

   getManagerApplications() {
    this.applicationService.getApplicationsByManager(this.currentActor._id)
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
      this.dtTrigger.next();
    }).catch((err) => console.error(err.message));
   }

  ngOnInit() {
    // Recover current actor
    this.currentActor = this.authService.getCurrentActor();

    if (this.authService.getCurrentActorRole() === 'EXPLORER') {
      this.getExplorerApplications();
    } else if (this.authService.getCurrentActorRole() === 'MANAGER') {
      this.getManagerApplications();
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      columns: [
      {
        title: 'applications.status',
        data: 'status'
      }, {
        title: 'applications.trip',
      }, {
        title: 'applications.explorer',
      }, {
        title: 'applications.moment',
        data: 'moment'
      }, {
        title: 'Comments',
        data: 'comments',
        class: 'none'
      }, {
        title: 'Actions'
      }],
      responsive: true
    };
  }

  cancelApplication(application: Application) {
    this.applicationService.cancelApplication(application).then((val) => {
      this.router.navigate(['/']);
    }).catch((err) => {
      console.error(err);
    });
  }

  rejectApplication(application: Application) {
    this.applicationService.rejectApplication(application).then((val) => {
      this.router.navigate(['/']);
    }).catch((err) => {
      console.error(err);
    });
  }

  dueApplication(application: Application) {
    this.applicationService.dueApplication(application).then((val) => {
      this.router.navigate(['/']);
    }).catch((err) => {
      console.error(err);
    });
  }

  checkCancelable(startDate: Date) {
    let result;
    const actualDate = new Date();
    const tripStartDate = new Date(startDate);

    if (tripStartDate >= actualDate) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }
}
