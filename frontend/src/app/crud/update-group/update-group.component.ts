import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
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
  communities: Community[];
  sectors: Sector[];

  showSecEdit: boolean = false;
  showCommEdit: boolean = false;
  secChanged: boolean = false;
  commChanged: boolean = false;
  commName : string = "Test Comm";
  secName : string = "Test Sector";

  private subComm;
  private subSect;
  private sub;
  grpComm: Community;
  grpSect: Sector;
  recurrence: string[] = ['Every week', 'Twice a month', 'Thrice a month', 'Once a month', 'Once a quarter', 'Annually'];
  now = new Date();
  temp = new Date();
  future = new Date();
  meetings:meetingDays[];
  dayItem:meetingDays;

  monthAcc:boolean = false;
  monthFee:number =0;
  quaterAcc:boolean = false;
  quaterFee:number =0;
  SemiAnnAcc:boolean = false;
  semiAnnFee:number =0;
  fullAcc:boolean = false;
  fullFee:number =0;

  p: groupPrice;

  constructor(public dialogRef: MatDialogRef<UpdateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fbData: FirebaseDataService, private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.updateGroupForm = this._formBuilder.group({
      grpName: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      capacity: [10, Validators.required],
      comm: '',
      sect: '',
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

    this.subComm = this.fbData.getAllCommunities().subscribe(data => {
      this.communities = data;
      
      this.subSect = this.fbData.getSectorsInCommunity(this.communities[0].uid).subscribe(data => {
        this.sectors = data;
        
        this.sub = this.fbData.groupCollection.doc(this.data.uid).valueChanges().subscribe(data =>{
          this.group = data;
          // get grp prices
          this.group.prices.forEach(price => {
            if(price.allowedTerm){
              if(price.termDescription == 'Monthly'){
                this.monthAcc = true;
                this.monthFee = price.termPrice;
              }else if(price.termDescription == 'Quarterly'){
                this.quaterAcc = true;
                this.quaterFee = price.termPrice;
              }else if(price.termDescription == 'Semi-Annually'){
                this.SemiAnnAcc = true;
                this.semiAnnFee = price.termPrice;
              }else if(price.termDescription == 'Full payment'){
                this.fullAcc = true;
                this.fullFee = price.termPrice;
              }
            }
          })
          //set community
          this.communities.forEach(comm =>{
            if(comm.uid === this.group.community){
              this.commName = comm.name;
            }
          })
          //set sector
          this.sectors.forEach(sec =>{
            if(sec.uid === this.group.sector){
              this.secName = sec.name;
            }
          })
          this.updateGroupForm.setValue({
            grpName: this.group.name,
            description: this.group.description,
            whatToExpect: this.group.whatToExpect,
            capacity: this.group.capacity,
            comm: '',
            sect: '',
            acceptPayment: this.group.acceptPayments,
            bankInfo: this.group.bankInfo,
            routingNumber: this.group.routingNumber,
            accountNumber: this.group.accountNumber,
            monthly: this.monthAcc,
            semiannually: this.SemiAnnAcc,
            quaterly: this.quaterAcc,
            fullpayment: this.fullAcc,
            monthlyFee: this.monthFee,
            semiannuallyFee: this.semiAnnFee,
            quaterlyFee: this.quaterFee,
            fullpaymentFee: this.fullFee
          });
        })
      })
    })

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

    
    
  }
  errorUpdate: boolean = false;
  successUpdate: boolean = false;
  updateGroup(){
    this.errorUpdate = false;
    this.successUpdate = false;
    this.updatedGroup = {};
    this.updatedGroup.name = this.updateGroupForm.value.grpName;
    this.updatedGroup.description = this.updateGroupForm.value.description;
    this.updatedGroup.whatToExpect = this.updateGroupForm.value.whatToExpect;
    this.updatedGroup.capacity = this.updateGroupForm.value.capacity;
    this.updatedGroup.acceptPayments = this.updateGroupForm.value.acceptPayment;
    this.updatedGroup.bankInfo = this.updateGroupForm.value.bankInfo;
    this.updatedGroup.accountNumber = this.updateGroupForm.value.accountNumber;
    this.updatedGroup.routingNumber = this.updateGroupForm.value.routingNumber;
    if(this.commChanged){
      this.updatedGroup.community = this.updateGroupForm.value.comm.uid;
    }
    if(this.secChanged){
      this.updatedGroup.sector = this.updateGroupForm.value.sect.uid;
    }
    this.updatedGroup.prices = [];
    if (this.updateGroupForm.value.monthly) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Monthly";
      this.p.termPrice = this.updateGroupForm.value.monthlyFee

      this.updatedGroup.prices.push(this.p);
    }
    if (this.updateGroupForm.value.quaterly) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Quarterly";
      this.p.termPrice = this.updateGroupForm.value.quaterlyFee;
      this.updatedGroup.prices.push(this.p);
    }

    if (this.updateGroupForm.value.semiannually) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Semi-Annually";
      this.p.termPrice = this.updateGroupForm.value.semiannuallyFee;
      this.updatedGroup.prices.push(this.p);
    }
    if (this.updateGroupForm.value.fullpayment) {
      this.p = {};
      this.p.allowedTerm = true;
      this.p.termDescription = "Full payment";
      this.p.termPrice = this.updateGroupForm.value.fullpaymentFee;
      this.updatedGroup.prices.push(this.p);
    }

    //console.log(this.updatedGroup);
    if(this.fbData.updateGroup(this.data.uid,this.updatedGroup)){
      //this.successUpdate = true;
      this.onNoClick(false);
    }else{
      //this.errorUpdate = true;
      this.onNoClick(false);
    }
    
  }


  getSectorsInCommunity(commID: string){
    this.subSect.unsubscribe();
    this.subSect = this.fbData.getSectorsInCommunity(commID).subscribe(data => this.sectors = data);
  }
  

  saveNewComm(){
    this.commChanged = true;
    this.commName = this.updateGroupForm.value.comm.name;

  }

  saveNewSector(){
    this.secChanged = true;
    this.secName = this.updateGroupForm.value.sect.name;
  }


  onNoClick(data): void {
    this.dialogRef.close(data);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subComm.unsubscribe();
    this.subSect.unsubscribe();
    
  }
}
