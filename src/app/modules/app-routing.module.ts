import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { NavbarComponent } from './../components/navbar/navbar.component';
import { ItinerariesComponent } from './../components/itineraries/itineraries.component';
import { HomeComponent } from './../components/home/home.component';
import { PlannerComponent } from './../components/planner/planner.component';
import { CommunityComponent } from './../components/community/community.component';
import { PageNotFoundComponent } from './../components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'logout', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'planner', component: PlannerComponent},
  { path: 'itineraries', component: ItinerariesComponent},
  { path: 'community', component: CommunityComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    )
  ], exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
