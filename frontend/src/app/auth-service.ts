import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import '@firebase/auth';

@Injectable()
export class AuthService {
  user: Observable <firebase.User>;

  constructor(public afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }

  loginEmail(){
    const provider = new firebase.auth.EmailAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
    //firebase.auth().signInWithPopup(provider);
  }
  loginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
    //firebase.auth().signInWithPopup(provider);
    //console.log(this.user);
  }
  loginTwitter(){
    const provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
    //firebase.auth().signInWithPopup(provider);
  }
  logout(){
    this.afAuth.auth.signOut();
    //firebase.auth().signOut();
  }
}
