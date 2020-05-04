import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip.model';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class TripEditComponent extends TranslatableComponent implements OnInit {

  tripForm: FormGroup;
  trip: Trip;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService,
    private tripService: TripService, private translateService: TranslateService) { 
      super(translateService);
    }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.tripForm = this.fb.group({
      _id: [''],
      ticker: [''],
      title: [''],
      description: [''],
      price: [''],
      picture: [''],
      startDate: [''],
      endDate: [''],
      published: [''],
      requirements: this.fb.array([]),
      stages: this.fb.array([])
    });

    const idActor = this.authService.getCurrentActor().id;
    const idTrip = this.route.snapshot.params['id'];
    this.tripService.getTrip(idTrip).then((trip) => {
      this.trip = trip;
      if(trip){
        this.tripForm.controls['_id'].setValue(trip._id);
        this.tripForm.controls['ticker'].setValue(trip.ticker);
        this.tripForm.controls['title'].setValue(trip.title);
        this.tripForm.controls['description'].setValue(trip.description);
        this.tripForm.controls['price'].setValue(trip.price);
        this.tripForm.controls['picture'].setValue(trip.picture);
        this.tripForm.controls['startDate'].setValue(trip.startDate);
        this.tripForm.controls['endDate'].setValue(trip.endDate);
        this.tripForm.controls['published'].setValue(trip.published);

        for(let i = 0; i < trip.requirements.length; i++) {
          this.addRequirementFromFormCreation(trip.requirements[i]);
        }

        let control = <FormArray>this.tripForm.controls.stages;
        trip.stages.forEach(x => {
          control.push(this.fb.group({
            title: x.title,
            description: x.description,
            price: x.price
          }));
        });
        console.log(this.stages);
      }
    })
  }

  createStageFormGroup(stageObj) {
    return new FormGroup({
      title: new FormControl(stageObj.title),
      description: new FormControl(stageObj.description),
      price: new FormControl(stageObj.price)
    });
  }

  get requirements() {
    return this.tripForm.get('requirements') as FormArray;
  }

  get stages() {
    return this.tripForm.get('stages') as FormArray;
  }

  addRequirement() {
    this.requirements.push(this.fb.control(''));
  }

  addRequirementFromFormCreation(requirement: string) {
    this.requirements.push(this.fb.control(requirement));
  }

  addStage() {
    let control = <FormArray>this.tripForm.controls.stages;
    control.push(this.fb.group({
      title: '',
      description: '',
      price: 1
    }));
    console.log("añadido nuevo stage vacio", this.stages);

    /*let stageForm: FormGroup;
    stageForm = this.fb.group({
      title: [''],
      description: [''],
      price: ['1']
    });
    this.stages.push(this.fb.control(stageForm));*/
  }

  removeStage(index: number) {
    this.stages.removeAt(index);
  }

  removeRequirement(index: number){
    this.requirements.removeAt(index);
  }

  onSubmit() {
    const formModel = this.tripForm.value;

    this.tripService.updateTrip(formModel).then((val) => {
      console.log(val);
      this.router.navigate(['/trips']);
    }).catch((err) => {
      console.error(err);
    });
  }

  goBack(): void {
    this.router.navigate(['/trips/display/'+this.trip._id]);
  }

}
