import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  @ViewChild('infoModal') infoModal: ModalComponent;

  constructor() { }

  ngOnInit() {
  }

  handlePopUp($event){
    this.infoModal.open();
  }

  closePopUp($event){
    this.infoModal.close();
  }

}
