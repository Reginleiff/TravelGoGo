import { Component, ElementRef, NgZone, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { PlannerService } from './../../../services/planner.service';
import { Destination, ItineraryDayPlan } from './../../../objects';

import { FormControl } from "@angular/forms";
//imports Main Google maps API library @AGM
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
//Imports Google maps typescripting
import {} from '@types/googlemaps';

@Component({
  selector: 'app-planner-map',
  templateUrl: './planner-map.component.html',
  styleUrls: ['./planner-map.component.css']
})

export class PlannerMapComponent implements OnInit {

  @Output() popUpEmitter = new EventEmitter<boolean>();
  testArr: Array<any> = new Array<any>();

  // Defines variables needed for app to function
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  directionsService: any;
  directionsDisplay: any;

  destinations: Array<any>;
  destinationsCount: number;
  itinerary: Array<ItineraryDayPlan>;


 @ViewChild("search") public searchElementRef: ElementRef;
 @ViewChild("directionsList") public dirList: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private plannerService: PlannerService,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper
  ) { }

  ngOnInit() {
    // data inputs
    this.plannerService.updMarkerSubject.subscribe((data) => {
      this.destinations = data;
      this.destinationsCount = data.length;
    })

    //set google maps defaults
    this.zoom = 1;
    this.latitude = 1.2966;
    this.longitude = 103.7764;
    this.destinationsCount = 0;
    this.destinations = new Array<any>();

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let result: google.maps.places.PlaceResult = autocomplete.getPlace(); //get the place result
          this.popUpEmitter.emit(true);

          if (result.geometry === undefined || result.geometry === null) {
            return; //verify result
          }
          this.searchControl = new FormControl(); // resetting form
          this.addDestination(result); // add destination to list
          this.latitude = result.geometry.location.lat(); // set latitude, longitude and zoom
          this.longitude = result.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });


  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private addDestination(res: google.maps.places.PlaceResult){
    this.plannerService.pushToInfo(res);
  }
}
