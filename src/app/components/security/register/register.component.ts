import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  registrationForm: FormGroup;
  roleList: string[];

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { 
    this.roleList = this.authService.getRoles();
    this.createForm();
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
    this.authService.registerUser(this.registrationForm.value)
    .then(res => {
      console.log(res);
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

}
