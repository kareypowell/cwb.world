import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseDataService } from '../../firebase-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  deleteItem(){
    if(this.data.collection === 'communities'){
      this.fbData.deleteCommunity(this.data.uid);
    }else if (this.data.collection === 'events'){
      this.fbData.deleteEvent(this.data.uid);
    }else if (this.data.collection === 'groups'){
      this.fbData.deleteGroup(this.data.uid);
    }else if (this.data.collection === 'members'){
      this.fbData.deleteUser(this.data.uid);
    }else if (this.data.collection === 'sectors'){
      this.fbData.deleteSector(this.data.uid);
    }else{
      console.log("Unknown collection name");
    }
    this.onNoClick(false);
  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
