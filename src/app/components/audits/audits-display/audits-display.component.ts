import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuditsService } from 'src/app/services/audits.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { Audit } from 'src/app/models/audit.model';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-audits-display',
  templateUrl: './audits-display.component.html',
  styleUrls: ['./audits-display.component.css']
})
export class AuditsDisplayComponent extends TranslatableComponent implements OnInit {
  id: String;
  private currentActor: Actor;
  audit: Audit;
  trip: Trip;
  auditor: Actor;
  
  constructor(private authService: AuthService, private auditService: AuditsService, private router: Router,
    private route: ActivatedRoute, private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.currentActor = this.authService.getCurrentActor();
    console.log(this.route);
    // Recover audit
    this.auditService.getAudit(this.id, '5e9d9ec976ae720012655444') // this.currentActor._id
      .then((val) => {
        this.audit = val;
        if (!this.currentActor || !this.currentActor._id) { //|| this.currentActor.id != this.sponsorship.sponsor
          this.router.navigate(['/denied-access']);
        } else {
          this.auditService.getAuditCreator(this.audit.auditor)
            .then((val1) => {
              this.auditor = val1;
            }).catch((err1) => {
              console.log(err1);
            });
          this.auditService.getAuditTrip(this.audit.trip)
          .then((val2) => {
            this.trip = val2;
          }).catch((err1) => {
            console.log(err1);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

}
