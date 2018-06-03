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
  joinGroup(group:Group, user:User){
    if(group.members.find(function (obj) { return obj.uid === user.uid; })){ // check if user already joined group
      console.log("User Exists");
    }else{
      console.log("User not in members list!");
      if(group.members.length < group.capacity){ // check if group has space for new members
        if(!!group.members){
          group.members.push({uid:user.uid,dateJoined: new Date(), paid: false, paymentTerms:"Monthly"});
          this.groupCollection.doc(group.uid).update({members:group.members}); // update with added member
        }else{
          group.members = [{uid:user.uid,dateJoined: new Date(), paid: false, paymentTerms:"Monthly"}];
          this.groupCollection.doc(group.uid).update({members:group.members}); // add field and update with added member
        }
      }else{
        console.log("Group Full")!
      }
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


