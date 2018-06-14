import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SearchPipe } from '../pipes/search.pipe';
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../firebase-data.service';
import { Group, Community, Sector } from '../interfaces/member';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit, OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  todayDate = new Date();
  wid = "600px";

  constructor(private data: DataTransferService, public dialog: MatDialog, private fbData: FirebaseDataService) { }
  openDialog(source, grp): void {
    if (source == "reqToJoin") {
      this.wid = '600px';
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.wid,
      data: { source: source, grp: grp }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  currentGroup:Group;
  groups:Group[];
  
  ngOnInit() {
    this.sub = this.fbData.groupsFromDB$.subscribe(data => {this.groups = data, this.currentGroup = this.groups[0]});
    this.sub2 = this.fbData.communitiesFromDB$.subscribe(data => this.communities = data);
    this.sub3 = this.fbData.sectorsFromDB$.subscribe(data => this.sectors = data);
  }
  

  searchVal = "";
  sectorVal = "";
  commVal = "";

  communities: Community[];

  sectors: Sector[];


  
  displayGroupInfo(grp) {
    this.currentGroup = grp;
  }

  private sub;
  private sub2;
  private sub3;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}

