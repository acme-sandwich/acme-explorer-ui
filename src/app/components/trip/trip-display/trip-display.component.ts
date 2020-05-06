import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from 'src/app/models/trip.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuditsService } from 'src/app/services/audits.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  cancelledReason: string;
}

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {
  
  trip = new Trip();
  creator = new Actor();
  id: String;
  pictures = [];
  currentActor: Actor;
  private activeRole: String;
  private purchasable: boolean;
  audits = [];
  editable = false;
  cancelled = false;
  cancelledReason = '';

  constructor(private authService: AuthService, private tripService: TripService, private router: Router, 
    private route: ActivatedRoute, private translateService: TranslateService, private auditService: AuditsService,
    public dialog: MatDialog) { 
      super(translateService);
  }

  getRequirements(){
    console.log(this.trip.requirements);
    return this.trip.requirements;
  }

  ngOnInit() {
    // Recover id param
    this.id = this.route.snapshot.params['id'];
    // Todays date
    const today = new Date();
    // Date in one week
    let oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    // Recover trip
    this.tripService.getTrip(this.id)
      .then((val) => {
        this.trip = val;
        // Checks if the trip can be bought
        if(this.trip.cancelled || today > this.trip.startDate){
          this.purchasable = false;
          if(this.trip.cancelled) {
            this.cancelled = this.trip.cancelled;
            this.cancelledReason = this.trip.cancelledReason;
          }
        }else{
          this.purchasable = true;
        };
        if(new Date(this.trip.startDate) > oneWeek) {
          this.editable = true;
        }
        this.tripService.getTripCreator(this.trip.creator)
        .then((val1) => {
          this.creator = val1;
        }).catch((err1) => {
          console.log(err1);
        });
        for(var i = 0; i < this.trip.picture.length; i++){
          this.pictures.push(this.trip.picture[i]);
        }
        this.auditService.getAuditsTrip(this.id)
          .then((val) => {
            this.audits = val;
          }).catch((err1) => {
            console.log(err1);
          });
      })
      .catch((err) => {
        console.error(err);
      });

      this.currentActor = this.authService.getCurrentActor();

      // Recover current actor
      this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.currentActor = this.authService.getCurrentActor();
          this.activeRole = this.currentActor.role.toString();
        } else {
          this.currentActor = null;
          this.activeRole = 'anonymous';
        }
        
      });
  }

  goBack(): void {
    this.router.navigate(['/trips']);
  }

  newTrip(): void{
    console.log("New trip functionallity not implemented yet");
  }

  openCancelDialog(): void {
    const dialogRef = this.dialog.open(CancelTripDialog, {
      width: '500px',
      data: {cancelledReason: this.cancelledReason}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result && result !== '') {
        this.cancelledReason = result;
        this.tripService.cancelTrip(this.trip._id, this.cancelledReason).then((val) => {
          this.cancelled = true;
          this.trip.cancelled = true;
          this.trip.cancelledReason = this.cancelledReason;
        }).catch((err) => {
          console.error(err);
        });
      }
    });
  }

}

@Component({
  selector: 'cancel-trip-dialog',
  templateUrl: 'cancel-trip-dialog.html',
})
export class CancelTripDialog {

  constructor(
    public cancelTripDialog: MatDialogRef<CancelTripDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.cancelTripDialog.close();
  }

}