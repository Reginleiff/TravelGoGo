import { Directive, AfterViewInit } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { PlannerService } from './../../../services/planner.service';
import { Destination, ItineraryDayPlan, Pair } from './../../../objects';
import { transitPairer, toLatLng } from './../../../functions';

declare var google: any;

@Directive({
  selector: 'app-planner-map-route',
})

export class PlannerMapRouteDirective {

  displayRendererRef: Array<any>;
  directionsService: any;
  // directionsDisplay: any;

  constructor(
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
    private mapsAPILoader: MapsAPILoader,
    private plannerService: PlannerService
  ) { 
    this.displayRendererRef = new Array<any>();
    
    this.plannerService.dayPlanToRouteSubject.subscribe((data: ItineraryDayPlan) => {
      console.log(data);
      let destinations = data.destinations;
      let numDestinations = data.numDestinations;
      let plotters = destinations.map((dest) => 
        toLatLng(dest)
      );
      console.log(plotters);
      this.clearRoutes();

      if(numDestinations >= 2){
        let destinationPairs: Array<Pair<google.maps.LatLng>> = transitPairer(destinations);
        this.plot(destinationPairs, this.displayRendererRef);
      }else {
        console.log("Insufficient destinations to plot a route!");
      }
    })
  }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      // this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsService = new google.maps.DirectionsService;
    })
  }

  displayRoute(destPair: Pair<google.maps.LatLng>, directionsDisplay: any): void {
    this.googleMapsAPIWrapper.getNativeMap().then((map) => {

      directionsDisplay.setMap(map);

      let request = {
        origin: destPair.getLeft(),
        destination: destPair.getRight(),
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }

      this.directionsService.route(request, (response, status) => {
        if(status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          console.log("Directions request failed due to " + status);
        }
      })
    })
  }

  clearRoutes(){
    this.googleMapsAPIWrapper.getNativeMap().then((map) => {
      for(let display of this.displayRendererRef) {
        console.log("clearing map route");
        display.setMap(map);
        display.setDirections({
          routes: []
        });
      }
    });
  }

  plot(destinationPairs: Array<any>, renders: Array<google.maps.DirectionsRenderer>) {
    let numRendersNeeded = destinationPairs.length - renders.length;
    if(numRendersNeeded > 0){
      for(var i = 0; i < numRendersNeeded; i++){
        let tempRender = new google.maps.DirectionsRenderer;
        this.displayRendererRef.push(tempRender);
      }
    }
    for(var j = 0; j < destinationPairs.length; j++){
      this.displayRoute(destinationPairs[j], this.displayRendererRef[j]);
    }
  }
}