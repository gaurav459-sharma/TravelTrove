import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          if(response.success){
          this.successMessage = 'Login successful! Redirecting...';
          this.errorMessage = '';
          this.router.navigate(['/']); // Redirect to home or dashboard
          }
          else{
            this.successMessage = '';
            this.errorMessage = 'Invalid credetials';

          }
        },
        (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.successMessage = '';
          console.error('Error during login', error);
        }
      );
    }
  }
  
}
