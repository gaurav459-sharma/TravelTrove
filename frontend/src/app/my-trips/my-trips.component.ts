import { Component } from '@angular/core';
import { TripItineraryService } from '../services/trip-itnerary.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {
  trips: any[] = [];

  constructor(private tripService: TripItineraryService,private authService: AuthService) {}

  ngOnInit(): void {

    this.tripService.getTrips().subscribe(
      (response:any) => {
        if(response.success) {
          console.log(response.data,"pp");
          this.trips = response.data.myTrips;
        }
        else{
          this.trips = [];
        }
      },
      (error) => {
        console.error('Error fetching trips', error);
      }
    );
  }
}
