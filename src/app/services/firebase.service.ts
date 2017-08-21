import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';

import { User, ItineraryOverview, Review, Comment } from './../objects';

import 'rxjs/add/operator/take';


@Injectable()
export class FirebaseService{
  userUID: string;
  user: User;
  userItineraries: ItineraryOverview[] = new Array<ItineraryOverview>();

  constructor(
    public af: AngularFireDatabase,
    private authService: AuthService
  ) { 
    this.authService.userObs.subscribe((user) => {
      this.userUID = user.uid;
      // create new entry in database
      let uid = this.authService.user.uid;
      let username = this.authService.user.displayName;
      this.af.database.ref('users/' + uid).once('value').then((snapshot) => {
        if(!snapshot.exists()){
          this.addNewUser(this.userUID, username);
        }
        this.getUser().subscribe((user: User) => {
          this.user = user;
        });
      })
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

  getAllPostItinerariesKeysObs(): FirebaseListObservable<any[]>{
    let keys = this.af.list('/posted-itineraries') as FirebaseListObservable<any[]>;
    return keys;
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
    this.getUser().take(1).subscribe((user: User) => {
      this.setLastPlanned(user, refKey);
    })
    let uid = this.authService.user.uid;
    this.addToUserItineraries(uid, refKey);
  }

  saveItinerary(itinerary: ItineraryOverview): void {
    let key = itinerary.$key;
    this.getUser().take(1).subscribe((user: User) => {
      this.setLastPlanned(user, key);
    })
    this.af.database.ref('itineraries').child(key).set(itinerary);;
  }

  /**
   * delete itinerary from database
   */
  deleteItinerary(i: ItineraryOverview): void {
    const del = new Promise(resolve => {
      this.af.database.ref('posted-itineraries/' + i.delPostKey).remove(); //i.delPostKey is undefined
      resolve();
    }).then(() => {
      this.af.database.ref('itineraries').child(i.$key).remove();
      this.deleteUserItinerary(i.$key);
    })
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
    })).then((result: string) => new Promise(resolve => {
      this.af.database.ref('users').child(this.userUID).child('itineraries').child(result).remove();
      resolve();
    })).then((result) => {
      this.updateTopRated();
      this.updateLastPosted();
      this.updateLastPlanned();
    });
  }

  /**
   * adds itinerary reference key to user itinerary keys list
   * pre-condition: user already exists in database
   */
  addToUserItineraries(uid: string, itineraryKey: string): void {
    this.af.database.ref('users/' + uid + '/itineraries').push(itineraryKey);
  }

  postItinerary(itinerary: ItineraryOverview): void {
    let delPostKey = this.af.database.ref('/posted-itineraries').push(itinerary.$key).key;
    itinerary.post = true;
    itinerary.delPostKey = delPostKey;
    this.af.database.ref('itineraries').child(itinerary.$key).set(itinerary);
    this.setLastUploaded(itinerary.$key);
    this.updateTopRated();
  }

  takeDownItinerary(itinerary: ItineraryOverview): void {
    this.af.database.ref('/posted-itineraries').child(itinerary.delPostKey).remove();
    itinerary.delPostKey = null;
    itinerary.post = false;
    this.af.database.ref('itineraries').child(itinerary.$key).set(itinerary);
    this.updateLastPosted();
    this.updateTopRated();
  }

  // adds a new user to the database
  addNewUser(uid: string, username: string): void {
    this.af.database.ref('users/' + uid).push(new User(username, uid));
  }

  // adds a review object to database
  addReview(data, itinerary: ItineraryOverview): void {
    let uid = this.authService.user.uid;
    let username = this.authService.user.displayName;
    // update itinerary rating and top rated
    let review = new Review(uid, username, data.text, data.rating);
    let rating = this.addRating(itinerary, data.rating);
    let refKey = this.af.database.ref('reviews').push(review).key;
    this.addToUserReviews(uid, refKey);
    this.addToItineraryReviews(itinerary.$key, refKey);
    this.updateTopRated();
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
    let comment = new Comment(auid, aname, ruid, rname, data.text, objectToReply.text);
    let refKey = this.af.database.ref('comments').push(comment).key;
    this.addToUserComments(auid, refKey);
    this.addToReviewComments(review.$key, refKey);
  }

  addToUserComments(uid: string, commentKey: string){
    this.af.database.ref('users/' + uid + '/comments').push(commentKey);
  }

  addToReviewComments(reviewKey: string, commentKey: string){
    this.af.database.ref('reviews/' + reviewKey + '/comments').push(commentKey);
  }

  getUser(): FirebaseObjectObservable<any> {
    return this.af.object('/users/' + this.userUID) as FirebaseObjectObservable<any[]>;
  }

  setLastViewed(user: User, key: string): void {
    user.lastViewed = key;
    this.af.database.ref('users').child(this.userUID).set(user);
  }

  setLastPlanned(user: User, key: string): void {
    user.lastPlanned = key;
    this.af.database.ref('users').child(this.userUID).set(user);
  }

  updateLastPlanned(){
    this.getKeysObs().take(1).subscribe((keysArr: Array<any>) => {
      this.getUser().take(1).subscribe((user: User) => {
        this.setLastPlanned(user, keysArr[keysArr.length - 1].$value);
      })
    })
  }

  setLastUploaded(key: string): void {
    let lastUploaded = {
      key: key
    }
    this.af.database.ref('lastuploaded').set(lastUploaded);
  }

  getLastUploadedObs(): FirebaseObjectObservable<any> {
    return this.af.object('/lastuploaded') as FirebaseObjectObservable<any>;
  }

  addRating(itinerary: ItineraryOverview, addedRating: number): void {
    if(itinerary.rating == null){
      itinerary.rating = 0;
    }
    if(itinerary.totalRating == null){
      itinerary.totalRating = 0;
    }
    if(itinerary.views == null){
      itinerary.views = 0;
    }
    itinerary.views = itinerary.views + 1;
    itinerary.totalRating = itinerary.totalRating + addedRating;
    itinerary.rating = itinerary.totalRating / itinerary.views;
    this.af.database.ref('itineraries').child(itinerary.$key).set(itinerary);
  }

  setTopRated(itinerary: ItineraryOverview): void {
    let topRated = {
      rating: itinerary.rating,
      key: itinerary.$key,
      views: itinerary.views
    }
    this.af.database.ref('toprated').set(topRated);
  }

  getTopRatedObs(): FirebaseObjectObservable<any> {
    return this.af.object('/toprated') as FirebaseObjectObservable<any>;
  }

  updateTopRated(){
    const updTopRated = new Promise(resolve => {
      this.getAllItineraryObs().take(1).subscribe(itineraryArr => {
        resolve(itineraryArr);
      })
    })
    .then((result: Array<ItineraryOverview>) => new Promise(resolve => {
      if(result != null){
        let topRating = -1;
        let views = -1;
        let topRated = null;
        for(let i of result){
          if(i.post){
            if(i.rating > topRating){
              topRating = i.rating;
              views = i.views;
              topRated = i;
            } else if(i.rating == topRating){
              if(i.views > views){
                topRating = i.rating;
                views = i.views;
                topRated = i;
              }
            }
          }
        }
        resolve(topRated);
      }
      resolve(null);
    })).then((res: ItineraryOverview) => {
      this.setTopRated(res);
    });
  }

  updateLastPosted(){
    this.getAllPostItinerariesKeysObs().take(1).subscribe((keysArr: Array<any>) => {
      this.setLastUploaded(keysArr[keysArr.length - 1].$value);
    })
  }
}