import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../../firebase-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Group, Community, Sector, meetingDays, groupPrice } from '../../interfaces/member';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  updateGroupForm: FormGroup;
  updatedGroup:Group = {};
  group: Group;
  private sub;
  recurrence: string[] = ['Every week', 'Twice a month', 'Thrice a month', 'Once a month', 'Once a quarter', 'Annually'];
  now = new Date();
  temp = new Date();
  future = new Date();
  meetings:meetingDays[];
  dayItem:meetingDays;

  constructor(public dialogRef: MatDialogRef<UpdateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fbData: FirebaseDataService, private _formBuilder: FormBuilder) { }

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

    this.updateGroupForm = this._formBuilder.group({
      grpName: ['', Validators.required],
      description: ['', Validators.required],
      bio: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      capacity: [10, Validators.required],
      community: '',
      searchStringSector: '',
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
    this.sub = this.fbData.groupCollection.doc(this.data.uid).valueChanges().subscribe(data =>{
      this.group = data;
      this.updateGroupForm.setValue({
        grpName: this.group.name,
        description: this.group.description,
        bio: this.group.bio,
        whatToExpect: this.group.whatToExpect,
        capacity: this.group.capacity,
        community: '',
        searchStringSector: this.group.sector,
        acceptPayment: this.group.acceptPayments,
        bankInfo: this.group.bankInfo,
        routingNumber: this.group.routingNumber,
        accountNumber: this.group.accountNumber,
        monthly: this.group.prices[0].allowedTerm,
        semiannually: this.group.prices[0].allowedTerm,
        quaterly: this.group.prices[0].allowedTerm,
        fullpayment: this.group.prices[0].allowedTerm,
        monthlyFee: this.group.prices[0].termPrice,
        semiannuallyFee: this.group.prices[0].termPrice,
        quaterlyFee: this.group.prices[0].termPrice,
        fullpaymentFee: this.group.prices[0].termPrice
      });
    })
  }

  updateGroup(){
    this.updatedGroup = {};
    
    console.log(this.updatedGroup);
    alert("Update functionality still in the works...");
  }
  commSearch:Community[];
  sectorSearch: Sector[];
  searchCommunity($event){

  }
  searchSector($event){

  }
  getCommunity(option){

  }
  getSector(option){

  }
  

  customPayments: groupPrice[] = [];
  p: groupPrice;
  createNewPaymentField() {
    this.p = {};
    this.customPayments.push(this.p);
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    
  }
}
