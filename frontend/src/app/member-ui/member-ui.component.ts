import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataTransferService } from '../data-transfer.service';
import { AuthService } from '../auth-service';
import { User } from '../interfaces/member';


@Component({
  selector: 'app-member-ui',
  templateUrl: './member-ui.component.html',
  styleUrls: ['./member-ui.component.css']
})
export class MemberUiComponent implements OnInit {
  user:User;
  constructor(public dialog: MatDialog, private data : DataTransferService, public auth:AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
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


