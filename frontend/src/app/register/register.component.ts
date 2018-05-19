import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from '../register-form';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerDetails = new RegisterForm();
  constructor(private _auth:AuthService) { }

  ngOnInit() {
  }
  
  submitRegister(){
    this._auth.register(this.registerDetails.email,this.registerDetails.password);
  }
}
