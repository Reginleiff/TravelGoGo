import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, OnDestroy } from '@angular/core';
import { ItineraryOverview, ItineraryDayPlan, Destination } from './../../../../objects';
import { arrayRem, updateOrder } from './../../../../functions';

import { PlannerService } from './../../../../services/planner.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-planner-dayplan',
  templateUrl: './planner-dayplan.component.html',
  styleUrls: ['./planner-dayplan.component.css']
})

export class PlannerDayplanComponent implements OnChanges, OnInit {

  @Input() dayPlan: ItineraryDayPlan;
  @Input() disableAddDay: boolean;
  @Input() disableRemoveDay: boolean;
  @Output() addDayUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() remDayUpdate: EventEmitter<number> = new EventEmitter<number>();
  items: Destination[];

  constructor(
    private dragulaService: DragulaService,
    private plannerService: PlannerService
  ) { }

  ngOnInit(){
    this.dragulaService.setOptions('day-list', {
      removeOnSpill: false
    });
    this.dragulaService.dragend.subscribe(value => updateOrder(this.items));
    this.plannerService.triggerPlotRouteSubject.subscribe((command) => {
      if(command){
        this.plotRoute();
      }
    })
  }


  ngOnChanges(changes: SimpleChanges){
    if(changes['dayPlan']){
      this.items = this.dayPlan.destinations;
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

  remove(destination: Destination): void {
    this.plannerService.deleteFromDayPlan(destination);
  }
}
