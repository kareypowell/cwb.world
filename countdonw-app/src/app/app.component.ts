import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usersCollection : AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  userInfo = {
    name: "",
    email: ""
  }
  constructor(private afs: AngularFirestore){

  }
  ngOnInit(): void {
    this.usersCollection = this.afs.collection('signups');
  }

  notSubbed: boolean = true;
  subbed: boolean = false;
  config = {
    leftTime: new Date(2019,1,31).getTime() / 1000,
    template: '$!d! Days $!h! Hours $!m! Minutes  $!s! Seconds'
  }

  onStart(){

  }
  onFinished(){

  }
  onNotify(event){

  }
  user:User
  subscribe(){
    if(this.userInfo.email != ''){
      this.user.email = this.userInfo.email;
      this.user.name = this.userInfo.name;
      this.usersCollection.add(this.user).then(()=>{
        this.subbed = true;
        this.notSubbed = false;
      }).catch(() =>{

      })
      
    }else{
      console.log("Enter an email");
    }
    
  }
}
