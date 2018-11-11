import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FirebaseDataService } from '../firebase-data.service';
import { signUps } from '../interfaces/member';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  constructor(private fbData: FirebaseDataService) { }

  ngOnInit() {
  }


  userInfo = {
    name: "",
    email: ""
  }

  notSubbed: boolean = true;
  subbed: boolean = false;
  config = {
    leftTime: (new Date('2019,01,31').getTime() - new Date().getTime()) / 1000,
    template: '$!d! Days $!h! Hours $!m! Min  $!s! Sec'
  }

  onStart(){

  }
  onFinished(){

  }
  onNotify(event){

  }
  alreadySigned: boolean = false;
  user:signUps = {};
  alSigned: signUps;
  subscribe(){
    this.alreadySigned = false;
    if(this.userInfo.email != ''){
      this.user.email = this.userInfo.email;
      this.user.name = this.userInfo.name;
      if(this.user.name == ''){
        this.user.name = "CWBer";
      }
      this.fbData.checkSignUp(this.user).subscribe(data => {
        console.log(data);
        if(data.length == 0){
          this.fbData.signup(this.user)
          this.subbed = true;
          this.notSubbed = false;
        }else{
          this.alSigned = data[0];
          this.alreadySigned = true;
        }
      }) 
    }else{
      console.log("Enter an email");
    }
    
  }
}
