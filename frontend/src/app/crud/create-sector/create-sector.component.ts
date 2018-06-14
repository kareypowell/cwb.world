import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sector, Community, User, Group } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.css']
})
export class CreateSectorComponent implements OnInit, OnDestroy {

  constructor(private fbData:FirebaseDataService,private _formBuilder: FormBuilder, private auth:AuthService) { }

  newSector:Sector = {};
  createSectorForm: FormGroup;
  private sub;
  private sub2;
  private CurrentUser:User;

  ngOnInit() {
    this.auth.user$.subscribe(data => this.CurrentUser = data); // get Current User info

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
    this.newSector.createdBy = this.CurrentUser.firstName + " " + this.CurrentUser.lastname; // assign createdBy to current User
    this.newSector.groupsInSector = []; // init groups in sector
    this.newSector.numberMembers = 0; // Init number of members in sector
    
    this.fbData.addSector(this.newSector, this.secLeadRef); // call firebase to create sector
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
      this.sub = this.fbData.searchCollection(String(this.createSectorForm.value.community),"communities","nameToLower",5).subscribe(data => this.commSearch = data);
    }
    this.lastKeypress = $event.timeStamp;
  }
  searchUser($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      this.sub2 = this.fbData.searchCollection(String(this.createSectorForm.value.searchStringSectorLead),"users","fullnameToLower",5).subscribe(users => this.userSearch = users);
    }
    this.lastKeypress = $event.timeStamp;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
