import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Community, Sector, Group, User, EventItem, GroupMember } from '../interfaces/member';
import { FirebaseDataService } from '../firebase-data.service';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-group-lead-view',
  templateUrl: './group-lead-view.component.html',
  styleUrls: ['./group-lead-view.component.css']
})
export class GroupLeadViewComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  todayDate = new Date();
  constructor(private dialog:MatDialog, private fbData: FirebaseDataService, private auth: AuthService, private dataTransfer: DataTransferService) { }

  filterSearch: string = "";
  
  private groupSub;
  private memberSub;
  private eventSub;
  private subUser;

  groups: Group[];
  members: GroupMember[] =[];
  events: EventItem[] = [];
  user: User;

  currentGroup;
  currentMember;
  currentEvent;



  ngOnInit() {
    this.subUser = this.auth.user$.subscribe(data => {
      this.user = data;

      // sub for user groups lead
      this. groupSub = this.fbData.getGroupsLead(this.user.uid).subscribe(data =>{
        this.groups = data;
        if(this.groups.length != 0){
          this.currentGroup = this.groups[0];
        }
      });

      // sub for members in user's groups
      this.memberSub = this.fbData.groupMembersFromDB$.subscribe(data =>{
        this.members = data;
        if(this.members.length != 0){
          this.currentMember = this.members[0];
        }
      });
      
      // sub for events in user's groups
      this.eventSub = this.fbData.eventsFromDB$.subscribe(data =>{
        data.forEach(event => {
          if(this.user.groupsLead.indexOf(event.group) > -1){ // check if event belongs to groups lead by user
            this.events.push(event);
          }
        });
        //this.currentEvent = this.events[0];
      });

    });
  }
  dataset = {};

  dialogWidth = '90%';

  openDialog(source): void {
    if(source == 'createCommunity'){
      this.dataset = { createCommunity: true }
    }else if(source == 'createSector'){
      this.dataset = { createSector: true }
    }else if(source == 'createGroup'){  // create group already exists, check and correct according...
      this.dataset = { createGroup: true }
    }else if(source == 'createEvent'){
      this.dataset = { createEvent: true }
      this.dataTransfer.createEventGroup = this.currentGroup;
    }else if(source == 'deleteConfirm'){
      this.dialogWidth = '300px'
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  searchVal = "";
  
  
  displayGroupInfo(grp){
    this.currentGroup = grp;
  }
  deleteCommunity(uid:string){
    this.fbData.deleteCommunity(uid);
  }
  ngOnDestroy(): void {
    this.groupSub.unsubscribe();
    this.memberSub.unsubscribe();
    this.eventSub.unsubscribe();
    this.subUser.unsubscribe();
    
  }
}
