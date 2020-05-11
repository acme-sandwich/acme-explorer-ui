import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService} from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends TranslatableComponent implements OnInit {

  private payPalConfig ?: PayPalConfig;
  private appId: string;
  private application: Application;

  constructor(private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router, private applicationService: ApplicationService) {
    super(translateService);
   }

  ngOnInit() {
    this.appId = this.route.snapshot.queryParams['id'];

    this.applicationService.getApplication(this.appId).then((val) => {
      this.application = val;
      console.log(val);
    });

    this.initConfig();
  }

  initConfig() {
    const applicationId = this.route.snapshot.queryParams['id'];
    const total = this.route.snapshot.queryParams['total'];

    this.payPalConfig = new PayPalConfig({
      currency: 'EUR',
      clientId: 'AVf-9sFPAGrhGJq8Kdv5KjVaO5oj3rA9IfstQUZMmGYPp1gzvRZzAemeOUXxsyly2K4wXLRCS0SF_IHE',
      createOrder: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [ {
          amount: {
            currency_code: 'EUR',
            value: total,
          },
        }]
      },
      advanced: {
        updateOrderDetails: {
          commit: true
        }
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('Transaction was approved, but not authorized yet', data, actions);
        actions.order.get().then(details => {
          console.log('Order details: ', details);
        });
      },
      onClientAuthorization: (data) => {
        alert(this.translateService.instant('order.placed'));
        this.acceptApplication(this.application);
        this.router.navigateByUrl('/');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('OnClick');
      }
    });
  }

  acceptApplication(application: Application)  {
    application.status = 'ACCEPTED';
    this.applicationService.updateApplication(application).then((val) => {
      console.log(val);
      this.router.navigate(['/']);
    }).catch((err) => {
      console.error(err);
    });
  }
}
