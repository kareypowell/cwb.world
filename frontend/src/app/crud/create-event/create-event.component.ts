import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, EventItem } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  constructor(private _formBuilder: FormBuilder, private fbData: FirebaseDataService) { }
  createEventForm: FormGroup;
  groupSearch: Group[];
  ngOnInit() {

    this.createEventForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      whatToExpect: [''],
      capacity: [50, Validators.required],
      group: ['', Validators.required],
      start: [new Date, Validators.required],
      end: [new Date, Validators.required],
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
      locationPhysical: false,
      locationPhysicalAddress: '',
      includeWeekends: true,
      openToOnlyGroupMembers: false,
      registrationRequired: false
    });
  }

  private subGroup;
  searchGroup() {
    this.subGroup = this.fbData.searchCollection(String(this.createEventForm.value.group), "groups", "nameToLower", 5).subscribe(data => this.groupSearch = data);
  }
  selectedGroup: string;
  grp: Group;
  groupLead: string;
  getGroup(option) {
    this.grp = option;
    this.selectedGroup = option.uid;
    this.groupLead = option.groupLead;
  }

  newEvent: EventItem;
  createEvent() {
    this.newEvent = {};
    this.newEvent.name = this.createEventForm.value.name;
    this.newEvent.nameToLower = this.createEventForm.value.name.toLowerCase();
    this.newEvent.description = this.createEventForm.value.description;
    this.newEvent.whatToExpect = this.createEventForm.value.whatToExpect;
    this.newEvent.startDate = this.createEventForm.value.start;
    this.newEvent.groupLead = this.groupLead;
    this.newEvent.group = this.selectedGroup;
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
    }
    this.newEvent.paidEvent = this.createEventForm.value.paidEvent;
    if (this.newEvent.paidEvent) {
      this.newEvent.eventFee = this.createEventForm.value.fee;
      this.newEvent.refundable = this.createEventForm.value.refundable;
      this.newEvent.refundPolicy = this.createEventForm.value.refundPolicy;
    }
    this.newEvent.eventOnline = this.createEventForm.value.locationOnline;
    this.newEvent.eventPhysical = this.createEventForm.value.locationPhysical;
    if (this.newEvent.eventPhysical) {
      this.newEvent.eventVenue = this.createEventForm.value.locationPhysicalAddress;
    }
    this.newEvent.eventStatus = 'active';
    this.newEvent.eventImage = this.createEventForm.value.image;
    this.newEvent.videoUrl = this.createEventForm.value.video;
    if (this.createEventForm.value.image) {
      this.newEvent.eventImageUrl = this.createEventForm.value.imageURL;
    }
    if (this.createEventForm.value.video) {
      this.newEvent.eventImageUrl = this.createEventForm.value.videoURL;
    }
    this.fbData.addEvent(this.newEvent, this.grp);
  }


  // unsubscribe from group search observable
  ngOnDestroy(): void {
    this.subGroup.unsubscribe();
  }
}
