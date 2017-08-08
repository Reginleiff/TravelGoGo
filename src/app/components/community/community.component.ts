import { Component, OnInit } from '@angular/core';
import { CommDataService } from './../../services/comm-data.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [ CommDataService ]
})
export class CommunityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
