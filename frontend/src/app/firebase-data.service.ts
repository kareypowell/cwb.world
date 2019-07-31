import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, Community, Sector, Group, GroupMember, EventItem, SuperSector, AirRMS, blogPost, signUps, EventObj, EventParticipant } from './interfaces/member';
import { NotificationService } from './services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  status: any = { success: false, fail: false, message: "" }; // to send back status messages to pages

  signUps: AngularFirestoreCollection<signUps>;
  //user
  user: User;
  userData: User;
  // all users
  userCollection: AngularFirestoreCollection<User>;

  usersFromDB$: Observable<User[]>;


  // communties
  communityCollection: AngularFirestoreCollection<Community>;
  communitiesFromDB$: Observable<Community[]>;

  // communties
  airRmsCollection: AngularFirestoreCollection<AirRMS>;
  airRmsFromDB$: Observable<AirRMS[]>;

  // super sectors
  superSectorcollection: AngularFirestoreCollection<SuperSector>;

  //sectors
  sectorCollection: AngularFirestoreCollection<Sector>;
  sectorsFromDB$: Observable<Sector[]>;


  // groups
  groupCollection: AngularFirestoreCollection<Group>;
  groupsFromDB$: Observable<Group[]>;

  // Events
  eventCollection: AngularFirestoreCollection<EventItem>;
  eventsFromDB$: Observable<EventItem[]>;

  // Group Members
  groupMemberCollection: AngularFirestoreCollection<GroupMember>;
  groupMembersFromDB$: Observable<GroupMember[]>;

  // Posts
  postsCollection: AngularFirestoreCollection<blogPost>;
  postsFromDB$: Observable<blogPost[]>;



  constructor(public afs: AngularFirestore, private router: Router, private notify: NotificationService) {
    this.groupCollection = this.afs.collection('groups');
    this.communityCollection = this.afs.collection('communities');
    this.superSectorcollection = this.afs.collection('super-sectors');
    this.sectorCollection = this.afs.collection('sectors');
    this.userCollection = this.afs.collection('users');
    this.eventCollection = this.afs.collection('events');
    this.groupMemberCollection = this.afs.collection('group-members');
    this.airRmsCollection = this.afs.collection('air-rms-space');
    this.postsCollection = this.afs.collection('posts');
    this.signUps = this.afs.collection('signups');

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

    // get events
    this.eventsFromDB$ = this.eventCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as EventItem;
        data.uid = a.payload.doc.id;
        return data;
      })
    }));
    // get groupMembers
    this.groupMembersFromDB$ = this.groupMemberCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as GroupMember;
        data.uid = a.payload.doc.id;
        return data;
      })
    }));
    this.postsFromDB$ = this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as blogPost;
        data.uid = a.payload.doc.id;
        return data;
      })
    }));
  }

  // CREATE ======================================================================================================================
  checkSignUp(user: signUps) {
    return this.afs.collection('signups', ref => ref
      .where('email', '==', user.email))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as signUps;
          return data;
        })
      }));
  }
  signup(signup: signUps) {

    if (1 == 1) {
      this.signUps.add(signup).then(() => {
        console.log("Signed up");
      })
    } else {
      console.log("Already signed up")
    }

  }
  addCommunity(newCommunity: Community) {
    this.communityCollection.add(newCommunity).catch(error => console.log(error));
  }

  addPost(newPost: blogPost) {
    this.postsCollection.add(newPost).catch(error => console.log(error));
  }

  addSuperSector(superSector: SuperSector) {
    this.superSectorcollection.add(superSector).then().catch(error => console.log(error));
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
          this.updateSector(sector.uid, data);
        } else {
          const groups = [ref.id];
          const data = { groupsInSector: groups };
          this.updateSector(sector.uid, data);
        }
        // add group to community's groups 
        if (community.groupsInCommunity) {
          community.groupsInCommunity.push(ref.id);
          const groups = community.groupsInCommunity;
          const data = { groupsInCommunity: groups };
          this.updateCommunity(community.uid, data);
        } else {
          const groups = [ref.id];
          const data = { groupsInCommunity: groups };
          this.updateCommunity(community.uid, data);
        }
        //route to group-lead view
        this.router.navigate(['/member-ui/group-lead']);
      })
      .catch(error => console.log(error));
  }
  addEvent(event: EventItem, group: Group) {
    // add event to events collections
    this.eventCollection.add(event)
      .then( // then get event id and add to events list of group
        (ref) => {
          if (group.events) {
            group.events.push(ref.id);
            const data = { events: group.events };
            this.updateGroup(group.uid, data);
          } else {
            const data = { events: [ref.id] };
            this.updateGroup(group.uid, data);
          }
        }
      )
      .catch(error => console.log(error)); // if there is an error
  }
  addAirRMSSpace(space: AirRMS) {
    //add to collection
  }
  addUser(user: User) {
    this.userCollection.add(user).catch(error => console.log(error));
  }
  // READ ==========================================================================================================================
  getAllUsers() {
    return this.afs.collection('users')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getAllCommunities() {
    return this.afs.collection('communities')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Community;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getAllGroups() {
    return this.afs.collection('groups')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Group;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getAllSectors() {
    return this.afs.collection('sectors')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Sector;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getAllSuperSectors() {
    return this.afs.collection('super-sectors')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SuperSector;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  
  getUserName(id: string) {
    return this.afs.collection('users', ref => ref
      .where('uid', '==', id))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getSpecificGroup(groupID: string) {
    return this.groupCollection.doc(groupID)
      .snapshotChanges().pipe(map(actions => {
        const data = actions.payload.data() as Group;
        data.uid = actions.payload.id;
        return data;
      }));
  }

  getSpecificEvent(id: string) {
    return this.eventCollection.doc(id)
      .snapshotChanges().pipe(map(actions => {
        const data = actions.payload.data() as EventItem;
        data.uid = actions.payload.id;
        return data;
      }));
  }

  getSpecificPost(uid: string) {
    return this.postsCollection.doc(uid)
      .snapshotChanges().pipe(map(actions => {
        const data = actions.payload.data() as blogPost;
        data.uid = actions.payload.id;
        return data;
      }));
  }
  getAllPostsInGroup(uid: string) {
    return this.afs.collection('posts', ref => ref
      .orderBy('group')
      .startAt(uid)
      .endAt(uid + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as blogPost;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }



  getGroupsJoinedByMember(memberID: string) {
    return this.afs.collection('group-members', ref => ref
      .orderBy('uid')
      .startAt(memberID)
      .endAt(memberID + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as GroupMember;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getGroupName(id: string) {
    return this.groupCollection.doc(id).valueChanges();
  }
  getSectorsInCommunity(communityID: string) {
    return this.afs.collection('sectors', ref => ref
      .orderBy('communityID')
      .startAt(communityID)
      .endAt(communityID + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Sector;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getSuperSectorsInCommunity(communityID: string) {
    return this.afs.collection('super-sectors', ref => ref
      .orderBy('community')
      .startAt(communityID)
      .endAt(communityID + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SuperSector;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getSectorsInSuperSector(superID: string) {
    return this.afs.collection('sectors', ref => ref
      .orderBy('superSector')
      .startAt(superID)
      .endAt(superID + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Sector;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }

  getGroupsInCommunity(communityID: string) {
    return this.afs.collection('groups', ref => ref
      .orderBy('community')
      .startAt(communityID)
      .endAt(communityID + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Sector;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }

  getGroupsInSector(secID: string) {
    return this.afs.collection('groups', ref => ref
      .orderBy('sector')
      .startAt(secID)
      .endAt(secID + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Group;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }

  getMembersInGroup(groupID: string) {
    return this.afs.collection('group-members', ref => ref
      .orderBy('groupUID')
      .startAt(groupID)
      .endAt(groupID + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as GroupMember;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
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
  getSpecificItems(uid: string) {
    return this.afs.collection('groups', ref => ref
      .orderBy('community')
      .startAt(uid)
      .endAt(uid + "\uf8ff"))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Community;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }

  getGroupMembers(groupUID: string) {
    return this.afs.collection('group-members', ref => ref
      .where('groupUID', '==', groupUID))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as GroupMember;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getGroupEvents(groupUID: string) {
    return this.afs.collection('events', ref => ref
      .where('group', '==', groupUID))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as EventItem;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  getGroupsLead(userID: string) {
    return this.afs.collection('groups', ref => ref
      .where('groupLead', '==', userID))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Group;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }

  getEventsInAGroup(groupID: string) {
    return this.afs.collection('events', ref => ref
      .where('group', '==', groupID))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as EventItem;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }

  getAllEvents() {
    return this.afs.collection('events')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as EventItem;
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
  updateAirRMS(airID: string, data) {
    const airRef: AngularFirestoreDocument<any> = this.afs.doc(`air-rms-space/${airID}`); //ref to update data
    airRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  updateSuperSector(superID: string, data) {
    const sectorRef: AngularFirestoreDocument<any> = this.afs.doc(`super-sectors/${superID}`); //super-sector ref to update data
    sectorRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  updateSector(sectorid: string, data) {
    const sectorRef: AngularFirestoreDocument<any> = this.afs.doc(`sectors/${sectorid}`); //sector ref to update data
    sectorRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  updateCommunity(communityuid: string, data) {
    const communityRef: AngularFirestoreDocument<any> = this.afs.doc(`communities/${communityuid}`); //community ref to update data
    communityRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  returnVal: boolean = false;
  updateGroup(groupID: string, data) {
    const groupRef: AngularFirestoreDocument<any> = this.afs.doc(`groups/${groupID}`); //group ref to update data
    groupRef.set(data, { merge: true }).then(() => this.returnVal = true).catch(() => this.returnVal = false);
    return this.returnVal;
  }

  updateEvent(eventID: string, data) {
    const eventRef: AngularFirestoreDocument<any> = this.afs.doc(`events/${eventID}`); //community ref to update data
    eventRef.set(data, { merge: true }).then().catch((error) => console.log(error));
  }
  updatePost(post: blogPost) {
    const postRef: AngularFirestoreDocument<any> = this.afs.doc(`posts/${post.uid}`);
    postRef.set(post, { merge: true }).then().catch((error) => console.log(error));
  }

  // Assign Roles
  makeAdmin(user: User) {
    const data: User = { roles: { admin: true } };
    this.updateUser(user, data);
  }

  // 
  joinEvent(event: EventItem, subscriber: EventParticipant, eventSubscribed: EventObj, userData: User) {
    
    if (event.participants) {
      if (event.participants.find(function (obj) { return obj.memberID === userData.uid; })) { // check if user already joined event
        console.log("Already subscribed!");
      } else {
        if (event.participants.length < event.eventCapacity) { // check if event has space for new members
          // push event UID to events joined by user
          if (userData.eventsSubscribed) {
            userData.eventsSubscribed.push(eventSubscribed); // push new event in user events
            this.updateUser(userData, { eventsSubscribed: userData.eventsSubscribed }); // use this new list to update user info
          } else {
            this.updateUser(userData, { eventsSubscribed: [eventSubscribed] });
          }

          // update
          event.participants.push(subscriber);
          this.eventCollection.doc(event.uid).set({ participants: event.participants }, { merge: true });

          this.notify.eventRegistrationEmail(userData.firstName, event.name, event.startDate, event.endDate, userData.email, event.liveEventUrl, event.description).subscribe((res) => { });
        } else {
          console.log("Event Full")!
        }
      }
    } else {
      // console.log("Event has no participants");
      this.updateEvent(event.uid, { participants: [subscriber]});

      if (userData.eventsSubscribed) {
        userData.eventsSubscribed.push(eventSubscribed); // push new event in user events
        this.updateUser(userData, { eventsSubscribed: userData.eventsSubscribed }); // use this new list to update user info
      } else {
        this.updateUser(userData, { eventsSubscribed: [eventSubscribed] });
      }

      this.notify.eventRegistrationEmail(userData.firstName, event.name, event.startDate, event.endDate, userData.email, event.liveEventUrl, event.description).subscribe((res) => { });
    }

  }

  st: any;
  joinGroup(group: Group, user: GroupMember, userData: User) {
    if (group.members.find(function (obj) { return obj.userUID === userData.uid; })) { // check if user already joined group
      console.log("User Exists");
      this.st = { success: false, fail: true, msg: "User already joined" };
    } else {
      if (group.members.length < group.capacity) { // check if group has space for new members
        // push group UID to groups joined by user
        if (userData.groupsJoined) {
          userData.groupsJoined.push(group.uid); // push new group in user groups
          this.updateUser(userData, { groupsJoined: userData.groupsJoined }); // use this new list to update user info
        } else {
          this.updateUser(userData, { groupsJoined: [group.uid] });
        }
        // push group member to group member collection
        this.groupMemberCollection.add(user).then((ref) => {
          this.st = { success: true, fail: false, msg: "Successfully joined" };
          // then push this new uid of member to group members array and update it
          group.members.push({ userUID: userData.uid, memberUID: ref.id });
          this.groupCollection.doc(group.uid).set({ members: group.members }, { merge: true });
          // set firestore backend rule to allow this write only when members are less than group capacity

          // send welcome email to group lead and user.
          this.getUserName(group.groupLead).subscribe((data) => {
            if (data.length > 0) {
              this.notify.newGroupMember(userData.firstName, data[0].email, group.name).subscribe((res) => {});
              this.notify.userJoinedGroup(userData.firstName, userData.email, group.name).subscribe((res) => {});
            }
          });

        }).catch(error => {
          console.log(error);
        })
      } else {
        console.log("Group Full")!
        this.st = { success: false, fail: true, msg: "Group is full!" };
      }
    }
    //return this.st;

  }

  leaveGroup(memToDelete: any, user: User, group: Group, ) {
    // remove group from user groups joined
    this.updateUser(user, { groupsJoined: user.groupsJoined });
    // remove group member doc
    this.groupMemberCollection.doc(memToDelete.memberUID).delete().catch(error => console.log(error));

    // remove user from group members
    this.updateGroup(group.uid, { members: group.members });
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
  deleteSuperSector(superID: string) {
    this.superSectorcollection.doc(superID).delete().then(() => { console.log("successful") }).catch(err => { console.error(err) });
  }
  deleteSector(sectorID: string) {
    // remove sectorID from sectors in community
    // remove sectorID from sectorsLead by sectorLead
    // prompt admin to re-assign groups assigned to this sector
    this.sectorCollection.doc(sectorID).delete();
  }
  deleteCommunity(communityID: string) {
    // prompt admin to re-assign all groups, sectors assigned to this community
    this.communityCollection.doc(communityID).delete().then(() => { console.log("successful") }).catch(err => { console.error(err) });
    /*.then(()=>{
      this.status.success = true;
      return this.status;
    })
    .catch((err) => {
      return {success:false, fail:true, message:err};
    })*/
  }
  deleteEvent(eventID: string) {
    // remove event ID from group events

    this.eventCollection.doc(eventID).delete();
  }

}


