import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Community } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private fbData:FirebaseDataService) { }

  createCommunityForm: FormGroup;
  newCommunity:Community = {};

  ngOnInit() {
    this.createCommunityForm = this._formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      bio: ['',Validators.required],
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
    this.fbData.addCommunity(this.newCommunity);
  }
}
