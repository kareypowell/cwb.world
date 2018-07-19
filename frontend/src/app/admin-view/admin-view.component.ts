import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Community, Sector, Group, User, EventItem, SuperSector } from '../interfaces/member';
import { FirebaseDataService } from '../firebase-data.service';
import { UpdateCommunityComponent } from '../crud/update-community/update-community.component';
import { ConfirmDeleteComponent } from '../crud/confirm-delete/confirm-delete.component';
import { UpdateSectorComponent } from '../crud/update-sector/update-sector.component';
import { UpdateGroupComponent } from '../crud/update-group/update-group.component';
import { CreateSectorComponent } from '../crud/create-sector/create-sector.component';
import { CreateGroupComponent } from '../crud/create-group/create-group.component';
import { CreateCommunityComponent } from '../crud/create-community/create-community.component';
import { CreateSuperSectorComponent } from '../crud/create-super-sector/create-super-sector.component';
import { UpdateSuperSectorComponent } from '../crud/update-super-sector/update-super-sector.component';

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
  private superSectSub;
  private groupSub;
  public memberSub;
  private eventSub;

  searchValComm:string = "";
  searchValSupSec: string = ""
  searchValSec:string = "";
  searchValGrp:string = "";
  searchValMem:string = "";

  public sectorsInComm;
  public groupsInComm;

  public groupsInSec;

  public membersInGroup;
  public memberGroups;

  communities: Community[];
  superSectors: SuperSector[];
  sectors: Sector[];
  groups: Group[];
  members: User[];
  events: EventItem[]

  currentCommunity;
  currentSuperSector;
  currentSector;
  currentGroup;
  currentMember;


  ngOnInit() {
    
    this. communitySub = this.fbData.getAllCommunities().subscribe(data =>{
      this.communities = data;
      this.currentCommunity = this.communities[0];
      this.sectorsInComm = this.fbData.getSectorsInCommunity(this.currentCommunity.uid);
      this.groupsInComm = this.fbData.getGroupsInCommunity(this.currentCommunity.uid);
    });
    this.superSectSub = this.fbData.getAllSuperSectors().subscribe( data => {
      this.superSectors = data;
      this.currentSuperSector = this.superSectors[0];
    })
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

  createCommunity(){
    this.dataset = {}
    let dialogRef = this.dialog.open(CreateCommunityComponent, {
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

  createSuperSector(){
    this.dataset = {}
    let dialogRef = this.dialog.open(CreateSuperSectorComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  updateSuperSector(superSector){
    this.dataset = {sect: superSector}
    let dialogRef = this.dialog.open(UpdateSuperSectorComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
  createSector(){
    this.dataset = {}
    let dialogRef = this.dialog.open(CreateSectorComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
  updateSector(sector){
    this.dataset = {sect: sector}
    let dialogRef = this.dialog.open(UpdateSectorComponent, {
      width: this.dialogWidth,
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
  createGroup(){
    this.dataset = {}
    let dialogRef = this.dialog.open(CreateGroupComponent, {
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

  createEvent(grp:Group){

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

  addMember(){

  }
  updateMember(){

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
