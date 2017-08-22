import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ItineraryOverview, ItineraryDayPlan, Destination }from './../../../objects';
import { ItineraryService } from './../../../services/itinerary.service';


import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})
export class ItineraryListComponent implements OnInit {

  @Input() itineraries: ItineraryOverview[];

  constructor(
    private itineraryService: ItineraryService,
  ) { }

  ngOnInit() {
    
  }

  pushToView(plan: ItineraryOverview): void {
    this.itineraryService.pushItineraryPlan(plan);
  }
}
