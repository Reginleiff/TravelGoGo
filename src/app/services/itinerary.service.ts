import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class ItineraryService {

  public itineraryPlanSubject = new Subject<any>()
  public editItinerarySubject = new Subject<any>()
  editItinerary;
  
  constructor() { 
    this.editItinerary = null;
  }

  pushItineraryPlan(itineraryPlan){
    this.itineraryPlanSubject.next(itineraryPlan);
  }

  pushToEdit(itinerary){
    this.editItinerarySubject.next(itinerary);
  }

  setEditItinerary(itinerary){
    this.editItinerary = itinerary;
  }

  resetEditItinerary(){
    this.editItinerary = null;
  }

  getEditItinerary(){
    return this.editItinerary;
  }

  editMode(){
    return this.editItinerary != null;
  }
}
