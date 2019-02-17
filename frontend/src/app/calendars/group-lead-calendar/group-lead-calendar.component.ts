import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { FirebaseDataService } from '../../firebase-data.service';
import { EventItem, User } from '../../interfaces/member';
import { AuthService } from '../../auth-service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#2def54',
    secondary: '#baffc8'
  }
};

@Component({
  selector: 'app-group-lead-calendar',
  templateUrl: './group-lead-calendar.component.html',
  styleUrls: ['./group-lead-calendar.component.css']
})
export class GroupLeadCalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action?: string;
    event?: CalendarEvent;
    eventData?: EventItem;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  singleEvent: CalendarEvent;
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private fbData: FirebaseDataService, private _auth: AuthService) { }
  private subEvents;
  eventsFromDB: EventItem[];

  private startDT;
  private endDT;

  addEvent(singleEv): void {
    this.events.push({
      title: singleEv.title,
      start: singleEv.start,
      end: singleEv.end,
      color: singleEv.color,
      draggable: false,
      meta: singleEv.meta,
      resizable: {
        beforeStart: false,
        afterEnd: false
      }
    });
    this.refresh.next();
  }
  colorChosen: any;
  user: User;
  private userSub;
  ngOnInit(): void {
    this.userSub = this._auth.user$.subscribe(data => {
      this.user = data;
      // after getting user's groups, sub to all events
      this.subEvents = this.fbData.eventCollection.valueChanges().subscribe(data => {
        this.eventsFromDB = data;
        this.events = []; // flush calendar
        this.eventsFromDB.forEach(event => {
          if (this.user.groupsLead) {
            if (this.user.groupsLead.indexOf(event.group) > -1) { // check if event's group is part of user's groups lead
              // set appropriate color code for event based on event time
              if (event.eventType === 'single') {
                if (new Date(event.endDate['seconds'] * 1000) < new Date()) {
                  this.colorChosen = colors.red; // event has passed;
                } else if (new Date(event.endDate['seconds'] * 1000) > new Date() && new Date(event.startDate['seconds'] * 1000) < new Date()) {
                  this.colorChosen = colors.yellow; // event is in progress
                } else if (new Date(event.startDate['seconds'] * 1000) > new Date()) {
                  this.colorChosen = colors.green; // event is in the future
                }
                this.singleEvent = {
                  'start': new Date(event.startDate['seconds'] * 1000),
                  'end': new Date(event.endDate['seconds'] * 1000),
                  'title': event.name,
                  'color': this.colorChosen,
                  'meta': event
                };
                this.addEvent(this.singleEvent);
              } else if (event.eventType === 'recurring') {
                const durationNum = event.durationNumber;
                const durationTerm = event.durationTerm;
                // loop number of recurrence
                if (durationTerm === 'week') {
                  if (event.recurrence === 'weekly') {
                    for (let index = 0; index < durationNum; index++) {
                      this.startDT = new Date(event.startDate['seconds'] * 1000);
                      this.startDT.setDate(this.startDT.getDate() + index * 7);
                      this.endDT = new Date(event.endDate['seconds'] * 1000);
                      this.endDT.setDate(this.endDT.getDate() + index * 7);

                      // set colors
                      if (this.startDT < new Date()) {
                        this.colorChosen = colors.red; // event has passed;
                      } else if (this.endDT > new Date() && this.startDT < new Date()) {
                        this.colorChosen = colors.yellow; // event is in progress
                      } else if (this.startDT > new Date()) {
                        this.colorChosen = colors.green; // event is in the future
                      }
                      // set event params
                      this.singleEvent = {
                        'start': this.startDT,
                        'end': this.endDT,
                        'title': event.name,
                        'color': this.colorChosen,
                        'meta': event
                      };
                      this.addEvent(this.singleEvent);

                    }
                  }
                } else if (durationTerm === 'month') {
                  for (let index = 0; index < durationNum; index++) {
                    this.startDT = new Date(event.startDate['seconds'] * 1000);
                    this.startDT.setMonth(this.startDT.getMonth() + index);
                    this.endDT = new Date(event.endDate['seconds'] * 1000);
                    this.endDT.setMonth(this.endDT.getMonth() + index);

                    // set colors
                    if (this.startDT < new Date()) {
                      this.colorChosen = colors.red; // event has passed;
                    } else if (this.endDT > new Date() && this.startDT < new Date()) {
                      this.colorChosen = colors.yellow; // event is in progress
                    } else if (this.startDT > new Date()) {
                      this.colorChosen = colors.green; // event is in the future
                    }
                    // set event params
                    this.singleEvent = {
                      'start': this.startDT,
                      'end': this.endDT,
                      'title': event.name,
                      'color': this.colorChosen,
                      'meta': event
                    };
                    this.addEvent(this.singleEvent);

                  }
                } else if (durationTerm === 'year') {
                  for (let index = 0; index < durationNum; index++) {
                    this.startDT = new Date(event.startDate['seconds'] * 1000);
                    this.startDT.setFullYear(this.startDT.getFullYear() + index);
                    this.endDT = new Date(event.endDate['seconds'] * 1000);
                    this.endDT.setFullYear(this.endDT.getFullYear() + index);

                    // set colors
                    if (this.startDT < new Date()) {
                      this.colorChosen = colors.red; // event has passed;
                    } else if (this.endDT > new Date() && this.startDT < new Date()) {
                      this.colorChosen = colors.yellow; // event is in progress
                    } else if (this.startDT > new Date()) {
                      this.colorChosen = colors.green; // event is in the future
                    }
                    // set event params
                    this.singleEvent = {
                      'start': this.startDT,
                      'end': this.endDT,
                      'title': event.name,
                      'color': this.colorChosen,
                      'meta': event
                    };
                    this.addEvent(this.singleEvent);

                  }
                }

              }
            }
          }
        });
      });
    });
  }

  ngOnDestroy(): void { // unsubscribe from all subscriptions
    this.subEvents.unsubscribe();
    this.userSub.unsubscribe();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action?: string, event?: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


}
