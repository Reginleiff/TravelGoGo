import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from './../../../services/firebase.service';
import { CommDataService } from'./../../../services/comm-data.service';
import { ItineraryOverview, User } from './../../../objects';

@Component({
  selector: 'app-comm-intro',
  templateUrl: './comm-intro.component.html',
  styleUrls: ['./comm-intro.component.css']
})
export class CommIntroComponent implements OnInit {

  @Output() hideIntroEmit = new EventEmitter<boolean>();
  load: number;
  loadPercent: number;
  lastViewed: ItineraryOverview;
  lastUploaded: ItineraryOverview;
  topRated: ItineraryOverview;
  user: User;

  constructor(
    private fbs: FirebaseService,
    private cds: CommDataService
  ) { 
    this.loadPercent = 0;
    this.load = 0;
  }

  ngOnInit() {
    this.fbs.getUser().take(1).subscribe((user: User) => {
      this.fbs.af.object('/itineraries/' + user.lastViewed).take(1).subscribe(itinerary => {
        this.lastViewed = itinerary;
        // this.componentLoaded();
      });
    })
    this.fbs.getLastUploadedObs().take(1).subscribe((itineraryStringObj) => {
      this.fbs.af.object('/itineraries/' + itineraryStringObj.key).take(1).subscribe(itinerary => {
        this.lastUploaded = itinerary;
        // this.componentLoaded();
      });
    })
    this.fbs.getTopRatedObs().take(1).subscribe((itineraryStringObj) => {
      this.fbs.af.object('/itineraries/'+ itineraryStringObj.key).take(1).subscribe((itinerary) => {
        this.topRated = itinerary;
        // this.componentLoaded();
      })
    })
  }

  componentLoaded(){
    this.load++;
    this.updateLoadPercent();
  }

  updateLoadPercent(){
    this.loadPercent = Math.floor(this.load / 3 * 100);
  }

  pushToView(itinerary: ItineraryOverview){
    this.cds.pushToView(itinerary);
    this.hideIntro();
  }

  hideIntro(){
    // this.hideIntroEmit.emit(true);
  }
}
