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
  groupPaneWidth:number = 4;
  eventPaneWidth:number = (12-this.groupPaneWidth);

  public config: PerfectScrollbarConfigInterface = {};
  todayDate = new Date();
  wid = "600px";

  constructor(private data: DataTransferService, public dialog: MatDialog, private fbData: FirebaseDataService, private auth: AuthService) { }

  openDialog(source, grp): void {
    if (source == "reqToJoin") {
      this.wid = '600px';
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.wid,
      data: { source: source, grp: grp }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }
  joinGroup(grp){
    let dialogRef = this.dialog.open(RequestToJoinGroupComponent, {
      width: '90%',
      data: { grp: grp }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }
  currentGroup:Group;
  groups:Group[];
  user: User;
  private sub4;

  ngOnInit() {
    this.sub = this.fbData.groupsFromDB$.subscribe(data => {this.groups = data, this.currentGroup = this.groups[0]});
    this.sub2 = this.fbData.communitiesFromDB$.subscribe(data => this.communities = data);
    this.sub3 = this.fbData.sectorsFromDB$.subscribe(data => this.sectors = data);
    this.sub4 = this.auth.user$.subscribe(data => this.user = data);
  }
  

  searchVal = "";
  sectorVal = "";
  commVal = "";

  communities: Community[];

  sectors: Sector[];


  showJoinButton:boolean = true;
  displayGroupInfo(grp) {
    this.showJoinButton = false;
    if(grp.members.find(function (obj) { return obj.userUID === this.user.uid; })){
      this.showJoinButton = false;
    }else{
      this.showJoinButton = true;
    }
    this.currentGroup = grp;
  }
  showGroupSearch:boolean = true;
  hideGroupSearch(){
    this.showGroupSearch = !this.showGroupSearch;
    if(this.showGroupSearch){
      this.eventPaneWidth = 12-this.groupPaneWidth;
    }else{
      this.eventPaneWidth = 12;
    }
  }

  private sub;
  private sub2;
  private sub3;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

}

