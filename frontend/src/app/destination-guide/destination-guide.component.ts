import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../services/destination.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Destination {
  _id:string;
  destinationName:string;
  photos: [string];
  title: string;
  summary: string;
}

@Component({
  selector: 'app-destination-guide',
  templateUrl: './destination-guide.component.html',
  styleUrls: ['./destination-guide.component.css']
})
export class DestinationGuideComponent implements OnInit {
  
  destinations: Destination[] = []
  filteredDestinations: Destination[] = [];  //when user search something


  isAdmin: boolean = false;
  searchTerm: string = '';
  updatePostId:string=""
  favoriteDestinations:string[]=[]; // Track favorite destinations by ID
  userId:string=''

  constructor(
    private destinationService: DestinationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
     // check if admin is logged in
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.authService.getUserId();
    this.loadDestinations();

  }

  loadDestinations(): void {
    this.destinationService.getDestinations().subscribe(
      (response: any) => {
        console.log(response.data,"pp")
      
        this.destinations = response.data;
        this.filteredDestinations = response.data;
      },
      (error) => {
        console.error('Error fetching destinations', error);
      }
    );

    if(this.userId){
      this.destinationService.getFavouriteDesination().subscribe(
        (response) => {
  
          this.favoriteDestinations = response.data.map((item:Destination)=>{return item._id});
          console.log('Favorite destinations', this.favoriteDestinations);
        },
        (error) => {
          console.error('Error fetching favorite destinations', error);
        }
      );
    }
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.loadDestinations(); // Load all destinations if search term is empty
    } else {
      this.destinationService.searchDestinations(this.searchTerm).subscribe(
        (response: any) => {
          console.log(response)
          if(response.success){
          this.filteredDestinations = response.data;
          }
          else{
            this.filteredDestinations = [];
          }
        },
        (error) => {
          console.error('Error searching destinations', error);
        }
      );
    }
  }

  viewDetails(id: string): void {
    this.router.navigate(['/destination', id]);
  }

  createDestination(): void {
    this.router.navigate(['/create-guide']);
  }

  
   //adding bootstrap modal for update
   updateDestination(id: string): void {
    // this.updatePostId=id
    // const modal = document?.getElementById("postUpdateModal");
    // const modalInstance = bootstrap.Modal.getInstance(modal ?? '');
    // modalInstance?.hide();
    this.router.navigate(['/update-guide', id]);
  }



  confirmDelete(id: string): void {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      this.deleteDestination(id);
    }
  }

  deleteDestination(id: string): void {
    this.destinationService.deleteDestination(id).subscribe(
      () => {
        this.loadDestinations(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting destination', error);
      }
    );

    }

    isUserFavourite(destId:string):boolean{
     return this.favoriteDestinations.some(favid => favid=== destId)
    }
  
    //add to favourite 
    toggleFavorite(guide: Destination): void {
      if (this.isUserFavourite(guide._id)) {
        this.destinationService.removeFromFavorites(guide._id).subscribe(
          (response) => {
            if (response.success) {
              this.favoriteDestinations=  this.favoriteDestinations.filter(item =>item !== guide._id)
              
              console.log('Removed from favorites:', response);
              alert('Removed from your favorites');
            } else {
              console.error('Failed to remove from favorites:', response.message);
            }
          },
          (error) => {
            console.error('Error removing from favorites:', error);
          }
        );
      } else {
        this.destinationService.addToFavorites(guide._id).subscribe(
          (response) => {
            if (response.success) {
              this.favoriteDestinations.push(guide._id);
              console.log('Added to favorites:', response);
              alert('Added to your favorites');
            } else {
              console.error('Failed to add to favorites:', response.message);
            }
          },
          (error) => {
            console.error('Error adding to favorites:', error);
          }
        );
      }
    }
  }
