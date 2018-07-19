import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Sector, Community, User, Group, SuperSector } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-create-super-sector',
  templateUrl: './create-super-sector.component.html',
  styleUrls: ['./create-super-sector.component.css']
})
export class CreateSuperSectorComponent implements OnInit, OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};

  constructor(private fbData: FirebaseDataService, private _formBuilder: FormBuilder, private auth: AuthService, public dialogRef: MatDialogRef<CreateSuperSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  communities:Community[];
  superSectors: SuperSector[];
  private commSub;
  private userSub;
  private superSectorSub;
  currentCommunity: Community;
  currentSuperSector: SuperSector;
  newSuperSector: SuperSector = {};
  createSectorForm: FormGroup;
  private sub2;
  private CurrentUser: User;

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(data => this.CurrentUser = data); // get Current User info
    this.commSub = this.fbData.getAllCommunities().subscribe(data => {
      this.communities = data;
      this.currentCommunity = this.communities[0];
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
    this.newSuperSector.name = this.createSectorForm.value.name;
    this.newSuperSector.description = this.createSectorForm.value.description;
    //this.newSuperSector.bio = this.createSectorForm.value.bio;
    this.newSuperSector.whatToExpect = this.createSectorForm.value.whatToExpect;
    this.newSuperSector.community = this.createSectorForm.value.comm.uid;
    this.newSuperSector.files = []; // initialize sector files
    this.newSuperSector.dateCreated = new Date();
    this.newSuperSector.nameToLower = this.createSectorForm.value.name.toLowerCase(); // for search indexing
    this.newSuperSector.createdBy = this.CurrentUser.firstName + " " + this.CurrentUser.lastname; // assign createdBy to current User

    this.fbData.addSuperSector(this.newSuperSector); // call firebase to create super sector
    // close dialog
    this.onNoClick(false);
  }
  private secLead: string;
  secLeadRef: User;
  getSectorLead(option: User) {
    this.secLeadRef = option;
    this.secLead = option.uid;
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
    if(this.subbedUser){
      this.sub2.unsubscribe();
    }
  }
}
