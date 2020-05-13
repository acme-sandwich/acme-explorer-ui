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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/services/message.service';

declare var ol: any;
export interface DialogData {
  cancelledReason: string;
}

export interface DeleteDialogData {
  delete: boolean;
  deleteConfirm: string;
}

export interface DeleteImageData {
  deleteImage: boolean;
  imageIndex: number;
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
  imageIndex: number;

  coordenadasLongitud = 0;
  coordenadasLatitud = 0;


  constructor(private authService: AuthService, private tripService: TripService, private router: Router,
    private route: ActivatedRoute, private translateService: TranslateService, private auditService: AuditsService,
    public dialog: MatDialog, public cancelDialog: MatDialog, public deleteImageDialog: MatDialog, public messageService: MessageService) {
    super(translateService);
  }

  slides = [];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "autoplay": true};

 
  afterChange(e) {
    this.imageIndex = e.currentSlide;
  }

  getRequirements() {
    return this.trip.requirements;
  }

  ngOnInit() {
    this.currentActor = this.authService.getCurrentActor();
    this.activeRole = this.authService.getCurrentActorRole();

    // Recover current actor
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.authService.getCurrentActorRole();
      } else {
        this.currentActor = null;
        this.activeRole = 'anonymous';
      }
    });

    // Recover id param
    this.id = this.route.snapshot.params['id'];
    // First image in carousel
    this.imageIndex = 0;
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
        if (this.trip.cancelled || today > this.trip.startDate) {
          this.purchasable = false;
          if (this.trip.cancelled) {
            this.cancelled = this.trip.cancelled;
            this.cancelledReason = this.trip.cancelledReason;
          }
        } else {
          this.purchasable = true;
        };
        if (new Date(this.trip.startDate) > oneWeek) {
          this.editable = true;
        }
        for(let i = 0; i < this.trip.photoObject.length; i++) {
          this.slides.push(this.trip.photoObject[i]);
        }
        this.coordenadasLatitud = val.latitude;
        this.coordenadasLongitud = val.longitude;
        this.tripService.getTripCreator(this.trip.creator)
          .then((val1) => {
            this.creator = val1;
          }).catch((err1) => {
            console.log(err1);
          });
        for (var i = 0; i < this.trip.picture.length; i++) {
          this.pictures.push(this.trip.picture[i]);
        }
        this.auditService.getAuditsTrip(this.id)
          .then((val) => {
            this.audits = val;
          }).catch((err1) => {
            console.log(err1);
          });
          console.log(this.currentActor);
          console.log(this.activeRole);

          console.log('todo esto debe dar false');
          console.log(this.cancelled);
          console.log(!this.editable);
          console.log(!this.currentActor);
          console.log(this.currentActor._id !== this.trip.creator);
          console.log(this.currentActor._id);
          console.log(this.trip.creator);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  goBack(): void {
    this.router.navigate(['/trips']);
  }

  newTrip(): void {
    console.log("New trip functionallity not implemented yet");
  }

  openCancelDialog(): void {
    const dialogRef = this.dialog.open(CancelTripDialog, {
      width: '500px',
      data: { cancelledReason: this.cancelledReason }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!this.trip.cancelled) {
        if (result && result !== '') {
          this.cancelledReason = result;
          this.tripService.cancelTrip(this.trip._id, this.cancelledReason).then((val) => {
            this.cancelled = true;
            this.trip.cancelled = true;
            this.trip.cancelledReason = this.cancelledReason;
          }).catch((err) => {
            console.error(err);
          });
        }
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.cancelDialog.open(DeleteTripDialog, {
      width: '500px',
      data: { deleted: false, deleteConfirm: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var oneWeek = new Date();
        oneWeek.setDate(oneWeek.getDate() + 7);
        if (new Date(this.trip.startDate) > oneWeek) {
          this.tripService.deleteTrip(this.trip._id).then((val) => {
            this.router.navigate(['/trips']);
          }).catch((err) => {
            console.error(err);
          });
        } else {
          this.messageService.notifyMessage('messages.trip.delete.error.oneWeek', 'alert alert-danger');
        }
      }
    });
  }

  openDeleteImageDialog(): void {
    const dialogRef = this.cancelDialog.open(DeleteImageDialog, {
      width: '500px',
      data: { deleteImage: false, imageIndex: this.imageIndex }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Result is the index of the image to delete
        this.tripService.deletePictureFromTrip(this.trip._id, result).then((val) => {
          this.slides.splice(result, 1);
        }).catch((err) => {
          console.error(err);
        })
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.cancelTripDialog.close();
  }

}

@Component({
  selector: 'delete-trip-dialog',
  templateUrl: 'delete-trip-dialog.html',
})
export class DeleteTripDialog {

  constructor(
    public deleteTripDialog: MatDialogRef<DeleteTripDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) { }

  onNoClick(): void {
    this.deleteTripDialog.close();
  }

}

@Component({
  selector: 'delete-image-dialog',
  templateUrl: 'delete-image-dialog.html',
})
export class DeleteImageDialog {

  constructor(
    public deleteImageDialog: MatDialogRef<DeleteImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteImageData) { }

  onNoClick(): void {
    this.deleteImageDialog.close();
  }

}

