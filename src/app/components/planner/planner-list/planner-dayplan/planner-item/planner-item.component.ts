import { Component, OnInit, Input } from '@angular/core';
import { PlannerService } from './../../../../../services/planner.service';
import { Destination } from './../../../../../objects';

@Component({
  selector: 'app-planner-item',
  templateUrl: './planner-item.component.html',
  styleUrls: ['./planner-item.component.css']
})
export class PlannerItemComponent implements OnInit {

  @Input() dest: Destination;
  possible: string;
  id: string;
  
  constructor(private pls: PlannerService) { 
    this.possible = "abcdefghijklmnopqrstuvwxyz"
  }

  ngOnInit() {
    this.generateID();
  }

  remove(): void {
    this.pls.deleteFromDayPlan(this.dest);
  }

  generateID(): void {
    this.id = "";
    while(this.id.length != 27){
      this.id += this.possible[Math.floor(Math.random() * this.possible.length)];
    }
  }
}
