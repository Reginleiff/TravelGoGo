import { arrayRem } from './functions';

export class Pair<E> {
    left: E;
    right: E;

    constructor(left: E, right: E){
        this.left = left;
        this.right = right;
    }

    getLeft(): E {
        return this.left;
    }
    
    getRight(): E {
        return this.right;
    }
}

export class User {
    name: string;
    uid: string;
    itineraries: string[];

    constructor(name: string, uid: string) {
        this.name = name;
        this.uid = uid;
        this.itineraries = new Array<string>();
    }

    addItineraryKey(key: string): void {
        this.itineraries.push(key);
    }

    remItineraryKey(key: string): void {
        let idx = this.itineraries.indexOf(key);
        if(idx > -1){
            this.itineraries.splice(idx, 1);
        }
    }
}

export class Destination {
    name: string;
    order: number;
    openingHours?: any;
    lat: number;
    lng: number;
    // photos: any;
    priceLevel?: number;
    openNow?: boolean;
    rating?: number;
    website?: string;

    constructor(place: google.maps.places.PlaceResult) {
        this.name = place.name;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        // this.photos = place.photos;
        if(place.price_level != null){
            this.priceLevel = place.price_level;
        }
        if(place.rating != null){
            this.rating = place.rating;
        }
        if(place.website != null){
            this.website = place.website;
        }
    }
}

export class ItineraryDayPlan {
    day: number;
    destinations: Destination[]; 
    numDestinations: number;

    constructor(day: number){
        this.destinations = new Array<Destination>();
        this.day = day;
        this.numDestinations = 0;
    }
}

export class ItineraryOverview {
    authorUID: string;
    authorName: string;
    title: string;
    description: string;
    numDays: number;
    budget: number;
    rating: number;
    itinerary: ItineraryDayPlan[];

    constructor(){
        this.numDays = 0;
        this.itinerary = new Array<ItineraryDayPlan>();
    }
}

export class Colour {
    hex: string;
    hasBeenUsed: boolean;
    
    constructor(hexCode: string){
        this.hex = hexCode;
        this.hasBeenUsed = false;
    }
    
    use(): void {
        this.hasBeenUsed = true;
    }

    getHex(): string {
        return this.hex;
    }
}

export const coloursArray = [ //TODO: Choose best colours and add more
      new Colour ('#90EE90'), // LightGreen
      new Colour ('#FFB6C1'), // LightPink 
      new Colour ('#20B2AA'), // LightSeaGreen 
      new Colour ('#87CEFA'), // LightSkyBlue 
      new Colour ('#778899'), // LightSlateGrey 
      new Colour ('#B0C4DE'), // LightSteelBlue 
      new Colour ('#ADD8E6'), // LightBlue 
      new Colour ('#7B68EE'), // MediumSlateBlue 
      new Colour ('#DB7093'), // PaleVioletRed 
      new Colour ('#CD5C5C'), // IndianRed
]