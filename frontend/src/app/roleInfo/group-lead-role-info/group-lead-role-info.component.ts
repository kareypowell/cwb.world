import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateGroupComponent } from '../../crud/create-group/create-group.component';

@Component({
  selector: 'app-group-lead-role-info',
  templateUrl: './group-lead-role-info.component.html',
  styleUrls: ['./group-lead-role-info.component.css']
})
export class GroupLeadRoleInfoComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '90%',
      data: { createGroup: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

}
