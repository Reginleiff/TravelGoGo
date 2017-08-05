import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlannerService } from './../../../services/planner.service';
import { Destination } from './../../../objects';

@Component({
  selector: 'app-planner-info',
  templateUrl: './planner-info.component.html',
  styleUrls: ['./planner-info.component.css']
})
export class PlannerInfoComponent implements OnInit {

  destinationToView: Destination;
  photoURL: any;

  constructor(private plannerService: PlannerService) { }

  ngOnInit() {
    this.plannerService.mapToInfoSubject.subscribe((data) => {
      this.destinationToView = data;
      // this.photoURL = this.destinationToView.photos[0].getUrl({
      //   'maxWidth': 300,
      //   'maxHeight': 300
      // })
    })
  }

  addToItinerary(dest: Destination){
    this.plannerService.pushToList(dest);
  }
}
