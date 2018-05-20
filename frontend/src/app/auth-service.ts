import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable <firebase.User>;

  constructor(public afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }
  register(email:string,password:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=> console.log(res)).catch(error=>console.log(error));
  }
  loginEmail(email:string,password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password).then().catch(error =>console.log(error));
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
  loginFacebook(){
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }
  logout(){
    this.afAuth.auth.signOut();
    //firebase.auth().signOut();
  }
}
