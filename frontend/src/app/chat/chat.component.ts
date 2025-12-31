import { Component, OnInit } from '@angular/core';
import { TravelgroupsService } from '../services/travelgroups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  groupId: string | null = null;

  groupMembers = [
    { username: '',_id:'' },
  ];

  chatMessages = [
    { sender: '', text: '',timeStamp:new Date()},
  ];
  newMessage: string = '';
  loggedInUser: string = ''; // Replace with actual logged-in user

  constructor(
    private travelgroup: TravelgroupsService,
    private route: ActivatedRoute,
    private authservice:AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser=this.authservice.getUsername()
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.getGroupMembers()  //fetch all members of the group
    
    setInterval(() => {
      this.getMessages();
    }, 500);

    // Fetch chat messages from the server
   
    
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.groupId) {
      const obj = {
        sender: this.loggedInUser,
        text: this.newMessage,
        timeStamp:new Date()
      };
      this.travelgroup.sendMessage(this.groupId, obj).subscribe(
        (response) => {
          console.log(response);
          this.chatMessages.push(obj);
          this.newMessage = '';
        },
        (error) => {
          console.log('error to send message', error);
        }
      );
    }
  }
  getGroupMembers(): void {
    if (this.groupId) {
      this.travelgroup.getMembers(this.groupId).subscribe(
        (response) => {
          console.log(response);
          this.groupMembers = response.data.members;
        },
        (error) => {
          console.log('error to get members', error);
        }
      );
    }
  }

  getMessages(){
    if (this.groupId) {
      this.travelgroup.getChatMessages(this.groupId).subscribe(
        (response: any) => {
          if (response.success) {
            this.chatMessages = response.data.messages;
            
          } else {
            console.log('no message found');
          }
        },
        (error) => {
          console.error('Error fetching chat messages', error);
        }
      );
    }
  }
}
