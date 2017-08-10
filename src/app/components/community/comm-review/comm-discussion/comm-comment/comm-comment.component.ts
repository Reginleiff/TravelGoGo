import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Review, Comment } from './../../../../../objects';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comm-comment',
  templateUrl: './comm-comment.component.html',
  styleUrls: ['./comm-comment.component.css']
})
export class CommCommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() commentUpdated = new EventEmitter<any>();
  replyForm: FormGroup;
  commentText: string;
  originalText: string;
  reply: boolean;
  recipientName: string;
  authorName: string;
  postDate: number;

  
  constructor() { }

  ngOnInit() {
    this.recipientName = this.comment.recipientName;
    this.authorName = this.comment.authorName;
    this.commentText = this.comment.text;
    this.postDate = this.comment.date;
    this.originalText = this.comment.prevText;
    this.resetReplyForm();
  }

  resetReplyForm(){
    this.reply = false;
    this.replyForm = new FormGroup({
      'text': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  submitComment(data, objectToReply){
    let obj = {
      'data': data,
      'objectToReply': objectToReply,
    }
    this.commentUpdated.emit(obj);
    this.resetReplyForm();
  }

  toggleReply(){
    this.reply = !this.reply;
  }

  refresh(){
    this.commentUpdated.emit(true);
  }
}
