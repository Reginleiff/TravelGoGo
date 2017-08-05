import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from './../../../services/firebase.service';
import { AuthService } from './../../../services/auth.service';
import { PlannerService } from './../../../services/planner.service';
import { ItineraryService } from './../../../services/itinerary.service';

import { User, ItineraryDayPlan, ItineraryOverview, Destination } from './../../../objects';
import { arrayRem } from './../../../functions';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-planner-list',
  templateUrl: './planner-list.component.html',
  styleUrls: ['./planner-list.component.css']
})
export class PlannerListComponent implements OnInit {

  
  overview: ItineraryOverview;
  itinerary: ItineraryDayPlan[];
  dayPlanView: ItineraryDayPlan;

  rForm: FormGroup;
  post: any;
  title: string = "";
  description: string = "";
  
  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private plannerService: PlannerService,
    private itineraryService: ItineraryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
    })

    if(this.itineraryService.editMode()){
      // set itinerary to edit in planner
      this.itineraryService.getEditItinerary();
      this.itinerary = this.overview.itinerary

      // pushing data to other components
      this.pushToDayPlanView(this.itinerary[0]);
      this.itineraryService.resetEditItinerary();

      //setting form values
      this.rForm = this.formBuilder.group({
        'title': [this.overview.title, Validators.required],
        'description': [this.overview.description, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
      })
    } else {
      this.instNewOverview(); // new plan mode
    }

    this.plannerService.infoToListSubject.subscribe((data) => {
      this.addDestination(this.dayPlanView, data);
      this.plannerService.pushToMaps(this.itinerary);
    })

    this.plannerService.deleteFromDayPlanSubject.subscribe((data) => {
      this.remDestination(this.dayPlanView, data);
      this.plannerService.pushToMaps(this.itinerary);
    })
  }

  pushToDayPlanView(dayPlan: ItineraryDayPlan){
    this.dayPlanView = dayPlan;
    this.plannerService.updateMarkersArray(dayPlan.destinations);
  }

  addDay(placeholder: string): void {
    this.addDayPlan(this.overview);
  }

  remDay(idx: number): void {
    this.removeDayPlan(this.overview, idx);
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
    this.rForm.reset(); // reset form
    this.overview = new ItineraryOverview(); //create new itinerary to view
    this.itinerary = this.overview.itinerary;
    this.addDayPlan(this.overview); //add the first day
    this.pushToDayPlanView(this.itinerary[0]);
    this.title="";
    this.description="";
  }


  // Itinerary Overview Methods
  addDayPlan(itineraryOverview: ItineraryOverview): void {
      itineraryOverview.itinerary.push(new ItineraryDayPlan(itineraryOverview.numDays));
      itineraryOverview.numDays++;
  }

  removeDayPlan(itineraryOverview: ItineraryOverview, idx: number): void {
      itineraryOverview.itinerary.splice(idx, 1);
      itineraryOverview.numDays--;
      this.updOrder(itineraryOverview);
  }

  updOrder(itineraryOverview: ItineraryOverview): void {
      for(let dp of itineraryOverview.itinerary){
          dp.day = itineraryOverview.itinerary.indexOf(dp);
      }
  }

  // Itinerary Dayplan Methods
  
  addDestination(itineraryDayPlan: ItineraryDayPlan, destination: Destination): void {
      itineraryDayPlan.destinations.push(destination);
      itineraryDayPlan.numDestinations++;
  }

  remDestination(itineraryDayPlan: ItineraryDayPlan, destination: Destination): void {
      if(arrayRem(itineraryDayPlan.destinations, destination)){
          itineraryDayPlan.numDestinations--;
      }
  }
}
