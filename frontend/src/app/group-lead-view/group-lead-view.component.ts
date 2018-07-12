import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Community, Sector, Group, User, EventItem, GroupMember } from '../interfaces/member';
import { FirebaseDataService } from '../firebase-data.service';
import { AuthService } from '../auth-service';
import { ConfirmDeleteComponent } from '../crud/confirm-delete/confirm-delete.component';
import { UpdateGroupComponent } from '../crud/update-group/update-group.component';
import { UpdateEventComponent } from '../crud/update-event/update-event.component';
import { CreateGroupComponent } from '../crud/create-group/create-group.component';
import { CreateEventComponent } from '../crud/create-event/create-event.component';

@Component({
  selector: 'app-group-lead-view',
  templateUrl: './group-lead-view.component.html',
  styleUrls: ['./group-lead-view.component.css']
})
export class GroupLeadViewComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  todayDate = new Date();
  constructor(private dialog: MatDialog, private fbData: FirebaseDataService, private auth: AuthService, private dataTransfer: DataTransferService) { }

  filterSearch: string = "";
  searchVal = "";

  private groupSub;
  private memberSub;
  private eventSub;
  private subUser;

  groups: Group[];
  members: GroupMember[] = [];
  events: EventItem[];
  user: User;

  currentGroup;
  currentMember;
  currentEvent;

  dataset = {};

  dialogWidth = '90%';


  ngOnInit() {
    this.subUser = this.auth.user$.subscribe(data => {
      this.user = data;

      // sub for user groups lead
      this.groupSub = this.fbData.getGroupsLead(this.user.uid).subscribe(data => {
        this.groups = data;
        if (this.groups.length != 0) {
          this.currentGroup = this.groups[0];
        }
        // sub for events
        this.eventSub = this.fbData.getEventsInAGroup(this.currentGroup.uid).subscribe(data => {
          this.events = data;
          if (this.events.length != 0) {
            this.currentEvent = this.events[0];
          }
        });
      });



      // sub for members in user's groups
      this.memberSub = this.fbData.groupMembersFromDB$.subscribe(data => {
        this.members = data;
        if (data.length != 0) {
          this.currentMember = this.members[0];
        }
      });

    });
  }
  displayGroupInfo(grp) {
    this.currentGroup = grp;
  }

  getEvents(){
    this.eventSub.unsubscribe();
    this.eventSub = this.fbData.getEventsInAGroup(this.currentGroup.uid).subscribe(data => {
      this.events = data;
      if (this.events.length != 0) {
        this.currentEvent = this.events[0];
      }
    });
  }

  createGroup() {
    let dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '99%',
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  updateGroup(groupID) {
    this.dataset = { uid: groupID }
    let dialogRef = this.dialog.open(UpdateGroupComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  createEvent() {
    this.dataset = { grp: this.currentGroup };
    let dialogRef = this.dialog.open(CreateEventComponent, {
      width: '99%',
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
  updateEvent(event) {
    this.dataset = { event: event }
    let dialogRef = this.dialog.open(UpdateEventComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  deleteItem(itemID: string, collection: string) {
    this.dataset = {
      uid: itemID,
      collection: collection
    };
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: this.dataset
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }


  ngOnDestroy(): void {
    this.groupSub.unsubscribe();
    this.memberSub.unsubscribe();
    this.eventSub.unsubscribe();
    this.subUser.unsubscribe();

  }
}
