import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItineraryOverview, ItineraryDayPlan, Destination, User } from './../../../objects'
import { CommDataService } from './../../../services/comm-data.service';
import { FirebaseService } from './../../../services/firebase.service';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-comm-view',
  templateUrl: './comm-view.component.html',
  styleUrls: ['./comm-view.component.css']
})
export class CommViewComponent implements OnInit {

  itineraryToView: ItineraryOverview;
  dayplansToView: Array<ItineraryDayPlan>;
  destinationsToView: Array<Destination>;
  timeout: boolean;

  constructor(
    private cds: CommDataService,
    private fbs: FirebaseService,
    private ats: AuthService
  ) { }

  ngOnInit() {
    if(this.cds.accessed){
      this.itineraryToView = this.cds.storedItinerary;
      this.dayplansToView = this.itineraryToView.itinerary;
      this.destinationsToView = this.dayplansToView[0].destinations;
    }
    this.cds.listToViewSubject.subscribe((itinerary: ItineraryOverview) => {
      this.itineraryToView = itinerary;
      this.dayplansToView = itinerary.itinerary;
      this.destinationsToView = itinerary.itinerary[0].destinations;
    });
  }

  pushToView(idx: number): void {
    this.destinationsToView = this.dayplansToView[idx].destinations;
  }

  add(i: ItineraryOverview){
    this.preventCopyAbuse();
    let newItinerary = new ItineraryOverview();
    newItinerary.authorName = this.ats.userName;
    newItinerary.authorUID = this.ats.uid;
    newItinerary.post = false;
    newItinerary.delPostKey = null;
    newItinerary.itinerary = i.itinerary;
    newItinerary.description = i.description + " ";
    newItinerary.title = i.title + " (copied from " + i.authorName + ")";
    this.fbs.addItinerary(newItinerary);
  }

  preventCopyAbuse(){
    this.timeout = true;
    setTimeout(() => {
      this.timeout = false;
    }, 5000);
  }
}
