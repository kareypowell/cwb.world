import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SearchPipe } from '../pipes/search.pipe';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit {
  animal = "";
  wid = "250px";
  constructor(private data:DataTransferService,
    public dialog: MatDialog)
     { }
     openDialog(source,grpName): void {
      if(source == "reqToJoin"){
        this.wid = '600px';
      }
      let dialogRef = this.dialog.open(DialogComponent, {
        width: this.wid,
        data: { grpName: grpName }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
  ngOnInit() {
  }
  searchVal = "";
  sectorVal = "";
  commVal = "";

  communities = [
    {value: 'all', viewValue: 'All Communities'},
    {value: 'education', viewValue: 'Education'},
    {value: 'careers', viewValue: 'Careers'},
    {value: 'business', viewValue: 'Business'},
    {value: 'non-profit', viewValue: 'Non-Profit'},
    {value: 'wellness', viewValue: 'Wellness'},
    {value: 'government', viewValue: 'Government'},
    {value: 'art-and-entertainment', viewValue: 'Art and Entertainment'},
    {value: 'investment', viewValue: 'Investment'},
    {value: 'hollywood', viewValue: 'Hollywood'}
  ];
  sectors = [
    {value: 'all', viewValue: 'All Sectors'},
    {value: 'pre-k', viewValue: 'Pre K'},
    {value: 'k to 5', viewValue: 'K - 5th Grade'},
    {value: '5-8-grade', viewValue: '5th Grade - 8th Grade'},
    {value: 'high-school', viewValue: 'High School'},
    {value: 'Undergraduate', viewValue: 'Undergraduate'},
    {value: 'postgraduate', viewValue: 'Postgraduate'}
  ];

  groups = this.data.groups;
  currentGroup = this.groups[0];
  displayGroupInfo(grp){
    this.currentGroup = grp;
  }

}

