import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from '../register-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerDetails = new RegisterForm();
  constructor() { }

  ngOnInit() {
  }
  
  submitRegister(){
    console.log(this.registerDetails);
  }
}
