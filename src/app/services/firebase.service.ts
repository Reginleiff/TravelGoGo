import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';

import { User, ItineraryOverview, Review, Comment } from './../objects';

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
  
  getAllReviewObs(): FirebaseListObservable<any[]>{
    let allReviews = this.af.list('/reviews') as FirebaseListObservable<any[]>;
    return allReviews;
  }

  getReviewObs(key: string): FirebaseObjectObservable<any>{
    return this.af.object('/reviews/' + key);
  }

  getAllCommentObs(): FirebaseListObservable<any[]>{
    let allComments = this.af.list('/comments') as FirebaseListObservable<any[]>;
    return allComments;
  }

  getCommentObs(key: string): FirebaseObjectObservable<any>{
    return this.af.object('/comments/' + key);
  }

  /**
   * returns the keys of all user itineraries
   * precondition: keys is not empty
   */
  getKeysObs(): FirebaseListObservable<any[]> {
    let userItineraryKeys = this.af.list('/users/' + this.userUID + '/itineraries') as FirebaseListObservable<any[]>;
    return userItineraryKeys;
  }

  getReviewKeysObs(itineraryKey: string): FirebaseListObservable<any[]> {
    let reviewKeys = this.af.list('/itineraries/' + itineraryKey + '/reviews') as FirebaseListObservable<any[]>;
    return reviewKeys;
  }

  getCommentKeysObs(reviewKey: string): FirebaseListObservable<any[]>{
    let commentKeys = this.af.list('reviews/' + reviewKey + '/comments') as FirebaseListObservable<any[]>;
    return commentKeys;
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

  saveItinerary(itinerary: ItineraryOverview): void {
    let key = itinerary.$key;
    this.af.database.ref('itineraries').child(key).set(itinerary);;
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

  // adds a review object to database
  addReview(data, itinerary: ItineraryOverview): void {
    let uid = this.authService.user.uid;
    let username = this.authService.user.displayName;
    let review = new Review(uid, username, data.text, data.rating);
    let refKey = this.af.database.ref('reviews').push(review).key;
    this.af.database.ref('users/' + uid).once('value').then((snapshot) => {
      if(!snapshot.exists()){
        this.addNewUser(uid, username);
      }
      this.addToUserReviews(uid, refKey);
      this.addToItineraryReviews(itinerary.$key, refKey);
    })
  }

  addToUserReviews(uid: string, reviewKey: string): void {
    this.af.database.ref('users/' + uid + '/reviews').push(reviewKey);
  }

  addToItineraryReviews(itineraryKey: string, reviewKey: string): void {
    this.af.database.ref('itineraries').child(itineraryKey).child('reviews').push(reviewKey);
  }

  addComment(data, objectToReply, review: Review): void {
    let auid = this.authService.user.uid;
    let aname = this.authService.user.displayName;
    let ruid = objectToReply.authorUID;
    let rname = objectToReply.authorName;
    let comment = new Comment(auid, aname, ruid, rname, data.text);
    let refKey = this.af.database.ref('comments').push(comment).key;
    this.af.database.ref('users/' + auid).once('value').then((snapshot) => {
      if(!snapshot.exists()){
        this.addNewUser(auid, aname);
      }
      this.addToUserComments(auid, refKey);
      this.addToReviewComments(review.$key, refKey);
    })
  }

  addToUserComments(uid: string, commentKey: string){
    this.af.database.ref('users/' + uid + '/comments').push(commentKey);
  }

  addToReviewComments(reviewKey: string, commentKey: string){
    this.af.database.ref('reviews/' + reviewKey + '/comments').push(commentKey);
  }
}
