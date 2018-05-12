import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginForm } from '../login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails = new LoginForm("","",false);
  constructor() { }
  
  ngOnInit() {
  }
  
  submitLogin(){
    console.log(this.loginDetails);
  }
}
