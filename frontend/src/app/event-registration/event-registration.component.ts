import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { User, Group, EventItem, EventObj, EventParticipant } from '../interfaces/member';
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
  eventSubscriptionForm: FormGroup;
  public individual: boolean = true;

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(data => this.CurrentUser = data); // get Current User info

    /* this.registerEventForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: ['', Validators.required],
      sectorImage: '',
      searchStringSectorLead: '',
      comm: '',
      superSector: '',
      hasSuperSector: false
    }); */

    this.eventSubscriptionForm = this._formBuilder.group({
      paid: false
    });
  }

  newSubscriptionObj: EventObj;
  newEventParticipant: EventParticipant;
  eventSubscription() {
    this.newSubscriptionObj = {};
    this.newEventParticipant = {};

    this.newSubscriptionObj.uid = this.data.event.uid;
    this.newSubscriptionObj.dateSubscribed = new Date();
    this.newSubscriptionObj.paid = false;

    this.newEventParticipant.memberID = this.CurrentUser.uid;
    this.newEventParticipant.dateSubscribed = new Date();
    this.newEventParticipant.paid = false;

    this.fbData.joinEvent(this.data.event, this.newEventParticipant, this.newSubscriptionObj, this.CurrentUser);

    alert("You've successfully registered for " + this.data.event.name + "!");
    this.dialogRef.close(true);
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
