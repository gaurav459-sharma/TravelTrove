import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  email: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // Update with your actual API endpoint
  
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());
  constructor(private http: HttpClient) {}


  // Signup method
  signup(username: string, email: string, password: string): Observable<any> {
  
    return this.http.post(`${this.baseUrl}/signup`, { username, email, password }).pipe(
      tap(() => {
        // Optionally handle any post-signup logic, such as auto-login
        console.log('User signed up successfully');
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.authState.next(true); // Notify subscribers of login
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authState.next(false); // Notify subscribers of logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  getUsername(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      return decoded.username;
    }
    return '';
  }

  isAdmin():boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      return decoded.role==="admin";
    }
    return false;

  }

  getUserId(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      return decoded.id;
    }
    return '';
  }
}