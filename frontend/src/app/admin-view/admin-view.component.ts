import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Community, Sector, Group, User, EventItem } from '../interfaces/member';
import { FirebaseDataService } from '../firebase-data.service';
import { UpdateCommunityComponent } from '../crud/update-community/update-community.component';
import { ConfirmDeleteComponent } from '../crud/confirm-delete/confirm-delete.component';
import { UpdateSectorComponent } from '../crud/update-sector/update-sector.component';
import { UpdateGroupComponent } from '../crud/update-group/update-group.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  todayDate = new Date();
  constructor(private data: DataTransferService, private dialog:MatDialog, private fbData: FirebaseDataService) { }

  showHiddenDeets: boolean = false;
  private communitySub;
  private sectorSub;
  private groupSub;
  public memberSub;
  private eventSub;

  searchValComm:string = "";
  searchValSec:string = "";
  searchValGrp:string = "";
  searchValMem:string = "";

  public sectorsInComm;
  public groupsInComm;

  public groupsInSec;

  public membersInGroup;
  public memberGroups;

  communities: Community[];
  sectors: Sector[];
  groups: Group[];
  members: User[];
  events: EventItem[]

  currentCommunity;
  currentSector;
  currentGroup;
  currentMember;


  ngOnInit() {
    
    this. communitySub = this.fbData.communitiesFromDB$.subscribe(data =>{
      this.communities = data;
      this.currentCommunity = this.communities[0];
      this.sectorsInComm = this.fbData.getSectorsInCommunity(this.currentCommunity.uid);
      this.groupsInComm = this.fbData.getGroupsInCommunity(this.currentCommunity.uid);
    });
    this. sectorSub = this.fbData.sectorsFromDB$.subscribe(data =>{
      this.sectors = data;
      this.currentSector = this.sectors[0];
      this.groupsInSec = this.fbData.getGroupsInSector(this.currentSector.uid);
    });
    this. groupSub = this.fbData.groupsFromDB$.subscribe(data =>{
      this.groups = data;
      this.currentGroup = this.groups[0];
      this.membersInGroup = this.fbData.getMembersInGroup(this.currentGroup.uid);
    });
    this. memberSub = this.fbData.getAllUsers()
    .subscribe(data =>{
      this.members = data;
      this.currentMember = this.members[0];
      this.memberGroups = this.getGrpInfo();
    });
  }
  dataset = {};

  dialogWidth = '90%';

  getSectorsForComm(commID:string){
    this.sectorsInComm = this.fbData.getSectorsInCommunity(commID);
  }
  getGroupsForComm(commID:string){
    this.groupsInComm = this.fbData.getGroupsInCommunity(commID);
  }
  getGroupsForSec(){
    this.groupsInSec = this.fbData.getGroupsInSector(this.currentSector.uid);
  }
  getMembersForGroup(){
    this.membersInGroup = this.fbData.getMembersInGroup(this.currentGroup.uid);
  }

  openDialog(source): void {
    if(source == 'createCommunity'){
      this.dataset = { createCommunity: true }
    }else if(source == 'createSector'){
      this.dataset = { createSector: true }
    }else if(source == 'createGroup'){  // create group already exists, check and correct according...
      this.dataset = { createGroup: true }
    }else if(source == 'deleteConfirm'){
      this.dialogWidth = '300px'
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  updateCommunity(commUID): void {
    this.dataset = {uid: commUID}
    let dialogRef = this.dialog.open(UpdateCommunityComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
  updateSector(sectoruid){
    this.dataset = {uid: sectoruid}
    let dialogRef = this.dialog.open(UpdateSectorComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
  updateGroup(groupID){
    this.dataset = {uid: groupID}
    let dialogRef = this.dialog.open(UpdateGroupComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  updateEvent(eventID){
    this.dataset = {uid: eventID}
    let dialogRef = this.dialog.open(UpdateGroupComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  
  deleteItem(itemuid, collection): void {
    this.dataset = {
      uid: itemuid,
      collection: collection
    };
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: this.dataset
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  

  getGrpInfo(){
    this.memberGroups =  this.fbData.getGroupsJoinedByMember(this.currentMember.uid);
  }
  getGroupName(id:string){
    return this.fbData.getGroupName(id);
  }
  
  
  displayGroupInfo(grp){
    this.currentGroup = grp;
  }
  
  ngOnDestroy(): void {
    this.communitySub.unsubscribe();
    this.sectorSub.unsubscribe();
    this.groupSub.unsubscribe();
    //this.memberSub.unsubscribe();
    //this.eventSub.unsubscribe()
    
  }
}
