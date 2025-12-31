import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface message{
  _id: string;
  message: string;
  sender: string;
  timestamp: string;
}

interface travelGroup {
  _id: string;
  groupName: string;
  description: string;
  createdBy: string[];
  members: string;
  messages: string;
}


@Injectable({
  providedIn: 'root'
})
export class TravelgroupsService {

  private apiUrl = 'http://localhost:3000/travel-group';

  constructor(private http: HttpClient) { }

  // Fetch all travel groups
  getTravelGroups(): Observable<travelGroup[]> {
    return this.http.get<travelGroup[]>(`${this.apiUrl}`);
  }

  //create travel group
  createTravelGroup(groupName: string, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, { groupName, description });
  }

  //joining a travel group
  joinTravelGroup(groupId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${groupId}`,{});
  }

  //get chat messages
  // /travel-group/chat/:id/get-message
  getChatMessages(groupId: string): Observable<message[]> {
    return this.http.get<message[]>(`${this.apiUrl}/chat/${groupId}/get-message`);
  }
  
  
  // /travel-group/chat/:id/send-message
  //sending message
  sendMessage(groupId: string, messageObj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat/${groupId}/send-message`, { messageObj });
  }

  // get members
  getMembers(groupId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/${groupId}`);
  }

  // get my groups
  getMyGroups(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-groups`);
  }
}
