import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  user: User;
  
  constructor(public dialog: MatDialog, private data: DataTransferService, public auth: AuthService, private route: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }

  // Member Role select
  roles = [
    {
      name: 'My Roles',
      rolegrp: [{ value: 'member', viewValue: 'Member', param: 'member' },
      { value: 'group-lead', viewValue: 'Group Lead', param: 'groupLead' },
      { value: 'sector-lead', viewValue: 'Sector Lead',param: 'sectorLead' },
      { value: 'admin', viewValue: 'Admin', param:'admin' },
      { value: 'host-partner', viewValue: 'AIR RMS Host' ,param: 'hostPartner' }
      ]
    },
    {
      name: 'Other Roles',
      rolegrp: [{ value: 'member', viewValue: 'Member', param: 'member' },
      { value: 'group-lead', viewValue: 'Group Lead', param: 'groupLead' },
      { value: 'sector-lead', viewValue: 'Sector Lead',param: 'sectorLead' },
      { value: 'admin', viewValue: 'Admin', param:'admin' },
      { value: 'host-partner', viewValue: 'AIR RMS Host' ,param: 'hostPartner' }
    ]
    }
  ];
  gallery = [
    {src:'./../../assets/images/user-silhouet.png',title:'Nicki Minaj',description:'Not a big fun of words so here, a picture!'},
    {src:'./../../assets/images/user-silhouet.png',title:'Paris was great!',description:'Not a big fun of words so here, a picture!'},
    {src:'./../../assets/images/user-silhouet.png',title:'At Madrid',description:'Not a big fun of words so here, a picture!'},
    {src:'./../../assets/images/user-silhouet.png',title:'Senior ball',description:'Not a big fun of words so here, a picture!'}
  ];
  // Modal Items
  wid = "250px";
  openDialog(source): void {
    if (source == "editProfile") {
      this.wid = '800px';
    } else if (source == "viewProfile") {
      this.wid = '99%';
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.wid,
      data: { source: source, user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }


  // Route to Role view
  url = ""; // this and routeToDash Function used to send user to selected role in Role switch option
  routeToDash() {
    this.route.navigate(['/member-ui/' + this.url])
  }
}


