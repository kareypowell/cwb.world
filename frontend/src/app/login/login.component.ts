import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginForm } from '../login-form';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails = new LoginForm("","",false);
  constructor(private _auth:AuthService) { }
  
  ngOnInit() {
  }
  
  submitLogin(){
    this._auth.login(this.loginDetails.email,this.loginDetails.password);
  }
}
