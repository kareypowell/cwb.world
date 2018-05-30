import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from "../interfaces/member";
import { AuthService } from "../auth-service";

@Component({
  selector: 'app-complete-registration-details',
  templateUrl: './complete-registration-details.component.html',
  styleUrls: ['./complete-registration-details.component.css']
})
export class CompleteRegistrationDetailsComponent implements OnInit {
  user: User;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(data => this.user = data);
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      about: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dob: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      streetAdd: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  updateUserInfo(){
    const data: User = {
      firstName: this.firstFormGroup.value.firstName,
      lastname: this.firstFormGroup.value.lastName,
      aboutUser: this.firstFormGroup.value.about,
      phoneNumber: this.firstFormGroup.value.phoneNumber,
      dateOfBirth: this.firstFormGroup.value.dob,
      addressLineOne: this.secondFormGroup.value.streetAdd,
      state: this.secondFormGroup.value.state,
      city: this.secondFormGroup.value.city,
      zipCode: this.secondFormGroup.value.zipCode
    }
    this.auth.completeRegistration(this.user,data);
    console.log(this.firstFormGroup.value,this.secondFormGroup.value);
  }
}


