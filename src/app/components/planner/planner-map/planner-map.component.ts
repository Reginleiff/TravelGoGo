import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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

export class PlannerMapComponent implements OnInit, AfterViewInit {

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


 @ViewChild("search")
 public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private plannerService: PlannerService,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper
  ) { }

  ngOnInit() {
    // data inputs
    this.plannerService.listToMapSubject.subscribe((data) => {
      this.itinerary = data;
    })
    this.plannerService.updMarkerSubject.subscribe((data) => {
      this.destinations = data;
      this.destinationsCount = data.length;
    })
    this.plannerService.infoToListSubject.subscribe((data) => {
      this.destinations.push(data);
      this.destinationsCount++;
    })
    
    //set google maps defaults
    this.zoom = 1;
    this.latitude = 1.2966;
    this.longitude = 103.7764;
    this.destinationsCount = 0;
    this.destinations = new Array<any>();

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          // create a new destination
          let tempPlace = new Destination(place);
          this.addDestination(tempPlace);
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });

    
  }

  ngAfterViewInit(){
    this.googleMapsAPIWrapper.getNativeMap().then((map) => {
      console.log('hi');
      console.log('native map', map);
    })
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

  addDestination(dest: Destination){
    this.plannerService.pushToInfo(dest);
  }
}
