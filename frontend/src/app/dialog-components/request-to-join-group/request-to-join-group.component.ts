import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { User, Sector, Community, GroupMember } from '../../interfaces/member';
import { AuthService } from '../../auth-service';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-request-to-join-group',
  templateUrl: './request-to-join-group.component.html',
  styleUrls: ['./request-to-join-group.component.css']
})
export class RequestToJoinGroupComponent implements OnInit, OnDestroy {

  constructor( public dialogRef: MatDialogRef<RequestToJoinGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, public fbData:FirebaseDataService) { }

    user: User;
    public config: PerfectScrollbarConfigInterface = {};
    private _subscription;
    private _sub2;
    private _sub3;
    private _sub4;
    notRobot:boolean = false;

    grpLead: User;
    sector: Sector;
    community: Community;

  ngOnInit() {
    this._subscription= this.auth.user$.subscribe(data => {this.user = data});
      this._sub2=this.fbData.userCollection.doc(this.data.grp.groupLead).valueChanges().subscribe(data => this.grpLead = data);
      this._sub3=this.fbData.sectorCollection.doc(this.data.grp.sector).valueChanges().subscribe(data => this.sector = data);
      this._sub4=this.fbData.communityCollection.doc(this.data.grp.community).valueChanges().subscribe(data => this.community = data);

  }

  newGroupMember: GroupMember;
  termSelected = this.data.grp.prices[0];
  status;
  joinGroup(){
    this.newGroupMember = {};
    this.newGroupMember.uid = this.user.uid;
    this.newGroupMember.groupUID = this.data.grp.uid;
    this.newGroupMember.approved = false;
    this.newGroupMember.attendance = [];
    this.newGroupMember.dateJoined = new Date();
    this.newGroupMember.files = [];
    this.newGroupMember.paid = false;
    if(this.data.grp.acceptPayment){
      this.newGroupMember.paymentTerms = this.termSelected;
    }
    this.newGroupMember.approved = false;
    if(this.user.firstName){
      this.newGroupMember.firstName = this.user.firstName;
    }
    if(this.user.lastname){
      this.newGroupMember.lastName = this.user.lastname;
    }
    this.newGroupMember.photoURL = this.user.photoURL;
    this.fbData.joinGroup(this.data.grp,this.newGroupMember, this.user);
    this.onNoClick(false);
  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void{
    this._subscription.unsubscribe();
    this._sub2.unsubscribe();
    this._sub3.unsubscribe();
    this._sub4.unsubscribe();
  }
}
