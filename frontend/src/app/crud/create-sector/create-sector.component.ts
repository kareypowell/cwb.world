import { Component, OnInit } from '@angular/core';
import { Sector, Community, User, Group } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.css']
})
export class CreateSectorComponent implements OnInit {

  constructor(private fbData:FirebaseDataService,private _formBuilder: FormBuilder) { }

  newSector:Sector = {};
  createSectorForm: FormGroup;
  private sub;

  ngOnInit() {
    this.createSectorForm = this._formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      bio: ['',Validators.required],
      whatToExpect: ['',Validators.required],
      searchStringSectorLead: '',
      community: ''
    });
  }
  createSector(){
    this.newSector.name = this.createSectorForm.value.name;
    this.newSector.description = this.createSectorForm.value.description;
    this.newSector.bio = this.createSectorForm.value.bio;
    this.newSector.whatToExpect = this.createSectorForm.value.whatToExpect;
    this.newSector.sectorLead = this.secLead;
    this.newSector.community = this.commSelected;
    this.newSector.files = []; // initialize sector files
    this.newSector.dateCreated = new Date();
    this.newSector.imageUrl = null; // set image url to null for now
    this.newSector.nameToLower = this.createSectorForm.value.name.toLowerCase(); // for search indexing
    //console.log(this.newSector);
    // call firebase to create sector
    this.fbData.addSector(this.newSector, this.secLeadRef);
  }
  private secLead:string;
  secLeadRef:User;
  getSectorLead(option:User){
    this.secLeadRef = option;
    this.secLead = option.uid;
  }
  private commSelected;
  getCommunity(option){
    this.commSelected = option.name;
  }

  commSearch:Community[];
  groupSearch:Group[];
  userSearch:User[];


  lastKeypress: number = 0;

  searchCommunity($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      //console.log(this.createSectorForm.value.searchString);
      this.fbData.searchCollection(String(this.createSectorForm.value.community),"communities","nameToLower",5).subscribe(data => this.commSearch = data);
    }
    this.lastKeypress = $event.timeStamp;
  }
  searchUser($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      //console.log(this.createSectorForm.value.searchString);
      this.fbData.searchCollection(String(this.createSectorForm.value.searchStringSectorLead),"users","fullnameToLower",5).subscribe(users => this.userSearch = users);
    }
    this.lastKeypress = $event.timeStamp;
  }
}
