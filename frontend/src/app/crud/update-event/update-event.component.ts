import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventItem } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private fbData: FirebaseDataService) { }
  public config: PerfectScrollbarConfigInterface = {};
  updateEventForm: FormGroup;
  updatedEvent: EventItem = {};

  eventFee: number = 0;
  refundPol: string = "";
  refundable: boolean = false;
  eventFrequency: string = "";
  includeWeekends: boolean = false;
  eventRecurrence: string = "";
  eventVenue:string = "";
  imageURL:string ="";
  videoURL: string = "";
  onlineEventURL: string = "";


  ngOnInit() {
    this.updateEventForm = this._formBuilder.group({
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

    if (this.data.event.paidEvent) {
      this.eventFee = this.data.event.eventFee;
      this.refundable = this.data.event.refundable;
      this.refundPol = this.data.event.refundPolicy
    }
    if(this.data.event.liveEventUrl){
      this.onlineEventURL = this.data.event.liveEventUrl;
    }else{
      this.onlineEventURL = "";
    }
    if(this.data.event.eventType === "single"){
      this.includeWeekends = true;
    }else{
      this.eventFrequency = this.data.event.recurrence;
    }
    if(this.data.event.eventPhysical){
      this.eventVenue = this.data.event.eventVenue;
    }
    if(this.data.event.eventImage){
      this.imageURL = this.data.event.eventImageUrl;
    }
    if(this.data.event.videoDisplay){
      this.videoURL = this.data.event.videoUrl
    }

    this.updateEventForm.setValue({
      name: this.data.event.name,
      description: this.data.event.description,
      whatToExpect: this.data.event.whatToExpect,
      capacity: this.data.event.eventCapacity,
      start: new Date(this.data.event.startDate['seconds']*1000),
      end: new Date(this.data.event.endDate['seconds']*1000),
      recurringEndTime: new Date(this.data.event.endDate['seconds']*1000),
      paidEvent: this.data.event.paidEvent,
      eventType: this.data.event.eventType,
      eventFrequency: this.eventFrequency, //weekly or something
      fee: this.eventFee,
      image: this.data.event.eventImage || false,
      imageURL: this.imageURL,
      video: this.data.event.videoDisplay || false,
      videoURL: this.videoURL,
      refundable: this.refundable,
      refundPolicy: this.refundPol,
      startWithoutHost: this.data.event.startWithoutHost,
      timeZone: 'GMT',
      locationOnline: this.data.event.eventOnline,
      liveEventURL: this.onlineEventURL,
      locationPhysical: this.data.event.eventPhysical,
      locationPhysicalAddress: this.eventVenue,
      includeWeekends: this.includeWeekends,
      openToOnlyGroupMembers: this.data.event.openToOnlyGroupMembers,
      registrationRequired: this.data.event.registrationRequired,
      eventDurationNumber: this.data.event.durationNumber,
      eventDurationTerm: this.data.event.durationTerm
    })


  }



  updateEvent() {
    this.updatedEvent.name = this.updateEventForm.value.name;
    this.updatedEvent.nameToLower = this.updateEventForm.value.name.toLowerCase();
    this.updatedEvent.description = this.updateEventForm.value.description;
    this.updatedEvent.whatToExpect = this.updateEventForm.value.whatToExpect;
    this.updatedEvent.startDate = this.updateEventForm.value.start;
    this.updatedEvent.endDate = this.updateEventForm.value.end;
    this.updatedEvent.startWithoutHost = this.updateEventForm.value.startWithoutHost;
    this.updatedEvent.eventCapacity = this.updateEventForm.value.capacity;
    this.updatedEvent.eventType = this.updateEventForm.value.eventType;
    this.updatedEvent.openToOnlyGroupMembers = this.updateEventForm.value.openToOnlyGroupMembers;
    this.updatedEvent.registrationRequired = this.updateEventForm.value.registrationRequired;

    if (this.updateEventForm.value.eventType === 'single') {
      this.updatedEvent.includeWeekends = this.updateEventForm.value.includeWeekends;
    } else {
      this.updatedEvent.isRecurrent = true;
      this.updatedEvent.recurrence = this.updateEventForm.value.eventFrequency;
      this.updatedEvent.endDate = new Date(this.updateEventForm.value.start); // if recurring, set end date to start date then get the end times
      const mins = this.updateEventForm.value.recurringEndTime.getMinutes();
      const hrs = this.updateEventForm.value.recurringEndTime.getHours();
      this.updatedEvent.endDate.setMinutes(mins);
      this.updatedEvent.endDate.setHours(hrs);
    }
    this.updatedEvent.paidEvent = this.updateEventForm.value.paidEvent;
    if (this.updatedEvent.paidEvent) {
      this.updatedEvent.eventFee = this.updateEventForm.value.fee;
      this.updatedEvent.refundable = this.updateEventForm.value.refundable;
      this.updatedEvent.refundPolicy = this.updateEventForm.value.refundPolicy;
    }
    this.updatedEvent.eventOnline = this.updateEventForm.value.locationOnline;
    this.updatedEvent.liveEventUrl = this.updateEventForm.value.liveEventURL;
    this.updatedEvent.eventPhysical = this.updateEventForm.value.locationPhysical;
    if (this.updatedEvent.eventPhysical) {
      this.updatedEvent.eventVenue = this.updateEventForm.value.locationPhysicalAddress;
    }
    this.updatedEvent.eventStatus = 'active';
    this.updatedEvent.eventImage = this.updateEventForm.value.image;
    this.updatedEvent.videoUrl = this.updateEventForm.value.video;
    this.updatedEvent.durationNumber = this.updateEventForm.value.eventDurationNumber;
    this.updatedEvent.durationTerm = this.updateEventForm.value.eventDurationTerm;
    if (this.updateEventForm.value.image) {
      this.updatedEvent.eventImageUrl = this.updateEventForm.value.imageURL;
    }
    if (this.updateEventForm.value.video) {
      this.updatedEvent.videoUrl = this.updateEventForm.value.videoURL;
    }
    this.fbData.updateEvent(this.data.event.uid, this.updatedEvent);
    //console.log(this.updatedEvent);
    this.onNoClick(false); // close dialog
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
