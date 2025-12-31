import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TravelgroupsService } from '../services/travelgroups.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-travel-groups',
  templateUrl: './travel-groups.component.html',
  styleUrls: ['./travel-groups.component.css'],
})
export class TravelGroupsComponent implements OnInit {
  travelGroups: any[] = [];
  showCreateForm: boolean = false;
  newGroupName: string = '';
  newGroupDescription: string = '';

  successsMessage: string = '';
  errorMessage: string = '';

  fetchSuccessMessage: string = '';
  fetchErrorMessage: string = '';

  successsJoinMessage: string = '';
  errorJoinMessage: string = '';
  username: string = '';

  @ViewChild('createGroupModal') createGroupModal!: ElementRef; //to ensure the form close after submission

  constructor(
    private travelService: TravelgroupsService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchTravelGroups();
    this.username = this.authservice.getUsername();
  }

  fetchTravelGroups(): void {
    // Implement API call to fetch travel groups
    this.travelService.getTravelGroups().subscribe(
      (response: any) => {
        this.travelGroups = response.data;
        this.fetchSuccessMessage = response.message;
        this.fetchErrorMessage = '';
      },
      (error: any) => {
        this.fetchErrorMessage = error.message;
        this.fetchSuccessMessage = '';
      }
    );
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  createGroup(): void {
    // Simulate API call for creating a group
    this.travelService
      .createTravelGroup(this.newGroupName, this.newGroupDescription)
      .subscribe(
        (response: any) => {
          this.successsMessage = response.message;
          this.errorMessage = '';
          this.newGroupName = '';
          this.newGroupDescription = '';
          this.showCreateForm = false;
        },
        (error: any) => {
          this.errorMessage = error.message;
          this.successsMessage = '';
        }
      );

    setTimeout(() => {
      // Hide modal
      const modalElement = document.getElementById('createGroupModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      // Optionally refresh the group list
      this.fetchTravelGroups();
    }, 1000);
  }

  joinGroup(group: any): void {
    this.travelService.joinTravelGroup(group._id).subscribe(
      (response: any) => {
        this.successsJoinMessage = response.message;
      },
      (error) => {
        this.errorJoinMessage = error.message;
        this.successsJoinMessage = '';
      }
    );
  }
  groupMembers: any[] = [];

  chatWithGroup(group: any): void {
    this.travelService.getMembers(group._id).subscribe(
      (response) => {
        this.groupMembers = response.data.members;
      },
      (error) => {
        console.log('error to get members', error);
      }
    );

    setTimeout(() => {
      const checkuser = this.groupMembers.map(
        (member: any) => member.username === this.username
      );
      console.log( group._id,"tt")
      if (checkuser.includes(true)) {
        this.router.navigate(['travel-group/chat', group._id]);
      } else {
        alert('Please join the group to chat');
      }
    }, 100);
    
  }


  showMyGroups(): void {
    // Implement logic to show only groups created by the current
    this.router.navigate(['travel-group/my-groups']);
  }
}
