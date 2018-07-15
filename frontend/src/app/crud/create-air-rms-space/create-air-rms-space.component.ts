import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-service';
import { FirebaseDataService } from '../../firebase-data.service';
import { User, Community, Sector, SuperSector } from '../../interfaces/member';

@Component({
  selector: 'app-create-air-rms-space',
  templateUrl: './create-air-rms-space.component.html',
  styleUrls: ['./create-air-rms-space.component.css']
})
export class CreateAirRmsSpaceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateAirRmsSpaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private auth: AuthService, private fbData: FirebaseDataService) { }
  public config: PerfectScrollbarConfigInterface = {};

  createAirRMSForm: FormGroup;
  currentUser: User;
  communities: Community[];
  superSectors: SuperSector[];
  sectors: Sector[];
  currentCommunity: Community;
  currentSupSect: SuperSector;
  currentSector: Sector;


  private subUser;
  private subComm;
  private subSect;
  private subSuper;

  private subbedSector: boolean = false;

  roomStyles = [
    { url: "roundtable.PNG", name: "Round Table", description: "From corporate meetings to team building; this is the ideal distraction-free setting located at the heart of Lavington Nairobi Kenya." },
    { url: "reception.PNG", name: "Reception", description: "From corporate meetings to team building; this is the ideal distraction-free setting located at the heart of Lavington Nairobi Kenya." },
    { url: "squaretable.PNG", name: "Square Table", description: "From corporate meetings to team building; this is the ideal distraction-free setting located at the heart of Lavington Nairobi Kenya." }
  ,{ url: "lectureroom.PNG", name: "Lecture Room", description: "From corporate meetings to team building; this is the ideal distraction-free setting located at the heart of Lavington Nairobi Kenya." }
  ,{ url: "classroom.PNG", name: "Classroom", description: "From corporate meetings to team building; this is the ideal distraction-free setting located at the heart of Lavington Nairobi Kenya." }
  ,{ url: "ettable.PNG", name: "T-Table, E-Table and U-Table", description: "From corporate meetings to team building; this is the ideal distraction-free setting located at the heart of Lavington Nairobi Kenya." }
  
  ];

  ngOnInit() {
    this.subUser = this.auth.user$.subscribe(data => this.currentUser = data); // get current user info
    this.subComm = this.fbData.getAllCommunities().subscribe(data => {
      this.communities = data;
      this.currentCommunity = this.communities[0];
      this.subSuper = this.fbData.getSuperSectorsInCommunity(this.currentCommunity.uid).subscribe(data => {
        this.superSectors = data;
        if(this.superSectors.length > 0){
          this.currentSupSect = this.superSectors[0];
          
          this.subSect = this.fbData.getSectorsInSuperSector(this.currentSupSect.uid).subscribe(data => this.sectors = data);
          this.subbedSector = true;
        }
      });   
    });

    this.createAirRMSForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      capacity: [10, Validators.required],
      comm: ['', Validators.required],
      supersector: '',
      sect: ['', Validators.required],
      roomType: this.roomStyles[0],
      hasSuperSect: true
    });
  }



  createSpace() {

    alert("Still in works...");
  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  getSectorsInCommunity(commID: string) {
    this.subSect.unsubscribe();
    this.subSect = this.fbData.getSectorsInCommunity(commID).subscribe(data => this.sectors = data);
  }

  getSuperSectorsInCommunity(){
    this.subSuper.unsubscribe();
    this.subSuper = this.fbData.getSuperSectorsInCommunity(this.currentCommunity.uid).subscribe(data => this.superSectors = data);
  }
  getSectorsInSuperSector(){
    if(this.subbedSector){
      this.subSect.unsubscribe();
    }
    this.subSect = this.fbData.getSectorsInSuperSector(this.currentSupSect.uid).subscribe(data => this.sectors = data);
  }

  ngOnDestroy(): void {
    this.subComm.unsubscribe();
    this.subUser.unsubscribe();
    if(this.subbedSector){
      this.subSect.unsubscribe();
    }
    this.subSuper.unsubscribe();
  }
}
