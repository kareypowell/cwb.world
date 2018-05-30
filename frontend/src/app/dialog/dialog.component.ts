import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from "../interfaces/member";
import { AuthService } from "../auth-service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  user: User;

  isLinear = false;
  updateUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(data => {this.user = data,
      (<FormGroup>this.updateUserForm.controls['firstName'])
      .setValue([this.user.firstName]),
      (<FormGroup>this.updateUserForm.controls['lastName'])
      .setValue([this.user.lastname]),
      (<FormGroup>this.updateUserForm.controls['about'])
      .setValue([this.user.aboutUser]),
      (<FormGroup>this.updateUserForm.controls['phoneNumber'])
      .setValue([this.user.phoneNumber])
    });
    
    this.updateUserForm = this._formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      about: ['',Validators.required],
      phoneNumber: ['',Validators.required]
    });
  }

  updateUserInfo(){
    const data: User = {
      firstName: this.updateUserForm.value.firstName,
      lastname: this.updateUserForm.value.lastName,
      aboutUser: this.updateUserForm.value.about,
      phoneNumber: this.updateUserForm.value.phoneNumber,
      dateOfBirth: this.updateUserForm.value.dob
    }
    this.auth.completeRegistration(this.user,data);
  }

  acceptTerms: boolean = false;
  notRobot:boolean = false;
  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}

