import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  
  signupForm: FormGroup;
  showPassword: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      this.authService.signup(username, email, password).subscribe(
        (response) => {
          if (response.success) {
            this.successMessage = response.message;
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000); // Redirect after 2 seconds
          } else {
            this.errorMessage = response.message;
            this.successMessage = '';
          }
        },
        (error) => {
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message; // Display the error message from the backend
            } else {
              this.errorMessage = 'Sign-up failed. Please try again.';
            }
            this.successMessage = '';
            
            console.error('Error during sign-up', error);
        }
      );
    }
  }
}
