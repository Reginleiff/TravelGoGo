import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, OnDestroy } from '@angular/core';
import { ItineraryOverview, ItineraryDayPlan, Destination } from './../../../../objects';

import { PlannerService } from './../../../../services/planner.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-planner-dayplan',
  templateUrl: './planner-dayplan.component.html',
  styleUrls: ['./planner-dayplan.component.css']
})

export class PlannerDayplanComponent implements OnChanges, OnDestroy {

  @Input() dayPlan: ItineraryDayPlan;
  @Output() addDayUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() remDayUpdate: EventEmitter<number> = new EventEmitter<number>();
  items: Destination[];
  
  constructor(
    private dragulaService: DragulaService,
    private plannerService: PlannerService
  ) {
    dragulaService.setOptions('day-list', {
      removeOnSpill: true
    });
    dragulaService.removeModel.subscribe((value) => {
      this.updateOrder();
    });
    dragulaService.dropModel.subscribe((value) => {
      this.updateOrder();
    });
  }


  ngOnChanges(changes: SimpleChanges){
    if(changes['dayPlan']){
      this.items = this.dayPlan.destinations;
      this.updateOrder();
      // this.plotRoute();
    }
  }

  ngOnDestroy(){
    this.dragulaService.destroy('day-list');
  }

  addDay(): void {
    this.addDayUpdate.emit("addday");
  }

  remDay(): void {
    this.remDayUpdate.emit(this.dayPlan.day);
  }

  plotRoute(): void {
    this.plannerService.pushToRoute(this.dayPlan);
  }

  /**
   * updates the order attribute of each item in the list
   */
  updateOrder(): void {
    for(var i = 0; i < this.items.length; i++){
      this.items[i].setOrder(i);
    }
  }
}
