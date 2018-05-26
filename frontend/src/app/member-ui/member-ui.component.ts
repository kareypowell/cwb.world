import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataTransferService } from '../data-transfer.service';
import { AuthService } from '../auth-service';
import { User } from '../interfaces/member';
import { Router } from '@angular/router';


@Component({
  selector: 'app-member-ui',
  templateUrl: './member-ui.component.html',
  styleUrls: ['./member-ui.component.css']
})
export class MemberUiComponent implements OnInit {
  user:User;
  constructor(public dialog: MatDialog, private data : DataTransferService, public auth:AuthService, private route: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }
  
  myRoles = [
    {value: 'member', viewValue: 'Member'},
    {value: 'group-lead', viewValue: 'Group Lead'},
    {value: 'sector-lead', viewValue: 'Sector Lead'},
    {value: 'admin', viewValue: 'Admin'},
    {value: 'host-partner', viewValue: 'Host Partner'}
  ];
  
 
  url = "";
  routeToDash(){
    this.route.navigate(['/member-ui/'+this.url])
  }
}


