import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../services/actor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent extends TranslatableComponent implements OnInit {
  private actor: Actor;
  private currentActor: String;
  id: String;
  actorForm: FormGroup;

  constructor(private actorService: ActorService, private router: Router, private route: ActivatedRoute, 
    private translateService: TranslateService, private authService: AuthService, private fb: FormBuilder) {
      super(translateService);
     }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.actorForm = this.fb.group({
      id: [''],
      role: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [''],
      phone: ['', Validators.pattern('[0-9]+')],
      address: ['', Validators.maxLength(50)]
    });

    this.currentActor = this.authService.getCurrentActor().id;
    this.id = this.route.snapshot.params['id'];
    this.actorService.getActor(this.id).then((val) => {
      this.actor = val;
      console.log(JSON.stringify(val));
      if (val) {
        this.actorForm.controls['id'].setValue(val._id);
        this.actorForm.controls['role'].setValue(val.role);
        this.actorForm.controls['name'].setValue(val.name);
        this.actorForm.controls['surname'].setValue(val.surname);
        this.actorForm.controls['email'].setValue(val.email);
        this.actorForm.controls['phone'].setValue(val.phone);
        this.actorForm.controls['address'].setValue(val.address);
      }
    });
  }

  onEditProfile() {
    const formModel = this.actorForm.value;

    this.actorService.updateActor(formModel).then((val) => {
      console.log(val);
      this.router.navigate(['/actors/display/' + this.actor._id]);
    }).catch((err) => {
      console.error(err);
    });
  }

  goBack(): void {
    this.router.navigate(['/actors/display/' + this.actor._id]);
  }

}
