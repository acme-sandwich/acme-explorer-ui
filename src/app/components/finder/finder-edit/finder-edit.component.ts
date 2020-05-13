import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { Finder } from 'src/app/models/finder.model';
import { Actor } from 'src/app/models/actor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FinderService } from 'src/app/services/finder.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

const PricesValidator: ValidatorFn = (fg: FormGroup) => {
  const minp: number = fg.get('minPrice').value && fg.get('minPrice').value != '' ? parseInt(fg.get('minPrice').value) : null;
  const maxp: number = fg.get('maxPrice').value && fg.get('maxPrice').value != '' ? parseInt(fg.get('maxPrice').value) : null;
  let res;

  if (minp == null || maxp == null) {
    res = null;
  } else if (minp > maxp) {
    res = { pricesValidator: true }
  } else {
    res = null;
  }
  return res;
}

const DatesValidator: ValidatorFn = (fg: FormGroup) => {
  const start: Date = fg.get('dateStart').value && fg.get('dateStart').value != '' ? new Date(fg.get('dateStart').value) : null;
  const end: Date = fg.get('dateEnd').value && fg.get('dateEnd').value != '' ? new Date(fg.get('dateEnd').value) : null;
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
  selector: 'app-finder-edit',
  templateUrl: './finder-edit.component.html',
  styleUrls: ['./finder-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class FinderEditComponent extends TranslatableComponent implements OnInit {

  finderForm: FormGroup;
  finder: Finder;
  idFinder = '0';
  datesRangeError = true;
  actor: Actor;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService,
    private finderService: FinderService, private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.actor = this.authService.getCurrentActor();
    this.idFinder = this.route.snapshot.params['id'];

    this.createForm();
  }

  createForm() {
    this.finderForm = this.fb.group({
      _id: [''],
      keyWord: [''],
      minPrice: [''],
      maxPrice: [''],
      dateStart: [''],
      dateEnd: [''],
      explorer: ['']
    }, { validator: [PricesValidator, DatesValidator] });

    const idActor = this.authService.getCurrentActor()._id;

    this.finderService.getFinders(idActor).then((finders) => {
      if (finders && finders.length > 0) {
        const finder = finders[0];
        this.finder = finder;
        if (finder) {
          if (finder.explorer !== this.actor._id) {
            this.router.navigate(['/denied-access']);
          } else {
            this.finderForm.controls['_id'].setValue(finder._id);
            this.finderForm.controls['keyWord'].setValue(finder.keyWord);
            this.finderForm.controls['minPrice'].setValue(finder.minPrice);
            this.finderForm.controls['maxPrice'].setValue(finder.maxPrice);
            this.finderForm.controls['dateStart'].setValue(finder.dateStart);
            this.finderForm.controls['dateEnd'].setValue(finder.dateEnd);
            this.finderForm.controls['explorer'].setValue(idActor);
          }
        }
      } else {
        this.finder = new Finder();
        this.finderForm.controls['explorer'].setValue(idActor);
      }
    });
  }

  onSubmit() {
    const formModel = this.finderForm.value;

    if (this.finder._id == null || this.finder._id === '' || this.finder._id === '0') {
      delete formModel["_id"];
      this.finderService.createFinder(formModel).then((val) => {
        console.log(val);
        this.router.navigate(['/finder/results']);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      this.finderService.updateFinder(formModel).then((val) => {
        this.router.navigate(['/finder/results']);
      }).catch((err) => {
        console.error(err);
      });
    }
  }
}
