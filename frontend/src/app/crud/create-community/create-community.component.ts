import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Community, User } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';
import { AuthService } from '../../auth-service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private _formBuilder: FormBuilder, private fbData:FirebaseDataService, private auth:AuthService, public dialogRef: MatDialogRef<CreateCommunityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  createCommunityForm: FormGroup;
  newCommunity:Community = {};
  private currentUser:User;

  ngOnInit() {
    this.auth.user$.subscribe(data => this.currentUser = data); // get Current User Details

    this.createCommunityForm = this._formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      bio: '',
      whatToExpect: ['',Validators.required]
    });
  }

  // create community from form data
  createCommunity(){
    this.newCommunity.name = this.createCommunityForm.value.name;
    this.newCommunity.description = this.createCommunityForm.value.description;
    this.newCommunity.bio = this.createCommunityForm.value.bio;
    this.newCommunity.whatToExpect = this.createCommunityForm.value.whatToExpect;
    this.newCommunity.imageUri = "education.jpg"; // for testing
    this.newCommunity.nameToLower = this.createCommunityForm.value.name.toLowerCase();
    this.newCommunity.dateCreated = new Date();
    this.newCommunity.files = []; // initialize files array
    this.newCommunity.assignedTo = null; // set assigned to to null till you know what this means, either assign to person or what?
    this.newCommunity.numberMembers = 0;
    this.newCommunity.sectorsInCommunity = []; // hold uids of sectors
    this.newCommunity.groupsInCommunity = []; // hold uids of groups in this community
    this.newCommunity.createdBy = this.currentUser.uid; // get who created community

    this.fbData.addCommunity(this.newCommunity); // call firebase service to add new community
    // close dialog
    this.onNoClick(false);
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
