import { Injectable, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of, BehaviorSubject, zip, Subject } from 'rxjs';
import { switchMap, merge, map, filter } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User, Community, Sector, Group } from './interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService implements OnInit {
  //user
  user: User;
  userData: User;
  // all users
  userCollection: AngularFirestoreCollection<User>;
  usersFromDB$: Observable<User[]>;


  // communties
  communityCollection: AngularFirestoreCollection<Community>;
  communitiesFromDB$: Observable<Community[]>;


  //sectors
  sectorCollection: AngularFirestoreCollection<Sector>;
  sectorsFromDB$: Observable<Sector[]>;


  // groups
  groupCollection: AngularFirestoreCollection<Group>;
  groupsFromDB$: Observable<Group[]>;



  constructor(public afs: AngularFirestore, private router: Router) {
    this.groupCollection = this.afs.collection('groups');
    this.communityCollection = this.afs.collection('communities');
    this.sectorCollection = this.afs.collection('sectors');
    this.userCollection = this.afs.collection('users');

    // get community collection
    this.communitiesFromDB$ = this.communityCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Community;
        data.uid = a.payload.doc.id;
        return data;
      })
    }));

    // get sector collection
    this.sectorsFromDB$ = this.sectorCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Sector;
        data.uid = a.payload.doc.id;
        return data;
      })
    }));

    // get group collection
    this.groupsFromDB$ = this.afs.collection('groups').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Group;
        data.uid = a.payload.doc.id;
        return data;
      })
    }));

    // get user collection
    this.usersFromDB$ = this.userCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      })
    }));
  }

  ngOnInit(): void {
    //this.groupCollection = this.afs.collection('groups');
  }

  updateUser(user: User, data) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
    userRef.set(data, { merge: true }).then().catch((error)=>console.log(error));
  }


  // COMMUNITIES
  addCommunity(newCommunity: Community) {
    this.communityCollection.add(newCommunity).catch(error => console.log(error));
  }

  searchCollection(searchValue, collectionName, searchField, limitTo) {
    return this.afs.collection(collectionName, ref => ref
      .orderBy(searchField)
      .startAt(searchValue.toLowerCase())
      .endAt(searchValue.toLowerCase() + "\uf8ff")
      .limit(limitTo))
      .valueChanges();
  }

  // SECTORS
  addSector(sector: Sector, secLead: User) {
    this.sectorCollection.add(sector)
      .then((ref) => {
        secLead.sectorsLead.push(ref.id) // push new sector in
        const sectors = secLead.sectorsLead; // store new list to sectos
        const data = {sectorsLead: sectors}; // create new data item
        this.updateUser(secLead, data); // update user info to reflect new sector they now lead
      })
      .catch(error => console.log(error));
  }

  // GROUPS
  getGroups() {
    //return this.groupsFromDB$;
  }
  addGroup(group: Group) {
    this.groupCollection.add(group).catch(error => console.log(error));
  }
  joinGroup(group: Group, user: User) {
    if (group.members.find(function (obj) { return obj.uid === user.uid; })) { // check if user already joined group
      console.log("User Exists");
    } else {
      console.log("User not in members list!");
      if (group.members.length < group.capacity) { // check if group has space for new members
        if (!!group.members) {
          group.members.push({ uid: user.uid, dateJoined: new Date(), paid: false, paymentTerms: "Monthly" });
          this.groupCollection.doc(group.uid).update({ members: group.members }); // update with added member
        } else {
          group.members = [{ uid: user.uid, dateJoined: new Date(), paid: false, paymentTerms: "Monthly" }];
          this.groupCollection.doc(group.uid).update({ members: group.members }); // add field and update with added member
        }
      } else {
        console.log("Group Full")!
      }
    }

  }


  // ASSIGN NEW ROLES
  makeAdmin(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
    const data: User = {
      roles: {
        admin: true
      }
    }
  }

}


