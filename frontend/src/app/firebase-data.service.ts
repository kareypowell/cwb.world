import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, merge } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from './interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  user:User;
  userData:User;

  constructor(public afs: AngularFirestore,private router: Router) { }

  updateUser(user:User){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
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


