import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  registrationForm: FormGroup;
  roleList: string[];
  adminConnected = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { 
    this.roleList = this.authService.getRolesForAdminActorCreation();
    this.createForm();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        if(data.adminConnected){
          this.adminConnected = true;
        }else{
          this.adminConnected = false;
        }
    });
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: [''],
      address: ['', Validators.maxLength(50)],
      role: [''],
      banned: ['false']
    });
  }

  onRegister() {
    const actor = this.registrationForm.value;
    // Se va a regisrar un nuevo explorador
    if(!this.adminConnected) {
      actor.role = ['EXPLORER'];
      this.authService.registerUser(actor)
      .then(res => {
        console.log(res);
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      });
    } else {
      // El administrador va a registrar un Manager, Auditor, Sponsor u otro Administrador
      this.authService.registerUser(actor)
      .then(res => {
        console.log(res);
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
    }
    
  }

}
