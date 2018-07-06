import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-create-air-rms-space',
  templateUrl: './create-air-rms-space.component.html',
  styleUrls: ['./create-air-rms-space.component.css']
})
export class CreateAirRmsSpaceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateAirRmsSpaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    public config: PerfectScrollbarConfigInterface = {};

  ngOnInit() {
  }


  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
