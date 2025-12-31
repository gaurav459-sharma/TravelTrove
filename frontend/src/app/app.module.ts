import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DestinationGuideComponent } from './destination-guide/destination-guide.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DestinationDetailsComponent } from './destination-details/destination-details.component';
import { CreateGuideComponent } from './create-guide/create-guide.component';
import { UpdateGuideComponent } from './update-guide/update-guide.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { CreateItineraryComponent } from './create-itinerary/create-itinerary.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { FavoriteDestinationsComponent } from './favorite-destinations/favorite-destinations.component';
import { TravelGroupsComponent } from './travel-groups/travel-groups.component';
import { ChatComponent } from './chat/chat.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinationGuideComponent,
    LoginComponent,
    RegisterComponent,
    DestinationDetailsComponent,
    CreateGuideComponent,
    UpdateGuideComponent,
    CreateItineraryComponent,
    MyTripsComponent,
    FavoriteDestinationsComponent,
    TravelGroupsComponent,
    ChatComponent,
    MyGroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
