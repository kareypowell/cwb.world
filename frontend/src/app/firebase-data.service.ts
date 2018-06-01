import { Injectable, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, merge } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from './interfaces/member';
import { Group } from './interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService implements OnInit {
  user:User;
  userData:User;
  
  groupCollection: AngularFirestoreCollection<Group>;
  groupsFromDB$ : Observable<Group[]>;


  constructor(public afs: AngularFirestore,private router: Router) { 
    this.groupsFromDB$ = this.afs.collection('groups').valueChanges();
  }

  ngOnInit(): void {
    this.groupCollection = this.afs.collection('groups');
    this.groupsFromDB$ = this.groupCollection.valueChanges();
  }

  updateUser(user:User){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
  }
  // GROUPS
  getGroups(){
    return this.groupsFromDB$;
  }
  
  // create a new group
  createGroup(data:Group){
    
    
    const sendData: Group = {

    }
  }
  // ASSIGN NEW ROLES
  makeAdmin(user:User){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
    const data: User ={
      roles: {
        admin: true
      }
    }
  }
  
}


