import { Injectable } from '@angular/core';

import { ItineraryOverview } from './../objects';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ItineraryService {

  public itineraryPlanSubject = new Subject<any>();
  public editItinerarySubject = new Subject<any>();
  editItinerary: ItineraryOverview;
  jumpItineraryKey: string;
  
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
    this.editItinerary = null; //TODO: Set subject for reset
  }

  getEditItinerary(): ItineraryOverview {
    return this.editItinerary;
  }

  setJumpItineraryKey(key: string): void {
    this.jumpItineraryKey = key;
  }

  resetJumpItineraryKey(): void {
    this.jumpItineraryKey = null;
  }

  getJumpItineraryKey(): string {
    return this.jumpItineraryKey;
  }

  editMode(): boolean {
    return this.editItinerary != null;
  }

  jumpMode(): boolean {
    return this.jumpItineraryKey != null;
  }
}
