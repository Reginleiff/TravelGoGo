import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, ItineraryDayPlan, ItineraryOverview, Destination } from './../../../objects';

import { ItineraryService } from './../../../services/itinerary.service';
import { FirebaseService } from './../../../services/firebase.service';

@Component({
  selector: 'app-itinerary-view',
  templateUrl: './itinerary-view.component.html',
  styleUrls: ['./itinerary-view.component.css']
})
export class ItineraryViewComponent implements OnInit {

  planToView: ItineraryOverview;
  itineraryToView: ItineraryDayPlan[];
  dayPlanToView: ItineraryDayPlan;
  destinationsToView: Destination[];
  
  constructor(
    private itineraryService: ItineraryService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(){
    this.itineraryService.itineraryPlanSubject.subscribe((data) => {
      this.planToView = data;
      this.itineraryToView = data.itinerary;
      this.dayPlanToView = data.itinerary[0];
      this.destinationsToView = this.dayPlanToView.destinations;
    })
  }

  pushToView(idx: number): void {
    this.dayPlanToView = this.itineraryToView[idx];
    this.destinationsToView = this.dayPlanToView.destinations;
  }

  delete(itinerary): void {
    this.firebaseService.deleteItinerary(itinerary.$key);
    this.planToView = null;
    this.itineraryToView = null;
    this.dayPlanToView = null;
    this.destinationsToView = null;
  }

  edit(itinerary: ItineraryOverview): void {
    this.itineraryService.setEditItinerary(itinerary);
  }
}
