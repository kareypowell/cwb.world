import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FirebaseDataService } from '../../firebase-data.service';
import { Community } from '../../interfaces/member';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-update-community',
  templateUrl: './update-community.component.html',
  styleUrls: ['./update-community.component.css']
})
export class UpdateCommunityComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  community: Community;

  constructor(public dialogRef: MatDialogRef<UpdateCommunityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fbData: FirebaseDataService, private _formBuilder: FormBuilder) { }
  
  updateCommunityForm: FormGroup;
  newCommunity: Community = {};
  private sub;
  ngOnInit() {
    this.updateCommunityForm = this._formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      bio: ['',Validators.required],
      whatToExpect: ['' ,Validators.required]
    });
    this.sub = this.fbData.communityCollection.doc(this.data.uid).valueChanges().subscribe( data => 
      {
        this.community = data;
        // set values for fields
        this.updateCommunityForm.setValue({
          name: this.community.name,
          description: this.community.description,
          bio: this.community.bio,
          whatToExpect: this.community.whatToExpect
        })
      });
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  updateCommunity(){
    this.newCommunity = {};
    this.newCommunity.name = this.updateCommunityForm.value.name;
    this.newCommunity.description = this.updateCommunityForm.value.description;
    this.newCommunity.bio = this.updateCommunityForm.value.bio;
    this.newCommunity.whatToExpect = this.updateCommunityForm.value.whatToExpect;
    //this.newCommunity.imageUri = "education.jpg"; // for testing
    this.newCommunity.nameToLower = this.updateCommunityForm.value.name.toLowerCase();


    // call function to update community
    this.fbData.updateCommunity(this.data.uid, this.newCommunity);
    //console.log(this.updateCommunityForm.value);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
