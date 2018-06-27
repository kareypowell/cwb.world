import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FirebaseDataService } from '../firebase-data.service';
import { Group, GroupMember, EventItem } from '../interfaces/member';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  constructor(private fbData: FirebaseDataService, private route: ActivatedRoute, private router: Router) { }

  navLinks = [
    {path:'./',label:'HOME'},
    {path:'events',label:'EVENTS'},
    {path:'posts',label:'POSTS'},
    {path:'files',label:'FILES'},
    {path:'all-members',label:'MEMBERS'}
  ];
  activeLink = 0;

  id:string;
  group:Group;
  groupMembers:GroupMember[];
  private sub1;
  private sub2;
  private subEvents;
  upcomingEvents:EventItem[];
  actualUpcomingEvents: EventItem[];
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.sub1 = this.fbData.groupCollection.doc(this.id).valueChanges().subscribe(data => 
      {
        this.group = data;
        this.sub2 = this.fbData.getGroupMembers(this.id).subscribe(data => this.groupMembers = data);
        this.subEvents = this.fbData.getGroupEvents(this.id).subscribe(data => {
          this.upcomingEvents = data;
          this.upcomingEvents.forEach(event => {
            if(new Date(event.endDate['seconds']*1000) > new Date() && event.eventType === 'single'){
              this.actualUpcomingEvents.push(event);
            }else if(new Date(event.endDate['seconds']*1000) < new Date() && event.eventType === 'recurring'){
              //while() while loop through added recurrence to new date till current upcoming event
              // if any found, append to actualUpcomingEvents
            }
          });
        });
      }); 
  }

  ngOnDestroy():void{
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.subEvents.unsubscribe();
  }

}
