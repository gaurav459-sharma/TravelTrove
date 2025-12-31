import { Component, OnInit } from '@angular/core';
import { TravelgroupsService } from '../services/travelgroups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit {
  myGroups: any[] = []; // This should be populated with the user's groups

  constructor(private travelService:TravelgroupsService,private router:Router) {}

  ngOnInit(): void {
    this.fetchMyGroups();
  }

  fetchMyGroups(): void {
    // Implement API call to fetch the user's groups
    this.travelService.getMyGroups().subscribe(
      (response) => {
        this.myGroups = response.data;
    },
    (error) => {
      console.log(error);
    });
  
    
  }


  chatWithGroup(group: any): void {
    this.router.navigate(['/travel-group/chat', group._id]);
  }
}