import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Community, User, Sector, SuperSector } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-update-super-sector',
  templateUrl: './update-super-sector.component.html',
  styleUrls: ['./update-super-sector.component.css']
})
export class UpdateSuperSectorComponent implements OnInit, OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  communities: Community[];
  users: User[];
  private commSub;
  imageURL: string = "";

  showCommEdit: boolean = false;
  showSecLeadEdit: boolean = false;


  commName: string = "Test";
  private sectLeadSub;

  constructor(public dialogRef: MatDialogRef<UpdateSuperSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private fbData: FirebaseDataService) { }

  updateSectorForm: FormGroup;
  ngOnInit() {
    if(this.data.sect.imageURL){
      this.imageURL = this.data.sect.imageURL;
    }else{
      this.imageURL = "";
    }

    this.commSub = this.fbData.getAllCommunities().subscribe( data => {
      this.communities = data;
      this.communities.forEach(comm => {
        if (comm.uid === this.data.sect.community){
          this.commName = comm.name;
        }
      })
    });
    
    // create form and prefil data
    this.updateSectorForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      comm: '',
      imageUrl: ''
    });

    this.updateSectorForm.setValue({
      name: this.data.sect.name,
      description: this.data.sect.description,
      whatToExpect: this.data.sect.whatToExpect,
      comm: '',
      imageUrl: this.imageURL
    })
  }

  updatedSector: SuperSector = {};
  updateSector(){
    this.updatedSector.name = this.updateSectorForm.value.name;
    this.updatedSector.description = this.updateSectorForm.value.description;
    this.updatedSector.whatToExpect = this.updateSectorForm.value.whatToExpect;
    if(this.commChanged){
      this.updatedSector.community = this.currentComm.uid;
    }
    this.fbData.updateSuperSector(this.data.sect.uid, this.updatedSector);
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

  /*
  saveNewSecLead(){
    this.secLeadName = this.currentSecLead.firstName + " " + this.currentSecLead.lastname;
    this.secLeadChanged = true;

  }
  */

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy():void{
    this.commSub.unsubscribe();
    if(this.subbedUser){
      this.sub2
    }
  }
}
