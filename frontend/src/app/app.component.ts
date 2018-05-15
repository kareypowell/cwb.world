import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private auth:AuthService) { }
  title = 'app';
  
  
  ngOnInit(){
    firebase.initializeApp({
    apiKey: "AIzaSyD4QXiTy17ryixEh1wc14rk0NvcWMTCkus",
    authDomain: "cwb-userbase.firebaseapp.com"
    });
    console.log("Firebase App Initiated");
  }
}
