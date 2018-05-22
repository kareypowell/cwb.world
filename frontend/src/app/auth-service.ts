import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable <firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router: Router) { 
    this.user = afAuth.authState;
  }
  register(email:string,password:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=> console.log(res)).catch(error=>console.log(error));
  }
  loginEmail(email:string,password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password).then((success)=>this.router.navigate(['/member-ui'])).catch(error =>console.log(error));
  }
  loginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((success)=>this.router.navigate(['/member-ui']));
  }
  loginTwitter(){
    const provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((success)=>this.router.navigate(['/member-ui']));
  }
  loginFacebook(){
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((success)=>this.router.navigate(['/member-ui']));
  }
  logout(){
    this.afAuth.auth.signOut();
  }
}
