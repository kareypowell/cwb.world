import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Sector, Community, User, Group, SuperSector } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.css']
})
export class CreateSectorComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private fbData: FirebaseDataService, private _formBuilder: FormBuilder, private auth: AuthService, public dialogRef: MatDialogRef<CreateSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  communities:Community[];
  superSectors: SuperSector[];
  private commSub;
  private userSub;
  private superSectorSub;
  currentCommunity: Community;
  currentSuperSector: SuperSector;
  newSector: Sector = {};
  createSectorForm: FormGroup;
  private sub2;
  private CurrentUser: User;

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(data => this.CurrentUser = data); // get Current User info
    this.commSub = this.fbData.getAllCommunities().subscribe(data => {
      this.communities = data;
      this.currentCommunity = this.communities[0];
      this.superSectorSub = this.fbData.getSuperSectorsInCommunity(this.currentCommunity.uid).subscribe(data => {
        this.superSectors = data;
        this.currentSuperSector = this.superSectors[0];
      });
    });

    this.createSectorForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      sectorImage: '',
      searchStringSectorLead: '',
      comm: '',
      superSector: '',
      hasSuperSector: false
    });
  }
  createSector() {
    this.newSector.name = this.createSectorForm.value.name;
    this.newSector.description = this.createSectorForm.value.description;
    if(this.createSectorForm.value.superSector != ''){
      this.newSector.superSector = this.createSectorForm.value.superSector.uid;
    }else{
      this.newSector.superSector = null;
    }
    this.newSector.sectorImage = this.createSectorForm.value.sectorImage;
    //this.newSector.bio = this.createSectorForm.value.bio;
    this.newSector.whatToExpect = this.createSectorForm.value.whatToExpect;
    this.newSector.sectorLead = this.secLead;
    this.newSector.community = this.createSectorForm.value.comm.name;
    this.newSector.communityID = this.createSectorForm.value.comm.uid;
    this.newSector.files = []; // initialize sector files
    this.newSector.dateCreated = new Date();
    this.newSector.imageUrl = null; // set image url to null for now
    this.newSector.nameToLower = this.createSectorForm.value.name.toLowerCase(); // for search indexing
    this.newSector.createdBy = this.CurrentUser.firstName + " " + this.CurrentUser.lastname; // assign createdBy to current User
    this.newSector.groupsInSector = []; // init groups in sector
    this.newSector.numberMembers = 0; // Init number of members in sector

    this.fbData.addSector(this.newSector, this.secLeadRef); // call firebase to create sector
    // close dialog
    this.onNoClick(false);
  }
  private secLead: string;
  secLeadRef: User;
  getSectorLead(option: User) {
    this.secLeadRef = option;
    this.secLead = option.uid;
  }
  

  getSuperSectors(){
    this.superSectorSub.unsubscribe();
    this.superSectorSub = this.fbData.getSuperSectorsInCommunity(this.currentCommunity.uid).subscribe(data => {
      this.superSectors = data;
      this.currentSuperSector = this.superSectors[0];
    });
  }

  groupSearch: Group[];
  userSearch: User[];


  lastKeypress: number = 0;
  subbedComm: boolean = false;
  subbedUser: boolean = false;
  searchUser($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      this.sub2 = this.fbData.searchCollection(String(this.createSectorForm.value.searchStringSectorLead), "users", "fullnameToLower", 5).subscribe(users => { this.userSearch = users; this.subbedUser = true; });
    }
    this.lastKeypress = $event.timeStamp;
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void {
    this.commSub.unsubscribe();
    this.userSub.unsubscribe();
    this.superSectorSub.unsubscribe();
    if(this.subbedUser){
      this.sub2.unsubscribe();
    }
  }
}
