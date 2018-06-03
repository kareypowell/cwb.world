import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from "../interfaces/member";
import { AuthService } from "../auth-service";
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../firebase-data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy{
  user: User;
  private _subscription; // used to manage subscription. unsubscribe on destruction of component
  public config: PerfectScrollbarConfigInterface = {};
  isLinear = false;
  updateUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private auth: AuthService, private fbData:FirebaseDataService) { }
  update = {};
  ngOnInit() {
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
  ngOnDestroy() {
    this._subscription.unsubscribe();
    
  }
  updateSuccess:boolean = false;
  errorOccured:boolean = false;

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
  termSelected;
  joinGroup(){
    this.fbData.joinGroup(this.data.grp,this.user);
  }
  acceptTerms: boolean = false;
  notRobot:boolean = false;
  
  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}

