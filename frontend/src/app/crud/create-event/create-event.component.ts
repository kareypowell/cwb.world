import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, EventItem, eventSession } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private fbData: FirebaseDataService, private notify: NotificationService) { }
  createEventForm: FormGroup;
  createEventForm2: FormGroup;
  public config: PerfectScrollbarConfigInterface = {};
  groupSearch: Group[];
  isLinear: boolean = false; // set to true to insist user completes first page before moving to next page
  session:eventSession = {};
  sessions:eventSession[] = [];
  ngOnInit() {

    this.createEventForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: [''],
      capacity: [50, Validators.required],
      start: [new Date, Validators.required],
      end: [new Date, Validators.required],
      recurringEndTime: [new Date, Validators.required],
      paidEvent: false,
      eventType: 'single',
      eventFrequency: 'weekly',
      fee: 0,
      image: false,
      imageURL: '',
      video: false,
      videoURL: '',
      refundable: false,
      refundPolicy: '',
      startWithoutHost: false,
      timeZone: 'GMT',
      locationOnline: true,
      liveEventURL: '',
      locationPhysical: false,
      locationPhysicalAddress: '',
      includeWeekends: true,
      openToOnlyGroupMembers: false,
      registrationRequired: false,
      eventDurationNumber: 2,
      eventDurationTerm: 'week'
    });
  }

  newEvent: EventItem;
  createEvent() {
    this.newEvent = {};
    this.newEvent.name = this.createEventForm.value.name;
    this.newEvent.nameToLower = this.createEventForm.value.name.toLowerCase();
    this.newEvent.description = this.createEventForm.value.description;
    this.newEvent.whatToExpect = this.createEventForm.value.whatToExpect;
    this.newEvent.startDate = this.createEventForm.value.start;
    this.newEvent.groupLead = this.data.grp.groupLead;
    this.newEvent.group = this.data.grp.uid;
    this.newEvent.files = [];
    this.newEvent.endDate = this.createEventForm.value.end;
    this.newEvent.startWithoutHost = this.createEventForm.value.startWithoutHost;
    this.newEvent.eventCapacity = this.createEventForm.value.capacity;
    this.newEvent.eventType = this.createEventForm.value.eventType;
    this.newEvent.openToOnlyGroupMembers = this.createEventForm.value.openToOnlyGroupMembers;
    this.newEvent.registrationRequired = this.createEventForm.value.registrationRequired;

    if (this.createEventForm.value.eventType === 'single') {
      this.newEvent.includeWeekends = this.createEventForm.value.includeWeekends;
    } else {
      this.newEvent.isRecurrent = true;
      this.newEvent.recurrence = this.createEventForm.value.eventFrequency;
      this.newEvent.endDate = new Date(this.createEventForm.value.start); // if recurring, set end date to start date then get the end times
      const mins = this.createEventForm.value.recurringEndTime.getMinutes();
      const hrs = this.createEventForm.value.recurringEndTime.getHours();
      this.newEvent.endDate.setMinutes(mins);
      this.newEvent.endDate.setHours(hrs);
    }
    this.newEvent.paidEvent = this.createEventForm.value.paidEvent;
    if (this.newEvent.paidEvent) {
      this.newEvent.eventFee = this.createEventForm.value.fee;
      this.newEvent.refundable = this.createEventForm.value.refundable;
      this.newEvent.refundPolicy = this.createEventForm.value.refundPolicy;
    }
    this.newEvent.eventOnline = this.createEventForm.value.locationOnline;
    this.newEvent.liveEventUrl = this.createEventForm.value.liveEventURL;
    this.newEvent.eventPhysical = this.createEventForm.value.locationPhysical;
    if (this.newEvent.eventPhysical) {
      this.newEvent.eventVenue = this.createEventForm.value.locationPhysicalAddress;
    }
    this.newEvent.eventStatus = 'active';
    this.newEvent.eventImage = this.createEventForm.value.image;
    this.newEvent.videoDisplay = this.createEventForm.value.video;
    this.newEvent.durationNumber = this.createEventForm.value.eventDurationNumber;
    this.newEvent.durationTerm = this.createEventForm.value.eventDurationTerm;
    if (this.createEventForm.value.image) {
      this.newEvent.eventImageUrl = this.createEventForm.value.imageURL;
    }
    if (this.createEventForm.value.video) {
      this.newEvent.videoUrl = this.createEventForm.value.videoURL;
    }
    
    this.fbData.addEvent(this.newEvent, this.data.grp).then((cEvtId: string) => {
      let groupLeadName: string;

      // Get a specific group and then fetch all member emails.
      this.fbData.getSpecificGroup(this.data.grp.uid).subscribe(data => {
        data.members.forEach(member => {
          this.fbData.getUserName(this.newEvent.groupLead).subscribe(res => { return groupLeadName = res[0].firstName; });
          this.fbData.getUserName(member.userUID).subscribe(res => {
            this.notify.sendNewEventEmail(groupLeadName, this.createEventForm.value.name, cEvtId, this.data.grp.uid, this.createEventForm.value.start, this.createEventForm.value.end, this.newEvent.liveEventUrl, res[0].email, res[0].firstName).subscribe((res) => { });
            this.dialogRef.close();
          });
        });
      });
    });

  }

  // unsubscribe from group search observable
  ngOnDestroy(): void {

  }
  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
