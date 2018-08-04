import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDataService } from '../firebase-data.service';
import { Group, GroupMember, EventItem, User } from '../interfaces/member';
import { AuthService } from '../auth-service';
import { MatDialog } from '@angular/material';
import { RequestToJoinGroupComponent } from '../dialog-components/request-to-join-group/request-to-join-group.component';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  constructor(private fbData: FirebaseDataService, private route: ActivatedRoute, private router: Router, private auth: AuthService,
    public dialog: MatDialog, private data: DataTransferService) { }

  navLinks = [
    { path: './', label: 'HOME' },
    { path: 'events', label: 'EVENTS' },
    { path: 'posts', label: 'POSTS' },
    { path: 'files', label: 'FILES' },
    { path: 'all-members', label: 'MEMBERS' }
  ];
  activeLink = 0;

  id: string;
  group: Group;
  groupMembers: GroupMember[];
  private sub1;
  user: User;
  private sub2;
  private subUser;
  private subEvents;
  upcomingEvents: EventItem[];
  actualUpcomingEvents: EventItem[];
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.subUser = this.auth.user$.subscribe(data => {
      this.user = data; // subscribe to user data
      // sub for groups
      this.sub1 = this.fbData.getSpecificGroup(this.id).subscribe(data => {
        this.group = data;
        this.sub2 = this.fbData.getGroupMembers(this.id).subscribe(data => this.groupMembers = data);
        this.subEvents = this.fbData.getGroupEvents(this.id).subscribe(data => {
          this.upcomingEvents = data;
          this.actualUpcomingEvents = [];
          this.upcomingEvents.forEach(event => {
            if (new Date(event.endDate['seconds'] * 1000) > new Date() && event.eventType === 'single') {
              this.actualUpcomingEvents.push(event);
            } else if (new Date(event.endDate['seconds'] * 1000) < new Date() && event.eventType === 'recurring') {
              //while() while loop through added recurrence to new date till current upcoming event
              // if any found, append to actualUpcomingEvents
            }
          });
        });
      });
    });


  }

  joinGroup() {
    if (this.user) {
      let dialogRef = this.dialog.open(RequestToJoinGroupComponent, {
        width: '90%',
        data: { grp: this.group }
      });

      dialogRef.afterClosed().subscribe(result => {
        //console.log(result);
      });
    } else {
      console.log("Login to join");
      this.data.routeBack = true;
      this.router.navigate(['/login']);
    }
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.subEvents.unsubscribe();
    this.subUser.unsubscribe();
  }

}
