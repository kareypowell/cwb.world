import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SearchPipe } from '../pipes/search.pipe';
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../firebase-data.service';
import { Group } from '../interfaces/member';

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
  currentGroup;
  ngOnInit() {
    this.sub = this.fbData.groupsFromDB$.subscribe(data => {this.groups = data, this.currentGroup = this.groups[0]});
    
  }
  groups:Group[];

  searchVal = "";
  sectorVal = "";
  commVal = "";

  communities = [
    { value: "", viewValue: 'All Communities' },
    { value: 'education', viewValue: 'Education' },
    { value: 'careers', viewValue: 'Careers' },
    { value: 'business', viewValue: 'Business' },
    { value: 'non-profit', viewValue: 'Non-Profit' },
    { value: 'wellness', viewValue: 'Wellness' },
    { value: 'government', viewValue: 'Government' },
    { value: 'art-and-entertainment', viewValue: 'Art and Entertainment' },
    { value: 'investment', viewValue: 'Investment' },
    { value: 'hollywood', viewValue: 'Hollywood' }
  ];
  sectors = [
    { value: "", viewValue: 'All Sectors' },
    { value: 'pre-k', viewValue: 'Pre K' },
    { value: 'k to 5', viewValue: 'K - 5th Grade' },
    { value: '5-8-grade', viewValue: '5th Grade - 8th Grade' },
    { value: 'high-school', viewValue: 'High School' },
    { value: 'Undergraduate', viewValue: 'Undergraduate' },
    { value: 'postgraduate', viewValue: 'Postgraduate' }
  ];


  
  displayGroupInfo(grp) {
    this.currentGroup = grp;
  }

  private sub;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

