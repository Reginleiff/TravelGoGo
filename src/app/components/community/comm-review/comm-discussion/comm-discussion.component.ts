import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ReviewCommentPair, Review, Comment } from './../../../../objects';
import { FirebaseService } from './../../../../services/firebase.service';

@Component({
  selector: 'app-comm-discussion',
  templateUrl: './comm-discussion.component.html',
  styleUrls: ['./comm-discussion.component.css']
})
export class CommDiscussionComponent implements OnInit {

  @Input() rcPair: ReviewCommentPair;
  @Output() commentUpdated: EventEmitter<any> = new EventEmitter();
  reviewText: string;
  reviewRating: number;
  reviewAuthor: string;
  reviewDate: number;
  comments: Array<Comment>;
  replyForm: FormGroup;
  reply: boolean;

  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
    this.reply = false; 
    this.reviewText = this.rcPair.review.text;
    this.reviewRating = this.rcPair.review.rating;
    this.reviewAuthor = this.rcPair.review.authorName;
    this.comments = this.rcPair.comments;
    this.reviewDate = this.rcPair.review.date;
    this.resetReplyForm();
  }

  submitComment(data, objectToReply, review: Review){
    this.fbs.addComment(data, objectToReply, review);
    this.resetReplyForm();
    this.commentUpdated.emit(true);
  }

  resetReplyForm(){
    this.replyForm = new FormGroup({
      'text': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  toggleReply(){
    this.reply = !this.reply;
  }

  refresh(){
    this.commentUpdated.emit(true);
  }

  submit(data){
    this.submitComment(data.data, data.objectToReply, this.rcPair.review);
    this.refresh();
  }
}
