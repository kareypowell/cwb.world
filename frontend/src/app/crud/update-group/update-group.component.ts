import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../../firebase-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Group } from '../../interfaces/member';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  updateCommunityForm: FormGroup;
  updatedGroup:Group = {};
  group: Group;
  private sub;
  constructor(public dialogRef: MatDialogRef<UpdateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fbData: FirebaseDataService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sub = this.fbData.groupCollection.doc(this.data.uid).valueChanges().subscribe(data =>{
      this.group = data;
      
    })
  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
