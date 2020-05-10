import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Audit } from 'src/app/models/audit.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuditsService } from 'src/app/services/audits.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-audits-edit',
  templateUrl: './audits-edit.component.html',
  styleUrls: ['./audits-edit.component.css']
})
export class AuditsEditComponent extends TranslatableComponent implements OnInit {
  auditForm: FormGroup;
  attachmentsNumber = 0;
  trips = [];
  idTrip = '0';

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService,
    private auditService: AuditsService, private tripService: TripService, private translateService: TranslateService) {
      super(translateService);
    }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.auditForm = this.fb.group({
      _id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      attachments: this.fb.array([]),
      auditor: [''],
      trip: ['', Validators.required]
    });

    const idActor = this.authService.getCurrentActor()._id;
    this.idTrip = this.route.snapshot.params['id'];
    if(this.idTrip == null || this.idTrip == '0') {
      this.tripService.getTrips().then(val => {
        this.trips = val;
      });
    } else {
      console.log('heyy');
      this.auditForm.controls['trip'].setValue(this.idTrip);
    }
    this.auditForm.controls['auditor'].setValue(idActor);
  }

  get attachments() {
    return this.auditForm.get('attachments') as FormArray;
  }

  addAttachment() {
    this.attachments.push(this.fb.control(''));
    this.attachmentsNumber = this.attachmentsNumber + 1;
  }

  removeAttachment(index: number){
    this.attachments.removeAt(index);
    this.attachmentsNumber = this.attachmentsNumber - 1;
  }

  onSubmit() {
    const formModel = this.auditForm.value;
    delete formModel._id;
    this.auditService.createAudit(formModel, this.authService.getCurrentActor()._id).then((val) => {
      console.log(val);
      this.router.navigate(['/audits/'+val._id]);
    }).catch((err) => {
      console.error(err);
    });
  }

  goBack(): void {
    if(this.idTrip == null || this.idTrip == '0') {
      this.router.navigate(['/audits']);
    } else {
      this.router.navigate(['/trips/display/'+this.idTrip]);
    }
  }
}
