import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'app-update-guide',
  templateUrl: './update-guide.component.html',
  styleUrls: ['./update-guide.component.css']
})
export class UpdateGuideComponent implements OnInit {
  guideForm: FormGroup;
  selectedFiles: File[] = [];
  fileError: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  destinationId: string | null = null;
  @Input()updatePostId!:string;


  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.guideForm = this.fb.group({
      destinationName: ['', Validators.required],
      title: ['', Validators.required],
      summary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.destinationId = this.route.snapshot.paramMap.get('id');
    
    if (this.destinationId) {
      this.destinationService.getDestinationDetails(this.destinationId).subscribe(
        (response:any) => {
          this.guideForm.patchValue({
            destinationName:response.data.destinationName,
            title: response.data.title,
            summary: response.data.summary,
          });
        },
        (error) => {
          console.error('Error fetching destination details', error);
        }
      );
    }
  }

  onFileSelect(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }
confirmOnsubmit(){
  if (window.confirm('Are you sure you want to update this destination?')) {
    this.onSubmit();
  }
}
  onSubmit(): void {
    if (this.guideForm.valid) {
      const formData = new FormData();
      formData.append('destinationName', this.guideForm.get('destinationName')?.value);
      formData.append('title', this.guideForm.get('title')?.value);
      formData.append('summary', this.guideForm.get('summary')?.value);
      this.selectedFiles.forEach(file => formData.append('photos', file));

      if (this.destinationId) {
        this.destinationService.updateDestination(this.destinationId, formData).subscribe(
          () => {
            this.successMessage = 'Destination guide updated successfully!';
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000); // Redirect after 2 seconds
          },
          (error) => {
            this.errorMessage = 'Failed to update destination guide. Please try again.';
            this.successMessage = '';
            console.error('Error updating destination guide', error);
          }
        );
      }
    }
  }
}