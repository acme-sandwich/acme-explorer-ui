import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripService } from 'src/app/services/trip.service';
import { FinderService } from 'src/app/services/finder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-finder-list',
  templateUrl: './finder-list.component.html',
  styleUrls: ['./finder-list.component.css']
})
export class FinderListComponent extends TranslatableComponent implements OnInit {

  data: any[];
  actor: Actor;

  constructor(private finderService: FinderService, private tripService: TripService, private router: Router, private route: ActivatedRoute,
    public authService: AuthService, private translateService: TranslateService) {
      super(translateService);
  }

  ngOnInit() {
    this.actor = this.authService.getCurrentActor();
    this.finderService.getFinders(this.actor._id).then(val => {
      if (val && val.length > 0 && val.find(fndr => fndr.explorer == this.actor._id)) {
        const finder = val.find(fndr => fndr.explorer == this.actor._id);
        var promises = [];
        var tempData = [];
        finder.trips.forEach(trip => {
          promises.push(new Promise((resolve, reject) => {
            this.tripService.getTrip(trip).then(valTrip => {
              tempData.push(valTrip);
              resolve();
            })
            .catch(err => console.error(err.message));
          }));
        });
        Promise.all(promises).then(() => {
          this.data = Object.assign([], tempData);
        });
      }
    })
    .catch(err => console.error(err.message));
  }

  goBack() {
    this.router.navigate(['/finder/edit']);
  }
}
