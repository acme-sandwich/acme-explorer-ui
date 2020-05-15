import { Component, OnInit } from '@angular/core';
import { Application } from '../../../models/application.model';
import { Trip } from '../../../models/trip.model';
import { ActorService } from '../../../services/actor.service';
import { TripService } from '../../../services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent extends TranslatableComponent implements OnInit {

  private application: Application;
  private trip: Trip;
  private currentActor: Actor;
  tripId: string;
  applicationId: string;
  applicationForm: FormGroup;
  commentsNumber = 0;

  constructor(private applicationService: ApplicationService, private router: Router, private route: ActivatedRoute,
    private translateService: TranslateService, private authService: AuthService,
    private fb: FormBuilder, private tripService: TripService) {
      super(translateService);
     }

  ngOnInit() {
    this.tripId = this.route.snapshot.params['id'];

    this.tripService.getTrip(this.tripId).then((val) => {
      let oneWeek = new Date();
      oneWeek.setDate(oneWeek.getDate() + 7);
      if (oneWeek > val.startDate || val.cancelled ) {
        this.router.navigate(['/denied-access']);
      } else {
        this.applicationForm.controls['trip'].setValue(val);
        this.applicationForm.controls['manager'].setValue(val.creator);
        this.trip = val;
      }
    });

    this.createForm();
  }

  createForm() {
    this.applicationForm = this.fb.group({
      id: [''],
      status: [''],
      trip: [''],
      explorer: [''],
      moment: [''],
      manager: [''],
      comments: this.fb.array([]),
    });

    this.currentActor = this.authService.getCurrentActor();
    this.applicationId = this.route.snapshot.params['apId'];

    if (this.applicationId == null) {
      console.log(this.tripId);
      this.application = new Application();
      this.application.moment = new Date();
      this.application.trip = this.tripId;

      this.applicationForm.controls['moment'].setValue(this.application.moment);
      this.applicationForm.controls['explorer'].setValue(this.currentActor);
      this.applicationForm.controls['status'].setValue('PENDING');
    } else {
      this.applicationService.getApplication(this.applicationId).then((val) => {
        this.application = val;
        console.log(JSON.stringify(val));
        if (val) {
          this.applicationForm.controls['id'].setValue(val._id);
          this.applicationForm.controls['status'].setValue(val.status);
          this.applicationForm.controls['trip'].setValue(val.trip);
          this.applicationForm.controls['explorer'].setValue(val.explorer);
          this.applicationForm.controls['moment'].setValue(val.moment);
          this.applicationForm.controls['comments'].setValue(val.comments);
        }
      });
    }
  }

  get comments() {
    return this.applicationForm.get('comments') as FormArray;
  }

  addComment() {
    this.comments.push(this.fb.control(''));
    this.commentsNumber = this.commentsNumber + 1;
  }

  removeComment(index: number){
    this.comments.removeAt(index);
    this.commentsNumber = this.commentsNumber - 1;
  }

  onSubmit() {
    const formModel = this.applicationForm.value;

    console.log(formModel);
    if(this.application._id == null || this.application._id === '' || this.application._id === '0') {
      delete formModel["_id"];

      // New application
      this.applicationService.createApplication(formModel).then((val) => {
        console.log(val);
        this.router.navigate(['/actors/' + this.currentActor._id + '/applications']);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      // The trip already exists and it's updating
      this.applicationService.updateApplication(formModel).then((val) => {
        this.router.navigate(['/trips']);
      }).catch((err) => {
        console.error(err);
      });
    }
  }

}
