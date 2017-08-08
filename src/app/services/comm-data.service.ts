import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ItineraryOverview } from './../objects';

@Injectable()
export class CommDataService {
  public listToViewSubject = new Subject<ItineraryOverview>();
  constructor() { }
  pushToView(itinerary: ItineraryOverview): void {
    this.listToViewSubject.next(itinerary);
  }
}
