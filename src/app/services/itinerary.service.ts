import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class ItineraryService {

  public itineraryPlanSubject = new Subject<any>()
  
  constructor() { }

  pushItineraryPlan(itineraryPlan){
    this.itineraryPlanSubject.next(itineraryPlan);
  }
}
