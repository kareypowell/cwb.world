import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Community, User } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent implements OnInit, OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  communities: Community[];
  private users: User[];
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

  updateSector(){
    
    alert("Yet to be completed");
    // close dialog
    this.onNoClick(false);
  }

  userSearch: User[];
  searchUser($event){

  }
  getSectorLead(option){

  }

  saveNewComm(){

  }
  saveNewSecLead(){

  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy():void{
    this.commSub.unsubscribe();
    this.sectLeadSub.unsubscribe();
  }
}
