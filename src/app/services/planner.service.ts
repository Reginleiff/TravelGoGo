import { Injectable } from '@angular/core';

import { Destination, ItineraryDayPlan } from './../objects';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlannerService {

  public mapToInfoSubject = new Subject<any>();
  public listToMapSubject = new Subject<any>();
  public infoToListSubject = new Subject<any>();
  public dayPlanToRouteSubject = new Subject<any>();
  public updMarkerSubject = new Subject<any>();

  constructor() { }

  pushToInfo(dest: Destination): void {
    this.mapToInfoSubject.next(dest);
  }

  pushToList(dest: Destination): void {
    this.infoToListSubject.next(dest);
  }

  pushToMaps(itinerary): void {
    this.listToMapSubject.next(itinerary);
  }

  pushToRoute(idp: ItineraryDayPlan){
    this.dayPlanToRouteSubject.next(idp);
  }

  updateMarkersArray(arr: Array<any>){
    this.updMarkerSubject.next(arr);
  }
}
