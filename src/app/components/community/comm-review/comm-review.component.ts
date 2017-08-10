import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Review, Comment, ReviewCommentPair, ItineraryOverview } from './../../../objects';

import { CommDataService } from './../../../services/comm-data.service';
import { FirebaseService } from './../../../services/firebase.service';
import { AuthService } from './../../../services/auth.service';

import 'rxjs/add/operator/take'

@Component({
  selector: 'app-comm-review',
  templateUrl: './comm-review.component.html',
  styleUrls: ['./comm-review.component.css']
})
export class CommReviewComponent implements OnInit {
  itinerary: ItineraryOverview;
  reviews: Array<ReviewCommentPair>;
  reviewForm: FormGroup;
  ratings: Array<number> = [5, 4, 3, 2, 1];
  constructor(
    private cds: CommDataService,
    private fbs: FirebaseService,
    private as: AuthService
  ) { }

  ngOnInit() {
    if(this.cds.accessed){
      this.itinerary = this.cds.storedItinerary;
      if(this.itinerary.reviews != null){
        this.getItineraryReviews();
      }
    }
    this.resetForm();
  }

  submitReview(data){
    this.fbs.addReview(data, this.itinerary);
    this.resetForm();
    this.getItineraryReviews();
  }

  getItineraryReviews(){
    this.reviews = new Array<ReviewCommentPair>();
    this.fbs.getReviewKeysObs(this.itinerary.$key).take(1).subscribe((data) => {
      data.forEach((elem) => {
        this.fbs.getReviewObs(elem.$value).take(1).subscribe((review) => {
          let rcPair = new ReviewCommentPair(review);
          this.fbs.getCommentKeysObs(review.$key).take(1).subscribe((commentKeys) => {
            commentKeys.forEach((commentKey) => {
              this.fbs.getCommentObs(commentKey.$value).take(1).subscribe((comment) => {
                rcPair.addComment(comment);
              });
            })
          });
          this.reviews.push(rcPair);
        }); 
      })
    });
  }

  resetForm(){
    this.reviewForm = new FormGroup({
      'text': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)]),
      'rating': new FormControl(null, [
        Validators.required
      ])
    })
  }

  refresh(signal: boolean){
    this.getItineraryReviews();
  }
}
