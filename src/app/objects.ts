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
    photos: any;
    priceLevel: number;
    openNow?: boolean;
    rating: number;
    website?: string;

    constructor(place: google.maps.places.PlaceResult) {
        this.name = place.name;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.photos = place.photos;
        this.priceLevel = place.price_level;
        this.rating = place.rating;
        this.website = place.website;
    }

    setOrder(idx: number){
        this.order = idx;
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

    addDestination(destination: Destination): void {
        this.destinations.push(destination);
        this.numDestinations++;
    }

    remDestination(destination: Destination): void {
        if(arrayRem(this.destinations, destination)){
            this.numDestinations--;
        }
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
        this.addDayPlan();
    }

    addDayPlan(): void {
        this.itinerary.push(new ItineraryDayPlan(this.numDays));
        this.numDays++;
    }

    removeDayPlan(idx: number): void {
        this.itinerary.splice(idx, 1);
        this.numDays--;
        this.updOrder();
    }

    updOrder(): void {
        for(let dp of this.itinerary){
            dp.day = this.itinerary.indexOf(dp);
        }
    }
}