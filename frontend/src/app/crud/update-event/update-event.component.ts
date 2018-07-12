import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventItem } from '../../interfaces/member';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) { }
    public config: PerfectScrollbarConfigInterface = {};
    updateEventForm: FormGroup;
    updatedEvent: EventItem = {};

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
      locationPhysical: false,
      locationPhysicalAddress: '',
      includeWeekends: true,
      openToOnlyGroupMembers: false,
      registrationRequired: false,
      eventDurationNumber: 2,
      eventDurationTerm: 'week'
    });

    
  }


  updateEvent(){

    alert("Event update under works...");
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }
}
