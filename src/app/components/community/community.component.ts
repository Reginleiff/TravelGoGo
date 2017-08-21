import { Component, OnInit } from '@angular/core';
import { CommDataService } from './../../services/comm-data.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [ CommDataService ]
})
export class CommunityComponent implements OnInit {
  review: boolean;
  showIntro: boolean;
  constructor() { }

  ngOnInit() {
    this.review = false;
    this.showIntro = true;
  }
  viewMode(){
    this.review = false;
  }
  reviewMode(){
    this.review = true;
  }
  hideIntro($event){
    this.showIntro = false;
  }
}
