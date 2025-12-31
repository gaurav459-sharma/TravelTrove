import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripItineraryService } from '../services/trip-itnerary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})
export class CreateItineraryComponent implements OnInit {
  tripForm: FormGroup;
  destinationName: string = '';
  activitiesList: string[] = ['Surfing', 'Snorkeling', 'Hiking', 'Sightseeing','Scuba Driving','Yoga retreat', 'Mountain Biking'];
  lodgingOptions: string[] = ['Luxury villa', 'Hotel', 'Hostel'];
  diningOptions: string[] = ['Local cuisine', 'International', 'Fast food'];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  destId:string=''
  username: string = '';

  constructor(private authService: AuthService,private fb: FormBuilder, private tripService: TripItineraryService,private route: ActivatedRoute,private router: Router) {
    this.tripForm = this.fb.group({
      destinationName: [{ value: '', disabled: true }],
      duration: ['', [Validators.required, Validators.min(1)]],
      activities: [[], Validators.required],
      lodging: ['', Validators.required],
      dining: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.destId = this.route.snapshot.paramMap.get('id')||'';
    this.destinationName = this.route.snapshot.paramMap.get('destinationName')||'';
    this.tripForm.patchValue({ destinationName: this.destinationName });

    this.authService.getAuthState().subscribe(() => {
        this.username = this.authService.getUsername();
    });
  }

  onActivityChange(event: any): void {
    const activities = this.tripForm.get('activities')?.value || [];
    if (event.target.checked) {
      activities.push(event.target.value);
    } else {
      const index = activities.indexOf(event.target.value);
      if (index > -1) {
        activities.splice(index, 1);
      }
    }
    this.tripForm.get('activities')?.setValue(activities);
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      const formData = {
        ...this.tripForm.getRawValue(),
        username: this.getUsernameFromToken()
      };
      this.tripService.createTrip(this.destId,formData).subscribe(
        (response) => {
          if(response.success){
            this.successMessage = response.message;
            this.errorMessage
            setTimeout(() => {
              this.router.navigate(['/my-trips']);
            }, 2000);
          }
          else{
            this.errorMessage = response.message;
            this.successMessage = null;
          }

        },
        () => {
          this.errorMessage = 'Error creating trip. Please try again.';
          this.successMessage = null;
        }
      );
    }
  }

  private getUsernameFromToken(): string {
    return this.authService.getUsername();
  }
}