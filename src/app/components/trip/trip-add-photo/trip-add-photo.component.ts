import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Trip, PictureObject } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-trip-add-photo',
  templateUrl: './trip-add-photo.component.html',
  styleUrls: ['./trip-add-photo.component.css']
})
export class TripAddPhotoComponent extends TranslatableComponent implements OnInit {

  photoForm: FormGroup;
  idTrip: string;
  trip: Trip;
  currentActor: Actor;
  picture: string;

  constructor(private translateService: TranslateService, private authService: AuthService,
    private fb: FormBuilder, private tripService: TripService, private route: ActivatedRoute, private router: Router) {
    super(translateService);
  }

  ngOnInit() {
    this.idTrip = this.route.snapshot.params['id'];
    this.currentActor = this.authService.getCurrentActor();
    this.tripService.getTrip(this.idTrip).then((trip) => {
      this.trip = trip;
      if (trip.creator !== this.currentActor._id) {
        this.router.navigate(['/denied-access']);
      }
    }).catch((_) => {
      this.router.navigate(['/not-found']);
    });

    this.createForm();
  }

  createForm() {
    this.photoForm = this.fb.group({
      picture: [''],
      photo: [''],
    });

    this.picture = null;
  }

  onFileChange(event) {
    const reader = new FileReader();
    const showout = document.getElementById('showresult');
    let res;
    //this.photoChanged = true;
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
    let photoObject = new PictureObject();

    photoObject.Buffer = document.getElementById('showresult').textContent;
    photoObject.contentType = 'image/png';
    console.log(photoObject);
    this.tripService.addPictureToTrip(this.idTrip, photoObject).then((val) => {
      console.log(val);
      this.router.navigate(['/trips/display/' + this.idTrip]);
    }).catch((err) => {
      console.error(err);
    })
  }

  goBack(): void {
    this.router.navigate(['/trips/display/' + this.trip._id]);
  }

}
