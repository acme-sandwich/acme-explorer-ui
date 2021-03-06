import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends TranslatableComponent implements OnInit {

  private email: string;
  private errorMessage: string;
  private returnUrl: string;

  constructor(private authService: AuthService, private translateService: TranslateService,
    private router: Router, private route: ActivatedRoute) { 
    super(translateService);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).then(_ => {
      form.reset();
      this.email = email;
      this.router.navigateByUrl(this.returnUrl);
    }).catch((error) => {
      console.log(error);
      this.errorMessage = error;
    });
  }

}
