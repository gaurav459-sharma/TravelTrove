import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Destination {
  _id:string;
  destinationName:string;
  photos: [string];
  title: string;
  summary: string;
}

interface Review {
  destinationId:string,
  username: string;
  rating: number;
  comment: string;
}

interface DestinationDetails {
  _id:string;
  destinationName:string;
  photos: [string];
  title: string;
  summary: string;
  reviews: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private visitor = 'http://localhost:3000/destination-guide'
  private loginUser = 'http://localhost:3000/user/destination-guide'

  private adminApi = 'http://localhost:3000/destination-guide'


  constructor(private http: HttpClient) { }

  //fetching all the guides

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.visitor);
  }

  //search based on the user search
  searchDestinations(name: string): Observable<Destination[]> {
    return this.http.post<Destination[]>(`${this.visitor}/search`,{name});
  }

  //get destination guide details by id
  getDestinationDetails(id: string): Observable<DestinationDetails> {
    return this.http.get<DestinationDetails>(`${this.visitor}/${id}`);
  }

  //create destination guide by admin
  createDestination(formData: FormData): Observable<any> {
    return this.http.post(`${this.adminApi}/create`, formData);
  }
//updating the destination guide by admin
  updateDestination(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.adminApi}/update/${id}`, formData);
  }

//deleting the destination guide by admin


  deleteDestination(id: string): Observable<any> {
    return this.http.delete(`${this.adminApi}/delete/${id}`);
  }

  // submitting a user review

  submitReview(destinationId: string, reviewData: any): Observable<any> {
    return this.http.post(`${this.loginUser}/${destinationId}/add-review`, reviewData);
  }

  addToFavorites(destinationId: string): Observable<any> {
    return this.http.post(`${this.loginUser}/${destinationId}/favourites`, {});
  }

  removeFromFavorites(destinationId: string): Observable<any> {
    return this.http.delete(`${this.loginUser}/${destinationId}/favourites`);
  }
  getFavouriteDesination(): Observable<any> {
    return this.http.get(`${this.loginUser}/favourites`);
  }

}