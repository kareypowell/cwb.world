import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    public config: PerfectScrollbarConfigInterface = {};

  ngOnInit() {
  }


  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
