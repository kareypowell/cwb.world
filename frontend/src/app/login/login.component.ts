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
  hide = true;
  loginDetails = new LoginForm("","",false);
  constructor(private _auth:AuthService) { }
  
  ngOnInit() {
  }
  
  submitLogin(){
    //this._auth.loginEmail(this.loginDetails.email,this.loginDetails.password);
  }
  login_google(){
    this._auth.loginGoogle();
  }
  login_twitter(){
    this._auth.loginTwitter();
  }
  login_facebook(){
    this._auth.loginFacebook();
  }
}
