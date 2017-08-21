import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ItineraryOverview } from './../../../objects';
import { FirebaseService } from './../../../services/firebase.service';
import { CommDataService } from './../../../services/comm-data.service';

@Component({
  selector: 'app-comm-list',
  templateUrl: './comm-list.component.html',
  styleUrls: ['./comm-list.component.css']
})
export class CommListComponent implements OnInit {
  @Output() switchToView = new EventEmitter();
  itineraries: Array<ItineraryOverview>;
  filteredItineraries: Array<ItineraryOverview>;
  search: FormControl;

  constructor(
    private fbs: FirebaseService,
    private cds: CommDataService
  ) { }

  ngOnInit() {
    this.search = new FormControl();
    this.getPostedItineraries();
    this.filteredItineraries = this.itineraries;
  }

  getPostedItineraries(){
    this.fbs.getAllPostItinerariesKeysObs().subscribe((data) => {
      this.itineraries = new Array<ItineraryOverview>();
      data.forEach((elem) => {
        this.fbs.getItineraryObs(elem.$value).take(1).subscribe((itinerary) => {
          this.itineraries.push(itinerary);
          if(this.itineraries.length !== 0){
            this.pushToView(this.itineraries[0]);
          }
        }) 
      })
    });
  }

  filter(str: string): void {
    let newList = new Array<ItineraryOverview>();
    let ss = str.toLowerCase();
    for(let i of this.itineraries){
      let aName = i.authorName.toLowerCase();
      let desc = i.description.toLowerCase();
      let title = i.title.toLowerCase();
        // if name, description or title contains substring
        if(aName.includes(ss) || desc.includes(ss) || title.includes(ss)){
            newList.push(i);
        }
    }
    this.filteredItineraries = newList;
  } 
  pushToView(itinerary: ItineraryOverview): void {
    this.cds.pushToView(itinerary);
    this.fbs.setLastViewed(this.fbs.user, itinerary.$key);
    this.switchToView.emit();
  }
}
