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

export class ReviewCommentPair {
    review: Review;
    comments: Array<Comment>;
    constructor(review: Review){
        this.review = review;
        this.comments = new Array<Comment>();
    }
    addComment(comment: Comment){
        this.comments.push(comment);
    }
}

export class User {
    name: string;
    uid: string;
    itineraries: Array<string>;
    $key?: string;

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
    lat: number;
    lng: number;
    openingHours?: any; // array of 
    photos?: any;
    priceLevel?: number;
    openNow?: boolean;
    rating?: number;
    website?: string;
    vicinity?: string;
    address?: string;
    phone?: string;
    $key?: string;

    constructor(place: google.maps.places.PlaceResult) {
        this.name = place.name;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        if(place.opening_hours != null){
            this.openingHours = place.opening_hours.periods;
            this.openNow = place.opening_hours.open_now;
        }
        console.log('opening hours', this.openingHours);
        this.photos = place.photos;
        this.priceLevel = place.price_level;
        this.rating = place.rating;    
        this.website = place.website;
        this.vicinity = place.vicinity;
        this.address = place.formatted_address;
        this.phone = place.international_phone_number;
    }
}

export class ItineraryDayPlan {
    day: number;
    destinations: Array<Destination>; 
    numDestinations: number;
    $key?: string;

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
    itinerary: Array<ItineraryDayPlan>;
    reviews: Array<string>;
    $key?: string;

    constructor(){
        this.numDays = 0;
        this.itinerary = new Array<ItineraryDayPlan>();
        this.rating = 0;
    }
}

export class Review {
    authorUID: string;
    authorName: string;
    text: string;
    rating: number;
    date: number;
    comments: Array<string>;
    $key?: string;

    constructor(uid: string, name: string, text: string, rating: number){
        this.authorUID = uid;
        this.authorName = name;
        this.text = text;
        this.rating = rating;
    }
}

export class Comment {
    authorUID: string;
    authorName: string;
    recipientUID: string;
    recipientName: string;
    prevText: string;
    text: string;
    date: number;
    $key?: string;

    constructor(auid, aname, ruid, rname, text, prevText){
        this.authorUID = auid;
        this.authorName = aname;
        this.recipientUID = ruid;
        this.recipientName = rname;
        this.text = text;
        this.prevText = prevText;
        this.date = Date.now();
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

    reset(): void {
        this.hasBeenUsed = false;
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