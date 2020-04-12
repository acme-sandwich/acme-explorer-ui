import { Component, OnInit } from '@angular/core';
import { Application } from '../../../models/application.model';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  private applications: Application[];
  dtOptions: DataTables.Settings = {};


  constructor(private applicationService: ApplicationService) {
    this.applications = applicationService.createApplications();
   }

   getComments(index: number) {
     return this.applications[index].comments;
   }

   getApplications() {
     return this.applications;
   }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 2
    }
  }

}
