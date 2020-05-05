import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: [''],
      role: [''],
      banned: ['false']
    });
  }

  onRegister() {
    const actor = this.registrationForm.value;
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
      this.authService.registerUser(actor)
      .then(res => {
        console.log(res);
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      });
    }
    
  }

}
