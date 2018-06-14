import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from '../../firebase-data.service';
import { Group, GrpMember, Community, Sector, User } from '../../interfaces/member';
import { AuthService } from '../../auth-service';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  createGroupForm: FormGroup;
  allGroups: Group[];
  commSearch: Community[];
  sectorSearch: Sector[];
  userSearch: User[];
  currentUser: User;

  constructor(private _formBuilder: FormBuilder, private fbData: FirebaseDataService, private auth: AuthService) { }

  myControl: FormControl = new FormControl();

  ngOnInit() {
    this.auth.user$.subscribe(data => this.currentUser = data); // get current user info

    //this.subs = this.fbData.getGroups().subscribe(data=>this.allGroups = data); // used to check if groupName exists

    this.createGroupForm = this._formBuilder.group({
      grpName: ['', Validators.required],
      description: ['', Validators.required],
      bio: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      duration: ['', Validators.required],
      capacity: [10, Validators.required],
      searchStringGroupLead: '',
      community: '',
      searchStringSector: '',
      acceptPayment: false,
      bankInfo: '',
      routingNumber: '',
      accountNumber: ''
    });
  }

  newGroup: Group = {};
  newMember: GrpMember = {};

  createGroup() {
    this.newGroup.name = this.createGroupForm.value.grpName;
    this.newGroup.description = this.createGroupForm.value.description;
    this.newGroup.capacity = this.createGroupForm.value.capacity;
    this.newGroup.bio = this.createGroupForm.value.bio;
    this.newGroup.whatToExpect = this.createGroupForm.value.whatToExpect;
    this.newGroup.duration = this.createGroupForm.value.duration;
    this.newGroup.members = [];
    this.newGroup.files = [];
    this.newGroup.acceptPayments = this.createGroupForm.value.acceptPayment;
    this.newGroup.bankInfo = this.createGroupForm.value.bankInfo;
    this.newGroup.accountNumber = this.createGroupForm.value.accountNumber;
    this.newGroup.routingNumber = this.createGroupForm.value.routingNumber;
    this.newGroup.nameToLower = this.createGroupForm.value.grpName.toLowerCase();
    this.newGroup.sector = "";
    this.newGroup.community = "";
    this.newGroup.createdBy = this.currentUser.firstName + " " + this.currentUser.lastname;
    this.newGroup.dateCreated = new Date();
    this.newGroup.approved = false; // set to true after admin approves


    this.fbData.addGroup(this.newGroup);
  }

  lastKeypress: number = 0;
  getCommunity(option) {

  }
  getSector(option) {

  }
  getGroupLead(option) {

  }
  searchCommunity($event) {
    this.fbData.searchCollection(String(this.createGroupForm.value.community), "communities", "nameToLower", 5).subscribe(data => this.commSearch = data);
  }
  searchSector($event) {
    this.fbData.searchCollection(String(this.createGroupForm.value.searchStringSector),"sectors","nameToLower",5).subscribe(data => this.sectorSearch = data);
  }
  searchUser($event) {
    this.fbData.searchCollection(String(this.createGroupForm.value.searchStringGroupLead),"users","fullnameToLower",5).subscribe(data => this.userSearch = data);
  }
}
