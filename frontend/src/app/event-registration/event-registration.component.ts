import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { User, Group, EventItem } from '../interfaces/member';
import { FirebaseDataService } from '../firebase-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements  OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private fbData: FirebaseDataService, private _formBuilder: FormBuilder, private auth: AuthService, public dialogRef: MatDialogRef<EventRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  private userSub;
  private CurrentUser: User;
  registerEventForm: FormGroup;

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(data => this.CurrentUser = data); // get Current User info

    this.registerEventForm = this._formBuilder.group({
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
  registerEvent() {
    
    // close dialog
    this.onNoClick(false);
  }


  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
