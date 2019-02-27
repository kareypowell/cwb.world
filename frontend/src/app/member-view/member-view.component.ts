import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SearchPipe } from '../pipes/search.pipe';
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../firebase-data.service';
import { Group, Community, Sector, User } from '../interfaces/member';
import { RequestToJoinGroupComponent } from '../dialog-components/request-to-join-group/request-to-join-group.component';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit, OnDestroy {
  groupPaneWidth: number = 4;
  eventPaneWidth: number = (12 - this.groupPaneWidth);

  public config: PerfectScrollbarConfigInterface = {};
  todayDate = new Date();
  wid = "600px";

  constructor(private data: DataTransferService, public dialog: MatDialog, private fbData: FirebaseDataService, private auth: AuthService) { }

  openDialog(): void {

    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.wid,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

  joinGroup(grp) {
    let dialogRef = this.dialog.open(RequestToJoinGroupComponent, {
      width: '90%',
      data: { grp: grp }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }
  currentCommunity: Community;
  currentSector: Sector;
  currentGroup: Group;
  groups: Group[] = [];
  myGroups: Group[];
  user: User;
  private sub4;
  searchValMyGroups: string = "";
  showMyGroupDetails: boolean = false;
  currentMyGroup: Group;

  ngOnInit() {
    this.sub = this.fbData.getAllGroups().subscribe(data => {
      this.groups = data;
      this.currentGroup = this.groups[0];
      this.sub4 = this.auth.user$.subscribe(data => {
        this.user = data;
        const uid = this.user.uid;
        this.myGroups = [];
        if (this.currentGroup.members.find(function (obj) { return obj.userUID == uid }) || this.currentGroup.members.length >= this.currentGroup.capacity) {
          this.showJoinButton = false;
        } else {
          this.showJoinButton = true;
        }
        // get groups I have joined
        this.groups.forEach(group => {
          if (group.members.find(function (obj) { return obj.userUID == uid })) {
            this.myGroups.push(group);
          }
        });
        if (this.myGroups.length > 0) {
          this.currentMyGroup = this.myGroups[0];
        }
      });
    });
    this.sub2 = this.fbData.getAllCommunities().subscribe(data => {
      this.communities = data;
      this.currentCommunity = this.communities[0];
      this.sub3 = this.fbData.getSectorsInCommunity('').subscribe(data => {
        this.sectors = data;
        this.currentSector = this.sectors[0];
      });
    });


  }

  getSectors() {
    this.sub3.unsubscribe();
    this.sub3 = this.fbData.getSectorsInCommunity(this.currentCommunity.uid).subscribe(data => {
      this.sectors = data;
      this.currentSector = this.sectors[0];
    });
  }
  searchVal = "";
  sectorVal = "";
  commVal = "";

  communities: Community[];

  sectors: Sector[];


  showJoinButton: boolean = true;
  displayGroupInfo(grp) {
    this.showJoinButton = false;
    const uid = this.user.uid;
    if (grp.members.find(function (obj) { return obj.userUID == uid }) || this.currentGroup.members.length >= this.currentGroup.capacity) {
      this.showJoinButton = false;
    } else {
      this.showJoinButton = true;
    }
    this.currentGroup = grp;
  }
  showGroupSearch: boolean = true;
  hideGroupSearch() {
    this.showGroupSearch = !this.showGroupSearch;
    if (this.showGroupSearch) {
      this.eventPaneWidth = 12 - this.groupPaneWidth;
    } else {
      this.eventPaneWidth = 12;
    }
  }

  memberToDelete: any;
  leaveGroup() {
    this.currentMyGroup.members.forEach(mem => {
      if (mem.userUID == this.user.uid) {
        this.memberToDelete = mem;
      }
    })
    this.currentMyGroup.members.splice(this.currentMyGroup.members.indexOf(this.memberToDelete), 1);
    this.user.groupsJoined.splice(this.user.groupsJoined.indexOf(this.currentMyGroup.uid));
    this.fbData.leaveGroup(this.memberToDelete, this.user, this.currentMyGroup);
    this.showJoinButton = true;
  }
  private sub;
  private sub2;
  private sub3;
  ngOnDestroy(): void {
    console.log("Destroyed member page");
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

}

