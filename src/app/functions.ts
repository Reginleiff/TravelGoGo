import { Pair, Destination } from './objects';

export function arrayRem(arr: Array<any>, item: any): boolean {
    var idx = arr.indexOf(item);
    if (idx > -1) {
        this.arr.splice(idx, 1);
        return true;
    }
    return false;
}

export function transitPairer(arr: Array<any>): Array<Pair<any>>{
    let numOfPairs = arr.length - 1;
    let toReturn = new Array<Pair<any>>();
    for(var i = 0; i < numOfPairs; i++){
        let tempPair = new Pair(arr[i], arr[i + 1]);
        toReturn.push(tempPair);
    }
    return toReturn;
}

export function toLatLng(dest: Destination): google.maps.LatLng {
  return new google.maps.LatLng(dest.lat, dest.lng);
}

