import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from './../../../objects';

@Component({
  selector: 'app-comm-review',
  templateUrl: './comm-review.component.html',
  styleUrls: ['./comm-review.component.css']
})
export class CommReviewComponent implements OnInit {
  reviewForm: FormGroup; 
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.reviewForm = this.fb.group({
      text: [null, Validators.minLength(3)]
    })
  }

  submitReview(data){
    console.log(data);
  }
}
