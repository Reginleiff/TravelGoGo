import { Injectable } from '@angular/core';

import { ItineraryOverview } from './../objects';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ItineraryService {

  public itineraryPlanSubject = new Subject<any>()
  public editItinerarySubject = new Subject<any>()
  editItinerary: ItineraryOverview;
  
  constructor() { 
    this.editItinerary = null;
  }

  pushItineraryPlan(itineraryPlan): void {
    this.itineraryPlanSubject.next(itineraryPlan);
  }

  pushToEdit(itinerary): void {
    this.editItinerarySubject.next(itinerary);
  }

  setEditItinerary(itinerary): void {
    this.editItinerary = itinerary;
  }

  resetEditItinerary(): void {
    this.editItinerary = null;
  }

  getEditItinerary(): ItineraryOverview {
    return this.editItinerary;
  }

  editMode(): boolean {
    return this.editItinerary != null;
  }
}
