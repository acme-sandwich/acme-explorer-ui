import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  today: number;
  numClients: number;

  constructor() { }

  ngOnInit() {
    this.today = Date.now();
    this.numClients = 122222;
    $('.back-to-top').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });
  }

}
