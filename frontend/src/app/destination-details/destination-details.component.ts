import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../services/destination.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

interface Review {
  destinationId: string,
  username: string;
  rating: number;
  comment: string;
}

interface DestinationDetails {
  _id: string;
  destinationName: string;
  photos: [string];
  title: string;
  summary: string;
  reviews: Review[];
}

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {
  destination: DestinationDetails | null = null;

  currentImage: string = '';
  imageIndex: number = 0;
  private intervalId: any;
  reviewForm: FormGroup;
  isLoggedIn: boolean = true;
  successMessage: string = '';
  errorMessage: string = '';
  destId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      rating: [5, Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     this.destId = this.route.snapshot.paramMap.get('id')||'';
    if ( this.destId) {
      
      this.getDestinationDetails();
    
    }
  }


  startImageSlideshow(): void {
    this.intervalId = setInterval(() => {
      this.imageIndex = (this.imageIndex + 1) % this.destination!.photos.length;
      this.currentImage = this.destination!.photos[this.imageIndex];
    }, 3000); // Change image every 3 seconds
  }



  //submitting the review given by logged in user
  onSubmitReview(): void {

    if (this.reviewForm.valid && this.destination) {
      const reviewData = this.reviewForm.value;
      reviewData.user = this.authService.getUsername(); // Assuming you have a method to get the username
      console.log(reviewData.user, "kk")
      this.destinationService.submitReview(this.destination._id, reviewData).subscribe(
        () => {
          this.successMessage = 'Review submitted successfully!';
          this.errorMessage = '';
          this.destination!.reviews.push(reviewData);
          this.reviewForm.reset({ rating: 5, comment: '' });
          this.ngOnInit()
        },
        () => {
          this.errorMessage = `Please login to submit a review!`;
          console.log(this.errorMessage)
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000);
          this.successMessage = '';

        }
      );
    }
  }

  createItinerary(): void {
    if (this.destination) {
      const destinationName = this.destination.destinationName;
      this.router.navigate(['/create-itinerary', this.destId, destinationName]);
    }
  }

  getDestinationDetails():void{
    this.destinationService.getDestinationDetails( this.destId).subscribe(
      (response: any) => {
        
        this.destination = response.data;
        if (this.destination!.photos.length > 0) {
          this.currentImage = this.destination!.photos[0];
          this.startImageSlideshow();
        }
      },
      (error) => {
        console.error('Error fetching destination details', error);
      }
    );
  }

}
