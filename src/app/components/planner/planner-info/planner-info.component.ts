import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlannerService } from './../../../services/planner.service';
import { Destination } from './../../../objects';

@Component({
  selector: 'app-planner-info',
  templateUrl: './planner-info.component.html',
  styleUrls: ['./planner-info.component.css']
})
export class PlannerInfoComponent implements OnInit {

  @Output() closePopUpEmitter = new EventEmitter<boolean>();
  destinationToView: Destination;
  showOpenNow: boolean;
  openNow: boolean;
  photoURL: any;

  constructor(private plannerService: PlannerService) { }

  ngOnInit() {
    this.plannerService.mapToInfoSubject.subscribe((data: google.maps.places.PlaceResult) => {
      this.destinationToView = this.createDestination(data);
      if(this.destinationToView.openNow != null){
        this.photoURL = this.destinationToView.photos[0];
        this.showOpenNow = true;
        this.openNow = this.destinationToView.openNow;
      } else {
        this.showOpenNow = false;
      }
    })
  }

  createDestination(googlePlace: google.maps.places.PlaceResult): Destination{
    return new Destination(googlePlace);
  }

  addToItinerary(dest: Destination){
    this.plannerService.pushToList(this.destinationToView);
    this.destinationToView = null;
    this.closePopUpEmitter.emit(true);
  }
}
