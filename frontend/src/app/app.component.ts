import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseDataService } from './firebase-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private auth:AuthService,private router: Router, private fbData: FirebaseDataService) { }
  title = 'app';

  private subs;

  ngOnInit(){
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    //this.subs = this.fbData.getGroups().subscribe(data=>console.log(data));
  }
}
