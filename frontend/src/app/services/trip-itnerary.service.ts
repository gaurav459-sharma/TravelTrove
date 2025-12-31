import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TripItinerary {
  _id: string;
  destination: string;
  duration: number;
  activities: string[];
  lodging: string;
  dining: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripItineraryService {

  private apiUrl = 'http://localhost:3000/trip-itineraries';

  constructor(private http: HttpClient) { }

  // Fetch all trip itineraries
  getTrips(): Observable<TripItinerary[]> {
    return this.http.get<TripItinerary[]>(`${this.apiUrl}/my-itenrary`);
  }

  // Get trip itinerary details by id
  getTripItineraryDetails(id: string): Observable<TripItinerary> {
    return this.http.get<TripItinerary>(`${this.apiUrl}/${id}`);
  }

  // Create a new trip itinerary
  createTrip(id:string,itineraryData: TripItinerary): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, itineraryData);
  }

  // Update an existing trip itinerary
  updateTripItinerary(id: string, itineraryData: TripItinerary): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, itineraryData);
  }

  // Delete a trip itinerary
  deleteTripItinerary(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}