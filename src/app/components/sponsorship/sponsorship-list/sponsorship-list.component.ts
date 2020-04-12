import { Component, OnInit } from '@angular/core';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.css']
})
export class SponsorshipListComponent extends TranslatableComponent implements OnInit {
  data: any[];
  actor: Actor;

  constructor(private sponsorshipService: SponsorshipService, private router: Router, private route: ActivatedRoute, 
    public authService: AuthService, private translateService: TranslateService) {
      super(translateService);
  }

  ngOnInit() {
    this.sponsorshipService.getSponsorships()
      .then((val) => {
        this.data = val;
      })
      .catch((err) => console.error(err.message));
    this.actor = this.authService.getCurrentActor();
  }

  newSponsorship() {
    this.router.navigate(['/sponsorships/new']);
  }
}
