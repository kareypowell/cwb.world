import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User, Sector, Community, GroupMember } from "../interfaces/member";
import { AuthService } from "../auth-service";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../firebase-data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy{
  user: User;
  private _subscription;
  private _sub2; 
  private _sub3;
  private _sub4;// used to manage subscription. unsubscribe on destruction of component
  public config: PerfectScrollbarConfigInterface = {};
  isLinear = false;
  updateUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private auth: AuthService, public fbData:FirebaseDataService) { }
  update = {};
  ngOnInit() {
    if(this.data.source == "reqToJoin"){
      this._subscription= this.auth.user$.subscribe(data => {this.user = data});
      this._sub2=this.fbData.userCollection.doc(this.data.grp.groupLead).valueChanges().subscribe(data => this.grpLead = data);
      this._sub3=this.fbData.sectorCollection.doc(this.data.grp.sector).valueChanges().subscribe(data => this.sector = data);
      this._sub4=this.fbData.communityCollection.doc(this.data.grp.community).valueChanges().subscribe(data => this.community = data);
    }
    if(this.data.source =="editProfile"){
      this.updateUserForm = this._formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        about: ['',Validators.required],
        phoneNumber: ['',Validators.required],
        dob: [''],
        streetAdd: ['',Validators.required],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zip: ['',Validators.required],
        email: ['',[Validators.required, Validators.email]],
        profilePublic: ['']
      });
      this._subscription= this.auth.user$.subscribe(data => {this.user = data,
        
        this.updateUserForm.setValue(
          {
            firstName:this.user.firstName,
            lastName:this.user.lastname,
            about:this.user.aboutUser,
            phoneNumber:this.user.phoneNumber,
            dob: new Date(this.user.dateOfBirth['seconds']*1000),
            streetAdd: this.user.addressLineOne,
            city: this.user.city,
            state: this.user.state,
            zip: this.user.zipCode,
            email:this.user.email,
            profilePublic: this.user.profilePublic,
        })  
      });
    }
    
  }
  ngOnDestroy() {
    if(this.data.source =="editProfile"){
      this._subscription.unsubscribe();
    }
  
    if(this.data.source == "reqToJoin"){
      this._subscription.unsubscribe();
      this._sub2.unsubscribe();
      this._sub3.unsubscribe();
      this._sub4.unsubscribe();
    }
    
  }
  updateSuccess:boolean = false;
  errorOccured:boolean = false;

  grpLead:User;
  sector: Sector;
  community: Community;

  updateUserInfo(){
    this.updateSuccess = false;
    this.errorOccured = false;
    const data: User = {
      firstName: this.updateUserForm.value.firstName,
      lastname: this.updateUserForm.value.lastName,
      aboutUser: this.updateUserForm.value.about,
      phoneNumber: this.updateUserForm.value.phoneNumber,
      dateOfBirth: this.updateUserForm.value.dob,
      city: this.updateUserForm.value.city,
      state: this.updateUserForm.value.state,
      zipCode: this.updateUserForm.value.zip,
      email: this.updateUserForm.value.email,
      addressLineOne: this.updateUserForm.value.streetAdd,
      profilePublic: !!this.updateUserForm.value.profilePublic
    }
    
    
    if(this.auth.updateUserInfo(this.user,data)){
      this.updateSuccess = true;
    }else{
      this.errorOccured = true;
    }
    setTimeout(()=>{
      this.updateSuccess = false; 
      this.errorOccured = false;
  }, 5000)
  }
  
  status = {success:false,fail:false, msg:""};
  acceptTerms: boolean = false;
  notRobot:boolean = false;
  
  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}

