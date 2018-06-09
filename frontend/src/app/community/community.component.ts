import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { FirebaseDataService } from '../firebase-data.service';
import { Group } from '../interfaces/member';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {

  constructor(private data:DataTransferService, private fbData:FirebaseDataService) { }
  community: object = this.data.community;
  private sub;
  groupss: Group[];
  ngOnInit() {
    this.sub = this.fbData.groupsFromDB$.subscribe(data => this.groupss = data);
    console.log(this.groupss);
  }
  
  groups = this.data.groups;

  showFilterDiv:boolean = false;
  setGroup(group){
    this.data.groupPassed = group;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
