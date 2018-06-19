import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, of, BehaviorSubject, zip, Subject } from 'rxjs';
import { switchMap, merge, map, filter } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User, Community, Sector, Group, GrpMember } from './interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
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

  // CREATE ======================================================================================================================

  addCommunity(newCommunity: Community) {
    this.communityCollection.add(newCommunity).catch(error => console.log(error));
  }

  addSector(sector: Sector, secLead: User) {
    this.sectorCollection.add(sector)
      .then((ref) => {
        if (secLead.sectorsLead) { // check if user has sectorsLead field
          secLead.sectorsLead.push(ref.id) // push new sector in
          const sectors = secLead.sectorsLead; // store new list to sectos
          const data = { sectorsLead: sectors, roles: { sectorLead: true } }; // create new data item
          this.updateUser(secLead, data); // update user info to reflect new sector they now lead
        } else {
          const sectors = [ref.id]; // store new list to sectos
          const data = { sectorsLead: sectors, roles: { sectorLead: true } }; // create new data item
          this.updateUser(secLead, data); // update user info to reflect new sector they now lead
        }
      })
      .catch(error => console.log(error));
  }


  addGroup(group: Group, groupLead: User, sector: Sector, community: Community) {
    this.groupCollection.add(group) // this should go to group creation request if creator is not an admin
      .then((ref) => {
        if (groupLead.groupsLead) { // add group to group lead's groups lead
          groupLead.groupsLead.push(ref.id);
          const groups = groupLead.groupsLead;
          const data = { groupsLead: groups, roles: { groupLead: true } };
          this.updateUser(groupLead, data);
        } else {
          const groups = [ref.id];
          const data = { groupsLead: groups, roles: { groupLead: true } };
          this.updateUser(groupLead, data);
        }
        // add group to sector's groups 
        if (sector.groupsInSector) {
          sector.groupsInSector.push(ref.id);
          const groups = sector.groupsInSector;
          const data = { groupsInSector: groups };
          this.updateSector(sector, data);
        } else {
          const groups = [ref.id];
          const data = { groupsInSector: groups };
          this.updateSector(sector, data);
        }
        // add group to community's groups 
        if (community.groupsInCommunity) {
          community.groupsInCommunity.push(ref.id);
          const groups = community.groupsInCommunity;
          const data = { groupsInCommunity: groups };
          this.updateCommunity(community, data);
        } else {
          const groups = [ref.id];
          const data = { groupsInCommunity: groups };
          this.updateCommunity(community, data);
        }

      })
      .catch(error => console.log(error));
  }

  addUser(user: User) {
    this.userCollection.add(user).catch(error => console.log(error));
  }
  // READ ==========================================================================================================================

  searchCollection(searchValue, collectionName, searchField, limitTo) {
    return this.afs.collection(collectionName, ref => ref
      .orderBy(searchField)
      .startAt(searchValue.toLowerCase())
      .endAt(searchValue.toLowerCase() + "\uf8ff")
      .limit(limitTo))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Group;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  dummyUser: User;
  getSpecificItems(uid:string){
    return this.afs.collection('groups', ref => ref
      .orderBy('community')
      .startAt(uid)
      .endAt(uid + "\uf8ff")
      .limit(100))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Community;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }

  // UPDATE =======================================================================================================================

  updateUser(user: User, data) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
    userRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  updateSector(sector: Sector, data) {
    const sectorRef: AngularFirestoreDocument<any> = this.afs.doc(`sectors/${sector.uid}`); //sector ref to update data
    sectorRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  updateCommunity(community: Community, data) {
    const communityRef: AngularFirestoreDocument<any> = this.afs.doc(`communities/${community.uid}`); //community ref to update data
    communityRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  updateGroup(group: Group, data) {
    const groupRef: AngularFirestoreDocument<any> = this.afs.doc(`groups/${group.uid}`); //group ref to update data
    groupRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }

  // Assign Roles
  makeAdmin(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`); //user ref to update data
    const data: User = {
      roles: {
        admin: true
      }
    }
  }

  joinGroup(group: Group, user: GrpMember) {
    if (group.members.find(function (obj) { return obj.uid === user.uid; })) { // check if user already joined group
      console.log("User Exists");
    } else {
      console.log("User not in members list!");
      if (group.members.length < group.capacity) { // check if group has space for new members
        group.members.push(user);
        this.groupCollection.doc(group.uid).set({ members: group.members }, {merge:true});
        // push group UID to groups joined by user
        //this.userCollection.doc(user.uid).set({groupsJoined:})
      } else {
        console.log("Group Full")!
      }
    }
  }


  // DELETE ==================================================================================================================
  deleteUser(userID: string) {
    // remove user as lead in groups, sectors
    // prompt admin to add new leads to groups and sectors

    this.userCollection.doc(userID).delete();
  }
  deleteGroup(groupID: string) {

    // remove groupID from groups in sector
    // remove groupID from groups in community
    // remove groupID from groupsLead by groupLead
    //

    this.groupCollection.doc(groupID).delete();
  }
  deleteSector(sectorID: string) {
    // remove sectorID from sectors in community
    // remove sectorID from sectorsLead by sectorLead
    // prompt admin to re-assign groups assigned to this sector
    this.sectorCollection.doc(sectorID).delete();
  }
  deleteCommunity(communityID: string) {
    // prompt admin to re-assign all groups, sectors assigned to this community
    this.communityCollection.doc(communityID).delete();
  }

}


