import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../services/firebase.service';
import { User, ItineraryDayPlan, ItineraryOverview, Destination } from './../../objects';

@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.css']
})
export class ItinerariesComponent implements OnInit {

  loaded: boolean = false;
  userItineraries: ItineraryOverview[] = new Array<ItineraryOverview>();
  itineraryPlanToView: ItineraryOverview;
  
  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getUserItineraries();
  }

  getUserItineraries(){
    this.firebaseService.getKeysObs().take(1).subscribe((data) => {
      this.userItineraries = new Array<ItineraryOverview>();
      data.forEach((elem) => {
        this.firebaseService.getItineraryObs(elem.$value).take(1).subscribe((itinerary) => {
          this.userItineraries.push(itinerary);
          if(this.userItineraries.length !== 0){
            this.pushToView(this.userItineraries[0]);
          }
        }) 
      })
    });
  }

  pushToView(plan: ItineraryOverview): void {
    this.itineraryPlanToView = plan;
  }
}
