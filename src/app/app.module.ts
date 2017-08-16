// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './modules/app-routing.module';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Google Maps
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";

// Utilities
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItinerariesComponent } from './components/itineraries/itineraries.component';
import { HomeComponent } from './components/home/home.component';
import { PlannerComponent } from './components/planner/planner.component';
import { CommunityComponent } from './components/community/community.component';
import { ItineraryViewComponent } from './components/itineraries/itinerary-view/itinerary-view.component';
import { ItineraryListComponent } from './components/itineraries/itinerary-list/itinerary-list.component';
import { PlannerListComponent } from './components/planner/planner-list/planner-list.component';
import { PlannerMapComponent } from './components/planner/planner-map/planner-map.component';
import { PlannerDayplanComponent } from './components/planner/planner-list/planner-dayplan/planner-dayplan.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommListComponent } from './components/community/comm-list/comm-list.component';
import { CommViewComponent } from './components/community/comm-view/comm-view.component';
import { CommReviewComponent } from './components/community/comm-review/comm-review.component';
import { CommDiscussionComponent } from './components/community/comm-review/comm-discussion/comm-discussion.component';
import { CommCommentComponent } from './components/community/comm-review/comm-discussion/comm-comment/comm-comment.component';

// Services
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { PlannerService } from './services/planner.service';
import { ItineraryService } from './services/itinerary.service';
import { PlannerInfoComponent } from './components/planner/planner-info/planner-info.component';

// Directives
import { PlannerMapRouteDirective } from './components/planner/planner-map/planner-map-route.directive';
import { CommIntroComponent } from './components/community/comm-intro/comm-intro.component';
import { HomeStartComponent } from './components/home/home-start/home-start.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItinerariesComponent,
    HomeComponent,
    PlannerComponent,
    CommunityComponent,
    ItineraryViewComponent,
    ItineraryListComponent,
    PlannerListComponent,
    PlannerMapComponent,
    PlannerDayplanComponent,
    PlannerInfoComponent,
    PlannerMapRouteDirective,
    PageNotFoundComponent,
    CommListComponent,
    CommViewComponent,
    CommReviewComponent,
    CommDiscussionComponent,
    CommCommentComponent,
    CommIntroComponent,
    HomeStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'travelgogo'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FlashMessagesModule, //imports the flash messages utility
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzEtn8KnIJXzZKEGtlM6K5dhobsq6jHIE',
      libraries: ["places"]
    }),
    DragulaModule,
  ],
  providers: [FirebaseService, AuthService, PlannerService, ItineraryService, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
