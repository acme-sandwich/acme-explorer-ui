import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { Trip, PictureObject } from 'src/app/models/trip.model';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { Actor } from 'src/app/models/actor.model';

const DatesValidator: ValidatorFn = (fg: FormGroup) => {
  const start: Date = new Date(fg.get('startDate').value);
  const end: Date = new Date(fg.get('endDate').value);
  let res;

  if (start == null || end == null) {
    res = null;
  } else if (start > end) {
    res = { datesValidator: true }
  } else {
    res = null;
  }
  return res;
}

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class TripEditComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;
  trip: Trip;
  photoChanged = false;
  picture: string;
  idTrip = '0';
  requirementsNumber = 0;
  stagesNumber = 0;
  datesRangeError = true;
  actor: Actor;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService,
    private tripService: TripService, private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.actor = this.authService.getCurrentActor();
    this.idTrip = this.route.snapshot.params['id'];

    this.createForm();
  }

  createForm() {
    this.tripForm = this.fb.group({
      _id: [''],
      ticker: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [''],
      picture: [''],
      photo: [''],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]],
      published: [''],
      creator: [''],
      requirements: this.fb.array([]),
      stages: this.fb.array([]),
    }, { validator: DatesValidator });

    const idActor = this.authService.getCurrentActor()._id;

    if (this.idTrip == null) {
      this.trip = new Trip();
      this.trip.published = true;

      this.tripForm.controls['published'].setValue(this.trip.published);
      this.tripForm.controls['creator'].setValue(idActor);
    } else {
      this.tripService.getTrip(this.idTrip).then((trip) => {
        this.trip = trip;
        if (trip) {
          // Comprobamos que el actor tenga permiso para editar este viaje
          if (trip.creator !== this.actor._id) {
            this.router.navigate(['/denied-access']);
          } else {
            this.tripForm.controls['_id'].setValue(trip._id);
            this.tripForm.controls['ticker'].setValue(trip.ticker);
            this.tripForm.controls['title'].setValue(trip.title);
            this.tripForm.controls['description'].setValue(trip.description);
            this.tripForm.controls['price'].setValue(trip.price);
            this.tripForm.controls['startDate'].setValue(trip.startDate);
            this.tripForm.controls['endDate'].setValue(trip.endDate);
            this.tripForm.controls['published'].setValue(trip.published);
            this.tripForm.controls['creator'].setValue(idActor);
            if (trip.photoObject[0] != null) {
              this.picture = trip.photoObject[0].Buffer;
              document.getElementById('showresult').textContent = trip.photoObject[0].Buffer;
            } else {
              this.picture = null;
            }


            for (let i = 0; i < trip.requirements.length; i++) {
              this.addRequirementFromFormCreation(trip.requirements[i]);
              this.requirementsNumber = this.requirementsNumber + 1;
            }

            let control = <FormArray>this.tripForm.controls.stages;
            trip.stages.forEach(x => {
              control.push(this.fb.group({
                title: x.title,
                description: x.description,
                price: x.price
              }));
              this.stagesNumber = this.stagesNumber + 1;
            });
          }
        }
      })
    }
  }

  get requirements() {
    return this.tripForm.get('requirements') as FormArray;
  }

  get stages() {
    return this.tripForm.get('stages') as FormArray;
  }

  addRequirement() {
    this.requirements.push(this.fb.control(''));
    this.requirementsNumber = this.requirementsNumber + 1;
  }

  addRequirementFromFormCreation(requirement: string) {
    this.requirements.push(this.fb.control(requirement));
  }

  addStage() {
    let control = <FormArray>this.tripForm.controls.stages;
    control.push(this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [1, Validators.pattern('[0-9]+')]
    }));
    this.stagesNumber = this.stagesNumber + 1;
  }

  removeStage(index: number) {
    this.stages.removeAt(index);
    this.stagesNumber = this.stagesNumber - 1;
  }

  removeRequirement(index: number) {
    this.requirements.removeAt(index);
    this.requirementsNumber = this.requirementsNumber - 1;
  }

  onFileChange(event) {
    const reader = new FileReader();
    const showout = document.getElementById('showresult');
    let res;
    this.photoChanged = true;
    const pictureViewer = <HTMLImageElement>document.getElementById('pictureViewerId');

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.addEventListener('loadend', function () {
        res = reader.result;
        const result1 = this.result;
        if (typeof result1 === 'string') {
          showout.textContent = result1;
        }
        pictureViewer.src = showout.textContent;
      });
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const formModel = this.tripForm.value;

    // check if picture has changed
    if (this.photoChanged) {
      formModel.photoObject = [new PictureObject()];
      formModel.photoObject[0].Buffer = document.getElementById('showresult').textContent;
      formModel.photoObject[0].contentType = 'image/png';
    }

    console.log(formModel);
    if (this.trip._id == null || this.trip._id === '' || this.trip._id === '0') {
      delete formModel["_id"];
      delete formModel["ticker"];
      // The trip is new
      this.tripService.createTrip(formModel).then((val) => {
        console.log(val);
        this.router.navigate(['/trips/display/' + val._id]);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      // The trip already exists and it's updating
      this.tripService.updateTrip(formModel).then((val) => {
        this.router.navigate(['/trips/display/' + val._id]);
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  goBack(): void {
    if (this.trip._id != '0') {
      this.router.navigate(['/trips/display/' + this.trip._id]);
    } else {
      this.router.navigate(['/trips/my-trips']);
    }
  }

}

export function startEndDatesValidator(control: FormGroup): { [key: string]: boolean } | null {
  const start = control.get('startDate').value;
  const end = control.get('endDate').value;

  if (start != null && end != null && start > end) {
    return { 'startEndDatesValidator': true };
  }
  return null;
}