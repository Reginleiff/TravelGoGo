import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  popUp: boolean; // boolean to control popup

  constructor() { }

  ngOnInit() {
  }

  handlePopUp($event){
    // $event will = true --> code the things you want to do here
    console.log('wayne event triggered');
    this.popUp = $event; // example this will set a pop up variable to be true (it will stay true though so you need to reset it to false)
  }

}
