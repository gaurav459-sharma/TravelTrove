import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../services/destination.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-favorite-destinations',
  templateUrl: './favorite-destinations.component.html',
  styleUrls: ['./favorite-destinations.component.css']
})
export class FavoriteDestinationsComponent implements OnInit {
  favoriteDestinations: any[] = [];
 userId:string=''

  constructor(private destinationService: DestinationService, private router:Router, private authService: AuthService,) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.destinationService.getFavouriteDesination().subscribe(
      (response) => {
        console.log(response.data,"pp")
        this.favoriteDestinations = response.data;
        console.log('Favorite destinations', this.favoriteDestinations);
      },
      error => {
        console.error('Error fetching favorite destinations', error);
      }
    );
  }

  viewDetails(id: string): void {
    this.router.navigate(['/destination', id]);
  }
  removeFromFavorites(id: string): void {
    console.log(id,"aa")
    this.destinationService.removeFromFavorites(id).subscribe(
      (response) => {
        console.log('Destination removed from favorites', response);
        this.favoriteDestinations = this.favoriteDestinations.filter(destination => destination._id !== id);
      },
      error => {
        console.error('Error removing destination from favorites', error);
      }
    );
  }
  
}