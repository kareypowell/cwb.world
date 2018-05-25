import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, merge } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from './interfaces/member';



@Injectable()
export class AuthService {
  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    public afs: AngularFirestore) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        member: true,
        admin: false
      },
      photoURL:user.photoURL || 'https://goo.gl/Fz9nrQ',
    }
    return userRef.set(data, { merge: true });
  }
  register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(success => console.log(success)).catch(error => console.log(error));
  }
  loginEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((success) => this.router.navigate(['/member-ui']),
        (credential) => {
          this.updateUser(credential.user)
          console.log(credential.user);
        })
      .catch(error => console.log(error));
  }
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
    .then(
      credential => this.updateUser(credential.user)
    )
    //.((success) => this.router.navigate(['/member-ui'])
    .catch(error => console.log(error))
    }
  loginTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(
      (credential) => this.updateUser(credential.user)
      //(success) => this.router.navigate(['/member-ui'])
    )
    .catch(error => console.log(error))
  }
  loginFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((success) => this.router.navigate(['/member-ui']));
  }
  logout() {
    this.afAuth.auth.signOut();
    this.user$ = of(null);
  }
}
