import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuditsService } from 'src/app/services/audits.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-audits-list',
  templateUrl: './audits-list.component.html',
  styleUrls: ['./audits-list.component.css']
})
export class AuditsListComponent extends TranslatableComponent implements OnInit {

  data: any[];
  actor: Actor;

  constructor(private auditService: AuditsService, private router: Router, private route: ActivatedRoute, 
    public authService: AuthService, private translateService: TranslateService) { 
      super(translateService);
    }
    

  ngOnInit() {
    this.actor = this.authService.getCurrentActor();
    this.auditService.getAuditsAuditor('5e9d9ec976ae720012655444')//this.actor._id
      .then((val) => {
        this.data = val;
      })
      .catch((err) => console.error(err.message));
  }

}
