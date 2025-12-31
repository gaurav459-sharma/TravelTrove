import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { DestinationGuideComponent } from './destination-guide/destination-guide.component';
import { DestinationDetailsComponent } from './destination-details/destination-details.component';
import { CreateGuideComponent } from './create-guide/create-guide.component';
import { UpdateGuideComponent } from './update-guide/update-guide.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateItineraryComponent } from './create-itinerary/create-itinerary.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { FavoriteDestinationsComponent } from './favorite-destinations/favorite-destinations.component';
import { TravelGroupsComponent } from './travel-groups/travel-groups.component';
import { ChatComponent } from './chat/chat.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';

// travel-group/chat

const routes: Routes = [
  { path: '', component: DestinationGuideComponent },
  { path: 'login', component : LoginComponent },
  { path: 'signup', component : RegisterComponent },
  { path: 'destination/:id', component: DestinationDetailsComponent }, 
  { path: 'create-guide', component: CreateGuideComponent ,canActivate: [AuthGuard] },  //,
  { path: 'update-guide/:id', component: UpdateGuideComponent,canActivate: [AuthGuard] },
  { path: 'create-itinerary/:id/:destinationName', component: CreateItineraryComponent,canActivate: [AuthGuard] }, // Route for creating an itinerary
  { path: 'favourite-destinations', component: FavoriteDestinationsComponent,canActivate: [AuthGuard] }, // Route for creating an itinerary
  { path: 'my-trips/:userid', component: MyTripsComponent,canActivate: [AuthGuard] }, // Route for creating an itinerary
  { path: 'travel-groups', component: TravelGroupsComponent,canActivate: [AuthGuard] }, // Route for travel groups
  { path: 'travel-group/chat/:id', component: ChatComponent,canActivate: [AuthGuard] }, // Route for travel groups chat
  { path: 'travel-group/my-groups', component: MyGroupsComponent,canActivate: [AuthGuard] }, // Route for my  travel groups chat

  { path: '**', redirectTo: '' } // Redirect any unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
