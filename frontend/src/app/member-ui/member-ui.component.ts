import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataTransferService } from '../data-transfer.service';
import { AuthService } from '../auth-service';
import { User } from '../interfaces/member';
import { Router } from '@angular/router';
import { DialogComponent } from './../dialog/dialog.component';


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
  wid = "250px";
  openDialog(source): void {
    if(source == "editProfile"){
      this.wid = '800px';
    }else if (source =="viewProfile"){
      this.wid = '99%';
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.wid,
      data: { source:source, user:this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  
  myRoles = [
    {value: 'member', viewValue: 'Member'},
    {value: 'group-lead', viewValue: 'Group Lead'},
    {value: 'sector-lead', viewValue: 'Sector Lead'},
    {value: 'admin', viewValue: 'Admin'},
    {value: 'host-partner', viewValue: 'Host Partner'}
  ];
  
 
  url = ""; // this and routeToDash Function used to send user to selected role in Role switch option
  routeToDash(){
    this.route.navigate(['/member-ui/'+this.url])
  }
}


