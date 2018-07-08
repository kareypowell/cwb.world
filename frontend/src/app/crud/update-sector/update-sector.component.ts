import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Community, User, Sector } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent implements OnInit, OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  communities: Community[];
  users: User[];
  private commSub;

  showCommEdit: boolean = false;
  showSecLeadEdit: boolean = false;


  secLeadName: string = "John Doe";
  commName: string = "Test";
  private sectLeadSub;

  constructor(public dialogRef: MatDialogRef<UpdateSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private fbData: FirebaseDataService) { }

  updateSectorForm: FormGroup;
  ngOnInit() {

    this.commSub = this.fbData.getAllCommunities().subscribe( data => {
      this.communities = data;
      this.communities.forEach(comm => {
        if (comm.uid === this.data.sect.communityID){
          this.commName = comm.name;
        }
      })
    });
    this.sectLeadSub = this.fbData.getUserName(this.data.sect.sectorLead).subscribe(data => this.secLeadName = data[0].firstName + ' ' + data[0].lastname);
    // create form and prefil data
    this.updateSectorForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      //bio: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      searchStringSectorLead: '',
      comm: ''
    });

    this.updateSectorForm.setValue({
      name: this.data.sect.name,
      description: this.data.sect.description,
      whatToExpect: this.data.sect.whatToExpect,
      searchStringSectorLead: '',
      comm: ''
    })
  }

  updatedSector: Sector = {};
  updateSector(){
    this.updatedSector.name = this.updateSectorForm.value.name;
    this.updatedSector.description = this.updateSectorForm.value.description;
    this.updatedSector.whatToExpect = this.updateSectorForm.value.whatToExpect;
    if(this.commChanged){
      this.updatedSector.community = this.currentComm.name;
      this.updatedSector.communityID = this.currentComm.uid;
    }
    if(this.secLeadChanged){
      this.updatedSector.sectorLead = this.currentSecLead.uid;
    }
    this.fbData.updateSector(this.data.sect.uid, this.updatedSector);
    // close dialog
    this.onNoClick(false);
  }

  userSearch: User[];
  subbedUser:boolean = false;
  lastKeypress: number = 0;
  private sub2;
  searchUser($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      this.sub2 = this.fbData.searchCollection(String(this.updateSectorForm.value.searchStringSectorLead), "users", "fullnameToLower", 5).subscribe(users => { this.userSearch = users; this.subbedUser = true; });
    }
    this.lastKeypress = $event.timeStamp;
  }

  currentSecLead: User;
  getSectorLead(option){
    this.currentSecLead = option;
  }

  currentComm: Community;
  commChanged: boolean = false;
  saveNewComm(){
    this.commName = this.updateSectorForm.value.comm.name;
    this.currentComm = this.updateSectorForm.value.comm;
    this.commChanged = true;
  }
  
  secLeadChanged: boolean = false;
  saveNewSecLead(){
    this.secLeadName = this.currentSecLead.firstName + " " + this.currentSecLead.lastname;
    this.secLeadChanged = true;

  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy():void{
    this.commSub.unsubscribe();
    this.sectLeadSub.unsubscribe();

    if(this.subbedUser){
      this.sub2
    }
  }
}
