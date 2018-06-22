import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef, OnInit, OnDestroy} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent} from 'angular-calendar';
import { FirebaseDataService } from '../firebase-data.service';
import { EventItem } from '../interfaces/member';

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
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
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

  constructor(private modal: NgbModal, private fbData: FirebaseDataService) { }
  private subEvents;
  eventsFromDB: EventItem[];

  addEvent(singleEv): void {
    this.events.push({
      title: singleEv.title,
      start: singleEv.start,
      end: singleEv.end,
      color: singleEv.color,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
  ngOnInit(): void {
    this.subEvents = this.fbData.eventCollection.valueChanges().subscribe(data => {
      this.eventsFromDB = data;
      this.events = []; // flush calendar
      this.eventsFromDB.forEach(event => {
        this.singleEvent = {'start': new Date(event.startDate['seconds']*1000), 'end': new Date(event.endDate['seconds']*1000), 'title':event.name, 'color': colors.blue};
        this.addEvent(this.singleEvent);
      });
    });
    
  }

  ngOnDestroy(): void {
    this.subEvents.unsubscribe();
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  
}
