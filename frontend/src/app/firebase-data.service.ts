import { Injectable, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, merge, map } from 'rxjs/operators';
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
    this.groupCollection = this.afs.collection('groups');
    this.groupsFromDB$ = this.afs.collection('groups').snapshotChanges().pipe(map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as Group;
        data.uid = a.payload.doc.id;
        return data;
      })
    }))
  }

  ngOnInit(): void {
    //this.groupCollection = this.afs.collection('groups');
  }

  updateUser(user:User){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
  }
  // GROUPS
  getGroups(){
    return this.groupsFromDB$;
  }
  addGroup(group:Group){
    this.groupCollection.add(group).catch(error=>console.log(error));
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


