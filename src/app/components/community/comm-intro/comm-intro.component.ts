import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FirebaseService } from './../../../services/firebase.service';
import { ItineraryOverview, User } from './../../../objects';

@Component({
  selector: 'app-comm-intro',
  templateUrl: './comm-intro.component.html',
  styleUrls: ['./comm-intro.component.css']
})
export class CommIntroComponent implements AfterViewInit {

  lastViewed: ItineraryOverview;
  lastUploaded: ItineraryOverview;
  topRated: ItineraryOverview;

  constructor(private fbs: FirebaseService) { }

  ngAfterViewInit() {
    this.fbs.getUser().subscribe((user: User) => {
      this.fbs.af.object('/itineraries/' + user.lastViewed).subscribe(itinerary => {
        this.lastViewed = itinerary;
      });
    })
    this.fbs.getLastUploadedObs().subscribe((itineraryStringObj) => {
      this.fbs.af.object('/itineraries/' + itineraryStringObj.key).subscribe(itinerary => {
        this.lastUploaded = itinerary;
      });
    })
    this.fbs.getTopRatedObs().subscribe((itineraryStringObj) => {
      this.fbs.af.object('/itineraries/'+ itineraryStringObj.key).subscribe((itinerary) => {
        this.topRated = itinerary;
      })
    })
  }
}
