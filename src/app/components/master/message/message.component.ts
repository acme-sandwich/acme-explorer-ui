import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { MessageService } from '../../../services/message.service';
import { InfoMessage } from '../../../models/info-message.model';
import { Subscription } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends TranslatableComponent implements OnInit, OnDestroy {
  infoMessage: string;
  cssClass: string;
  subscription: Subscription;
  showMessage = true;

  constructor(private translateService: TranslateService, private messageService: MessageService) {
    super(translateService);
  }

  ngOnInit() {
    this.subscription = this.messageService.message.subscribe((data: InfoMessage) => {
      if (data) {
        this.infoMessage = data.infoMessage;
        this.cssClass = data.cssClass;
        this.showMessage = true;
      } else {
        this.showMessage = false;
      }
    });
  }

  hideMessage() {
    this.showMessage = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
