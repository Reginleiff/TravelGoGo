import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Review, ItineraryOverview } from './../../../objects';

import { CommDataService } from './../../../services/comm-data.service';
import { FirebaseService } from './../../../services/firebase.service';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-comm-review',
  templateUrl: './comm-review.component.html',
  styleUrls: ['./comm-review.component.css']
})
export class CommReviewComponent implements OnInit {
  itinerary: ItineraryOverview;
  reviews: Array<Review>;
  reviewForm: FormGroup;
  ratings: Array<number> = [5, 4, 3, 2, 1];
  constructor(
    private fb: FormBuilder,
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
    // this.reviewForm = this.fb.group({
    //   text: [null, Validators.minLength(3)],
    //   rating: [null]
    // })
    this.resetForm();
  }

  submitReview(data){
    this.fbs.addReview(data, this.itinerary);
    // this.reviewForm.reset();
    this.resetForm();
  }

  getItineraryReviews(){
    this.fbs.getReviewKeysObs(this.itinerary.$key).subscribe((data) => {
      this.reviews = new Array<Review>();
      data.forEach((elem) => {
        this.fbs.getReviewObs(elem.$value).subscribe((review) => {
          this.reviews.push(review);
        }) 
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
}
