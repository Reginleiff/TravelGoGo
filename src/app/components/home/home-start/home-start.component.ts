import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from './../../../services/firebase.service';
import { ItineraryService } from './../../../services/itinerary.service';
import { User, ItineraryOverview } from './../../../objects';

@Component({
  selector: 'app-home-start',
  templateUrl: './home-start.component.html',
  styleUrls: ['./home-start.component.css']
})
export class HomeStartComponent implements OnInit {

  itinerary: ItineraryOverview; // last planned
  
  constructor(
    private fbs: FirebaseService,
    private its: ItineraryService
  ) { }

  ngOnInit() {
    this.fbs.getUser().subscribe((user: User) => {
      this.fbs.af.object('/itineraries/' + user.lastPlanned).subscribe(itinerary => {
        this.itinerary = itinerary;
      });
    })
  }

  lastPlanned(){
    this.its.setJumpItineraryKey(this.itinerary.$key);
  }

  test(){
    console.log(this.itinerary);
  }

  test2(){
    console.log('jumpmode', this.its.jumpMode());
  }
}
