import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  todayDate = new Date();
  constructor(private data: DataTransferService, private dialog:MatDialog) { }

  ngOnInit() {
  }
  dataset = {};

  openDialog(source): void {
    if(source == 'createCommunity'){
      this.dataset = { createCommunity: true }
    }else if(source == 'createSector'){
      this.dataset = { createSector: true }
    }else if(source == 'createGroup'){  // create group already exists, check and correct according...
      this.dataset = { createGroup: true }
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  searchVal = "";
  communities = [
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
    {value: 'pre-k', viewValue: 'Pre K'},
    {value: 'k-5-grade', viewValue: 'K - 5th Grade'},
    {value: '5-8-grade', viewValue: '5th Grade - 8th Grade'},
    {value: 'high-school', viewValue: 'High School'},
    {value: 'undergrad', viewValue: 'Undergraduate'},
    {value: 'postgrad', viewValue: 'Postgraduate'}
  ];

  groups = this.data.groups;
  currentGroup = this.groups[0];
  displayGroupInfo(grp){
    this.currentGroup = grp;
  }
}
