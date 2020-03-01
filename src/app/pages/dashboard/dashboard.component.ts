import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { EventsService } from 'src/app/services/events.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events: any = [];

  constructor(private eventService: EventsService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() { this.getEvents() }

  getEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
      console.log(this.events)
    }, error => {
      console.log(error);
    })
  }

  routeToCreateEvent(){
    this.router.navigate(['/expense-card/create']);
  }

  routeEventDetails(eventId){
    this.router.navigate(['/expense-details/41bfd5c7-f7cc-44d8-b524-d7b260420ba5']);
  }



}
