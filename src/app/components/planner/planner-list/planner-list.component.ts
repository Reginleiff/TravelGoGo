import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../../services/firebase.service';
import { AuthService } from './../../../services/auth.service';
import { PlannerService } from './../../../services/planner.service';

import { User, ItineraryDayPlan, ItineraryOverview, Destination } from './../../../objects';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-planner-list',
  templateUrl: './planner-list.component.html',
  styleUrls: ['./planner-list.component.css']
})
export class PlannerListComponent implements OnInit {

  
  overview: ItineraryOverview;
  itinerary: ItineraryDayPlan[];
  dayPlanView: ItineraryDayPlan;
  testArr: Array<any> = new Array<any>();

  rForm: FormGroup;
  post: any;
  title: string = "";
  description: string = "";
  
  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private plannerService: PlannerService
  ) { 
    this.rForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
    })
    this.instNewOverview();
    this.plannerService.infoToListSubject.subscribe((data) => {
      this.dayPlanView.addDestination(data);
      this.plannerService.pushToMaps(this.itinerary);
    })
  }

  ngOnInit() {
  }

  pushToDayPlanView(dayPlan: ItineraryDayPlan){
    this.dayPlanView = dayPlan;
    this.plannerService.updateMarkersArray(dayPlan.destinations);
  }

  addDay(placeholder: string): void {
    this.overview.addDayPlan();
  }

  remDay(idx: number): void {
    this.overview.removeDayPlan(idx);
  }

  addOverview(data): void {
    this.overview.title = data.title;
    this.overview.description = data.description;
    this.overview.authorUID = this.authService.getUID();
    this.overview.authorName = this.authService.getUserName();
    this.firebaseService.addItinerary(this.overview);
    this.instNewOverview();
  }

  instNewOverview(): void {
    this.rForm.reset();
    this.overview = new ItineraryOverview();
    this.itinerary = this.overview.itinerary;
    this.pushToDayPlanView(this.itinerary[0]);
    this.title="";
    this.description="";
  }
}
