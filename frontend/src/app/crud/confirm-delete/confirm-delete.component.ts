import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseDataService } from '../../firebase-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fbData: FirebaseDataService) { }

  ngOnInit() {
  }

  status: any = { success: false, fail: false, message: "" };
  deleteItem() {
    this.status = { success: false, fail: false, message: "" };
    if (this.data.collection === 'communities') {
      const vari = this.fbData.deleteCommunity(this.data.uid);
      console.log(vari);
    } else if (this.data.collection === 'events') {
      this.status = this.fbData.deleteEvent(this.data.uid);
    } else if (this.data.collection === 'groups') {
      this.status = this.fbData.deleteGroup(this.data.uid);
    } else if (this.data.collection === 'members') {
      this.status = this.fbData.deleteUser(this.data.uid);
    } else if (this.data.collection === 'sectors') {
      this.status = this.fbData.deleteSector(this.data.uid);
    } else {
      console.log("Unknown collection name");
    }
    setTimeout(() => {
      if (this.status.success) {
        this.onNoClick(false);
      }
      this.status.success = false;
      this.status.fail = false;
    }, 3000);
  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
