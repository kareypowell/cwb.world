import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-member-ui',
  templateUrl: './member-ui.component.html',
  styleUrls: ['./member-ui.component.css']
})
export class MemberUiComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

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
  age: string;
  name: string;

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.age }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.age = result;
    });
  }

}

@Component({
  selector: 'join-group-dialog',
  template: `
      <h1>Request To Join Group</h1>
    `
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


