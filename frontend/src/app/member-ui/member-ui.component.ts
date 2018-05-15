import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-member-ui',
  templateUrl: './member-ui.component.html',
  styleUrls: ['./member-ui.component.css']
})
export class MemberUiComponent implements OnInit {

  constructor(public dialog: MatDialog, private data : DataTransferService) { }

  ngOnInit() {
  }
  searchVal = "";
  communities = [
    {value: 'Accra', viewValue: 'Accra'},
    {value: 'Tema', viewValue: 'Tema'},
    {value: 'Kwadaso', viewValue: 'Kwadaso'}
  ];
  sectors = [
    {value: 'sector-1', viewValue: 'Sector 1'},
    {value: 'sector-2', viewValue: 'Sector 2'},
    {value: 'sector-3', viewValue: 'Sector 3'}
  ];

  groups = this.data.groups;
  currentGroup = this.groups[0];
  displayGroupInfo(grp){
    this.currentGroup = grp;
  }
}


