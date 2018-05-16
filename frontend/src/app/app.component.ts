import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth-service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private auth:AuthService,private router: Router) { }
  title = 'app';
  
  
  ngOnInit(){
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    firebase.initializeApp({
    apiKey: "AIzaSyD4QXiTy17ryixEh1wc14rk0NvcWMTCkus",
    authDomain: "cwb-userbase.firebaseapp.com"
    });
    console.log("Firebase App Initiated");
  }
}
