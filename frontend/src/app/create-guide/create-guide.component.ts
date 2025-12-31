import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationService } from '../services/destination.service';


@Component({
  selector: 'app-create-guide',
  templateUrl: './create-guide.component.html',
  styleUrls: ['./create-guide.component.css']
})
export class CreateGuideComponent implements OnInit {
  guideForm: FormGroup;
  selectedFiles: File[] = [];
  fileError: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
  ) {
    this.guideForm = this.fb.group({
      destinationName: ['', Validators.required],
      title: ['', Validators.required],
      summary: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelect(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.fileError = this.selectedFiles.length === 0;
  }

  onSubmit(): void {
    if (this.guideForm.valid && this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('destinationName', this.guideForm.get('destinationName')?.value);
      formData.append('title', this.guideForm.get('title')?.value);
      formData.append('summary', this.guideForm.get('summary')?.value);
      this.selectedFiles.forEach(file => formData.append('photos', file));

      this.destinationService.createDestination(formData).subscribe(
        (response) => {
          if(response.success){
          this.successMessage =  response.message;
          this.errorMessage
          }
          else{
            this.errorMessage = response.message;
          }
          
          this.guideForm.reset();
          this.selectedFiles = [];
        },
        (error) => {
          this.errorMessage = `Failed to create destination guide. ${error.error.message}`;
          this.successMessage = '';
          console.error('Error creating destination guide', error);
        }
      );
    }
  }
}