import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';

import { User, ItineraryOverview } from './../objects';

@Injectable()
export class FirebaseService{
  userUID: string;

  userItineraries: ItineraryOverview[] = new Array<ItineraryOverview>();

  constructor(
    private af: AngularFireDatabase,
    private authService: AuthService
  ) { 
    this.authService.userObs.subscribe((user) => {
      this.userUID = user.uid;
    })
  }

  /**
   * returns all itineraries
   * precondition: itineraries is not empty
   */
  getAllItineraryObs(): FirebaseListObservable<any[]> {
    let allItineraries = this.af.list('/itineraries') as FirebaseListObservable<any[]>;
    return allItineraries;
  }

  getItineraryObs(key: string): FirebaseObjectObservable<any>{
    return this.af.object('/itineraries/' + key);
  }

  /**
   * returns the keys of all user itineraries
   * precondition: keys is not empty
   */
  getKeysObs(): FirebaseListObservable<any[]> {
    let userItineraryKeys = this.af.list('/users/' + this.userUID + '/itineraries') as FirebaseListObservable<any[]>;
    return userItineraryKeys;
  }

  /**
   * adds itinerary object to itinerary database
   */
  addItinerary(itinerary: ItineraryOverview): void {
    let refKey = this.af.database.ref('itineraries').push(itinerary).key;
    let uid = this.authService.user.uid;
    let username = this.authService.user.displayName;

    this.af.database.ref('users/' + uid).once('value').then((snapshot) => {
      if(!snapshot.exists()){
        this.addNewUser(uid, username);
      }
      this.addToUserItineraries(uid, refKey);
    })
  }

  /**
   * delete itinerary from database
   */
  deleteItinerary(key: string): void {
    this.af.database.ref('itineraries').child(key).remove();
    this.deleteUserItinerary(key);
  }

  /**
   * delete itinerary from user list
   */
  deleteUserItinerary(key: string): void {
    const getKeys = new Promise(resolve => {
      this.getKeysObs().subscribe(data => {
        resolve(data);
      })
    }).then((result: Array<any>) => new Promise(resolve => {
      for(var i = 0; i < result.length; i++){
        if(result[i].$value == key){
          resolve(result[i].$key);
        }
      }
    })).then((result: string) => {
      this.af.database.ref('users').child(this.userUID).child('itineraries').child(result).remove();
    });
  }

  /**
   * adds itinerary reference key to user itinerary keys list
   * pre-condition: user already exists in database
   */
  addToUserItineraries(uid: string, itineraryKey: string): void {
    this.af.database.ref('users/' + uid + '/itineraries').push(itineraryKey);
  }

  // adds a new user to the database
  addNewUser(uid: string, username: string): void {
    this.af.database.ref('users/' + uid).push(new User(username, uid));
    console.log("New User: " + username + " was added to the user database!");
  }
}
