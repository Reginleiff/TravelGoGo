import { Directive, AfterViewInit, Input, ElementRef } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { PlannerService } from './../../../services/planner.service';
import { Destination, ItineraryDayPlan, Pair, Colour, coloursArray } from './../../../objects';
import { transitPairer, toLatLng } from './../../../functions';

declare var google: any;

@Directive({
  selector: 'app-planner-map-route',
})

export class PlannerMapRouteDirective {

  displayRendererRef: Array<any>;
  currentDisplayNeeded: number;
  directionsService: any;
  currentDirectionPair: number;
  @Input()directionsElementRef: ElementRef;

  constructor(
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
    private mapsAPILoader: MapsAPILoader,
    private plannerService: PlannerService
  ) { 
    this.displayRendererRef = new Array<any>();
    this.currentDirectionPair = 0;
    this.directionsElementRef = this.plannerService.directionsElementRef;
    this.plannerService.dayPlanToRouteSubject.subscribe((data: ItineraryDayPlan) => {
      let destinations = data.destinations;
      let numDestinations = data.numDestinations;
      let plotters = destinations.map((dest) => 
        toLatLng(dest)
      );
      this.clearRoutes();

      // only compute routes when there are two or more destinations
      if(numDestinations >= 2){
        let destinationPairs: Array<Pair<google.maps.LatLng>> = transitPairer(destinations);
        this.plot(destinationPairs, this.displayRendererRef);
      } else {
        console.log("Insufficient destinations to plot a route!");
      }
    })

    // clear routes upon switching days
    this.plannerService.updMarkerSubject.subscribe((data) => {
      this.clearRoutes();
    })
  }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      // this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsService = new google.maps.DirectionsService;
    })
  }

  /**
   * plots a route between the start and end coordinates in destPair
   * @param destPair pairing of start and end coordinates
   * @param directionsDisplay an instance of a DirectionsRenderer
   */
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
          console.log("Directions request from failed due to " + status);
        }
      })
    })
  }
  /**
   * clearRoutes clears each route from every renderer
   */
  clearRoutes(){
    this.googleMapsAPIWrapper.getNativeMap().then((map) => {
      for(let display of this.displayRendererRef) {
        display.setMap(map);
        display.setPanel(null);
        display.setDirections({
          routes: []
        });
      }
    });
    for(let colour of coloursArray){
      colour.reset();
    }
  }

  /**
   * plot takes an array of destination pairings and uses any available renderers to plot a route for each pairing
   * a new renderer is created for every pair is there are insufficient existing renderers
   * @param destinationPairs array of destination pairings (a, b), (b, c) ...
   * @param renders array of renderers that have been created
   */
  plot(destinationPairs: Array<any>, renders: Array<google.maps.DirectionsRenderer>) {
    let numRendersNeeded = destinationPairs.length - renders.length;
    this.currentDisplayNeeded = destinationPairs.length;
    if(numRendersNeeded > 0){
      for(var i = 0; i < numRendersNeeded; i++){
        let tempRender = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: this.getRandomColour()
          },
          suppressMarkers: true
        });
        this.displayRendererRef.push(tempRender);
      }
    }
    for(var j = 0; j < destinationPairs.length; j++){
      this.displayRoute(destinationPairs[j], this.displayRendererRef[j]);
      if(j == destinationPairs.length - 1){
        setTimeout(() => this.displayDirections(), 1000);
      }
    }   
  }

  /**
   * provides a random colour from colours array, but no guarantee of no repeat
   */
  getRandomColour(): string {
    let colour: Colour = coloursArray[Math.floor(Math.random() * coloursArray.length)];
    if(colour.hasBeenUsed){
      return this.getRandomColour();
    } else {
      colour.use();
      return colour.getHex();
    }
  }

  /**
   * displays all directions from rendered onto div
   */
  displayDirections(): void {
    for(var i = 0; i < this.currentDisplayNeeded; i++){
      this.displayRendererRef[i].setPanel(this.directionsElementRef.nativeElement);
    }
  }
}