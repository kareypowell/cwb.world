import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  constructor(private data:DataTransferService) { }
  community: object = this.data.community;
  ngOnInit() {

  }
  
  groups = this.data.groups;
   
  setGroup(group){
    this.data.groupPassed = group;
  }
}
