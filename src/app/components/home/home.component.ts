import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {ItineraryListComponent} from '../itineraries/itinerary-list/itinerary-list.component';
import {ItineraryViewComponent} from '../itineraries/itinerary-view/itinerary-view.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
