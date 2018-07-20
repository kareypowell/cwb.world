import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseDataService } from '../../firebase-data.service';
import { EventItem } from '../../interfaces/member';
import { DomSanitizer } from '@angular/platform-browser';
import { EventRegistrationComponent } from '../../event-registration/event-registration.component';
import { MatDialog } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.css']
})
export class EventsViewComponent implements OnInit, OnDestroy {

  parentParam: string;
  id: string = "";
  private subEvents;
  events: EventItem[];
  singleEventView: boolean = false;
  selectedEvent: EventItem;

  constructor(private route: ActivatedRoute, private fbData: FirebaseDataService, private sanitizer: DomSanitizer, private dialog:MatDialog) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.id = this.route.snapshot.params['id'];
    }
    this.parentParam = this.route.parent.snapshot.params['id']; // get parent param which is the group ID
    this.subEvents = this.fbData.getGroupEvents(this.parentParam).subscribe(data => {
      this.events = data;
      if (this.id != "") {
        this.singleEventView = true;
        this.events.forEach(event => {
          if(event.uid === this.id){
            this.selectedEvent = event;
          }
        });
      }else{
        
      }
    });
    
    
    
  }

  dataset = {};
  registerEvent(){
    this.dataset = {event: this.selectedEvent}
    let dialogRef = this.dialog.open(EventRegistrationComponent, {
      width: '99%',
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }
  ngOnDestroy() {
    this.subEvents.unsubscribe();
  }

}
