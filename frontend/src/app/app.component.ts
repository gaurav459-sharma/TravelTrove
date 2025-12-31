import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  userid:string='';
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.username = this.authService.getUsername();
        this.userid = this.authService.getUserId();
      } else {
        this.username = '';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/'])
  }
}