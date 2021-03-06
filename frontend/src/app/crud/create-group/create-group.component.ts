import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from '../../firebase-data.service';
import { Group, Community, Sector, User, groupPrice, meetingDays } from '../../interfaces/member';
import { AuthService } from '../../auth-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit, OnDestroy {
  createGroupForm: FormGroup;
  allGroups: Group[];
  commSearch: Community[];
  sectorSearch: Sector[];
  userSearch: User[];
  currentUser: User;
  recurrence: string[] = ['Every week', 'Twice a month', 'Thrice a month', 'Once a month', 'Once a quarter', 'Annually'];
  now = new Date();
  temp = new Date();
  future = new Date();
  meetings: meetingDays[];
  dayItem: meetingDays;

  constructor(private _formBuilder: FormBuilder, private fbData: FirebaseDataService, private auth: AuthService, public dialogRef: MatDialogRef<CreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  public config: PerfectScrollbarConfigInterface = {};

  myControl: FormControl = new FormControl();
  sector:Sector = {};
  community: Community = {};
  sectors: Sector[];
  communities: Community[];

  private subUser;
  private subComm;
  private subSect;

  ngOnInit() {
    this.now.setHours(9);
    this.now.setMinutes(0);
    this.future.setHours(11);
    this.future.setMinutes(0);



    this.meetings =
      [
        { day: 'Sunday', meet: false, recurrence: this.recurrence[0], startTime: this.now, endTime: this.future },
        { day: 'Monday', meet: false, recurrence: this.recurrence[0], startTime: this.now, endTime: this.future },
        { day: 'Tuesday', meet: false, recurrence: this.recurrence[0], startTime: this.now, endTime: this.future },
        { day: 'Wednesday', meet: false, recurrence: this.recurrence[0], startTime: this.now, endTime: this.future },
        { day: 'Thursday', meet: false, recurrence: this.recurrence[0], startTime: this.now, endTime: this.future },
        { day: 'Friday', meet: false, recurrence: this.recurrence[0], startTime: this.now, endTime: this.future },
        { day: 'Saturday', meet: false, recurrence: this.recurrence[0], startTime: this.now, endTime: this.future }
      ];
    this.subUser = this.auth.user$.subscribe(data => this.currentUser = data); // get current user info
    this.subComm = this.fbData.getAllCommunities().subscribe(data => {
      this.communities = data;
      this.subSect = this.fbData.getSectorsInCommunity(this.communities[0].uid).subscribe(data => this.sectors = data);
    });
    //this.subs = this.fbData.getGroups().subscribe(data=>this.allGroups = data); // used to check if groupName exists

    this.createGroupForm = this._formBuilder.group({
      grpName: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      capacity: [10, Validators.required],
      comm: ['', Validators.required],
      sect: ['', Validators.required],
      acceptPayment: false,
      bankInfo: '',
      routingNumber: '',
      accountNumber: '',
      monthly: false,
      semiannually: false,
      quaterly: false,
      fullpayment: false,
      monthlyFee: '',
      semiannuallyFee: '',
      quaterlyFee: '',
      fullpaymentFee: ''
    });
  }

  newGroup: Group = {};

  createGroup() {
    this.newGroup.name = this.createGroupForm.value.grpName;
    this.newGroup.description = this.createGroupForm.value.description;
    this.newGroup.capacity = this.createGroupForm.value.capacity;
    this.newGroup.whatToExpect = this.createGroupForm.value.whatToExpect;
    this.newGroup.members = [];
    this.newGroup.files = [];
    this.newGroup.acceptPayments = this.createGroupForm.value.acceptPayment;
    this.newGroup.bankInfo = this.createGroupForm.value.bankInfo;
    this.newGroup.accountNumber = this.createGroupForm.value.accountNumber;
    this.newGroup.routingNumber = this.createGroupForm.value.routingNumber;
    this.newGroup.nameToLower = this.createGroupForm.value.grpName.toLowerCase();
    this.newGroup.sector = this.createGroupForm.value.sect.uid;
    this.newGroup.community = this.createGroupForm.value.comm.uid;
    this.newGroup.groupLead = this.currentUser.uid;
    this.newGroup.createdBy = this.currentUser.uid;
    this.newGroup.dateCreated = new Date();
    this.newGroup.approved = false; // set to true after admin approves
    this.newGroup.prices = [];
    this.newGroup.imageUri = "education.jpg"; // dummy image for now
    this.customPayments.forEach(element => {
      if (element.allowedTerm) {
        this.newGroup.prices.push(element);
      }
    });
    if (this.createGroupForm.value.monthly) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Monthly";
      this.p.termPrice = this.createGroupForm.value.monthlyFee

      this.newGroup.prices.push(this.p);
    }
    if (this.createGroupForm.value.quaterly) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Quarterly";
      this.p.termPrice = this.createGroupForm.value.quaterlyFee;
      this.newGroup.prices.push(this.p);
    }

    if (this.createGroupForm.value.semiannually) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Semi-Annually";
      this.p.termPrice = this.createGroupForm.value.semiannuallyFee;
      this.newGroup.prices.push(this.p);
    }
    if (this.createGroupForm.value.fullpayment) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Full payment";
      this.p.termPrice = this.createGroupForm.value.fullpaymentFee;
      this.newGroup.prices.push(this.p);
    }

    // MEETING TIMES


    this.newGroup.meetingTimes = []; // init meeting times
    this.meetings.forEach(day => {
      if (day.meet) {
        this.dayItem = {};
        this.dayItem.day = day.day;
        this.dayItem.recurrence = day.recurrence;
        this.dayItem.startTime = day.startTime;
        this.dayItem.endTime = day.endTime;
        this.newGroup.meetingTimes.push(this.dayItem);
      }
    });
    //console.log(this.newGroup);
    //console.log(this.createGroupForm.value.sect, this.createGroupForm.value.comm);
    this.sector = this.createGroupForm.value.sect;
    this.community = this.createGroupForm.value.comm;
    this.fbData.addGroup(this.newGroup, this.currentUser, this.sector, this.community);

    // close dialog
    this.onNoClick(false);
  }

  customPayments: groupPrice[] = [];
  p: groupPrice;
  createNewPaymentField() {
    this.p = {};
    this.customPayments.push(this.p);
  }

  getSectorsInCommunity(communityID: string) {
    this.createGroupForm.value.sect = null;
    this.subSect.unsubscribe();
    this.subSect = this.fbData.getSectorsInCommunity(communityID).subscribe(data => this.sectors = data);
  }

  /*

  lastKeypress: number = 0;

  commSelected: Community;
  getCommunity(option) {
    this.commSelected = option;
  }
  sectorSelected: Sector;
  getSector(option) {
    this.sectorSelected = option;
  }
  groupLead: User;
  getGroupLead(option) {
    this.groupLead = option;
  }
  searchCommunity($event) {
    this.fbData.searchCollection(String(this.createGroupForm.value.community), "communities", "nameToLower", 5).subscribe(data => this.commSearch = data);
  }
  searchSector($event) {
    this.fbData.searchCollection(String(this.createGroupForm.value.searchStringSector), "sectors", "nameToLower", 5).subscribe(data => this.sectorSearch = data);
  }
  searchUser($event) {
    this.fbData.searchCollection(String(this.createGroupForm.value.searchStringGroupLead), "users", "fullnameToLower", 5).subscribe(data => this.userSearch = data);
  }

  */

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void {
    this.subComm.unsubscribe();
    this.subUser.unsubscribe();
    this.subSect.unsubscribe();
  }
}
