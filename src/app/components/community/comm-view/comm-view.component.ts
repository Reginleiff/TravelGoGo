import { Component, OnInit } from '@angular/core';
import { ItineraryOverview, ItineraryDayPlan, Destination } from './../../../objects'
import { CommDataService } from './../../../services/comm-data.service';

@Component({
  selector: 'app-comm-view',
  templateUrl: './comm-view.component.html',
  styleUrls: ['./comm-view.component.css']
})
export class CommViewComponent implements OnInit {

  itineraryToView: ItineraryOverview;
  dayplansToView: Array<ItineraryDayPlan>;
  destinationsToView: Array<Destination>;
  constructor(private cds: CommDataService) { }

  ngOnInit() {
    this.cds.listToViewSubject.subscribe((itinerary: ItineraryOverview) => {
      this.itineraryToView = itinerary;
      this.dayplansToView = itinerary.itinerary;
      this.destinationsToView = itinerary.itinerary[0].destinations;
    });
  }

  pushToView(idx: number): void {
    this.destinationsToView = this.dayplansToView[idx].destinations;
  }
}
