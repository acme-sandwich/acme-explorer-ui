import { Component, OnInit } from '@angular/core';

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
  }

}
