import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDataService } from '../firebase-data.service';
import { Group, GroupMember, EventItem, User } from '../interfaces/member';
import { AuthService } from '../auth-service';
import { MatDialog } from '@angular/material';
import { RequestToJoinGroupComponent } from '../dialog-components/request-to-join-group/request-to-join-group.component';
import { DataTransferService } from '../data-transfer.service';
import { PaymentService } from '../services/payment.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  handler: any;

  constructor(private fbData: FirebaseDataService, private route: ActivatedRoute, private router: Router, private auth: AuthService,
    public dialog: MatDialog, private data: DataTransferService, public pmt: PaymentService) { }

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
  showJoinGroup: boolean = false;
  manageMembership: boolean = false;
  private subUser;
  private subEvents;
  upcomingEvents: EventItem[];
  actualUpcomingEvents: EventItem[];
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    //this.configHandler();
    this.subUser = this.auth.user$.subscribe(data => {
      this.user = data; // subscribe to user data
      if (this.user && this.user.groupsJoined) {
        if (this.user.groupsJoined.indexOf(this.id) < 0) {
          this.showJoinGroup = true;
        } else {
          this.manageMembership = true;
        }
      } else {
        this.showJoinGroup = true;
      }
      // sub for groups
      this.sub1 = this.fbData.getSpecificGroup(this.id).subscribe(data => {
        this.group = data;
        this.sub2 = this.fbData.getGroupMembers(this.id).subscribe(data => {
          this.groupMembers = data;
        });
        this.subEvents = this.fbData.getGroupEvents(this.id).subscribe(data => {
          this.upcomingEvents = data;
          this.actualUpcomingEvents = [];
          this.upcomingEvents.forEach(event => {
            if (new Date(event.endDate['seconds'] * 1000) >= new Date()) { // && event.eventType === 'single'
              this.actualUpcomingEvents.push(event);

            } else if (new Date(event.endDate['seconds'] * 1000) < new Date() && event.eventType === 'recurring') {
              //while() while loop through added recurrence to new date till current upcoming event
              // if any found, append to actualUpcomingEvents
              const today = new Date();
              let start_date = new Date(event.startDate['seconds'] * 1000);

              for (let index = 0; index < event.durationNumber; index++) {
                if (event.durationTerm === "week") {
                  start_date.setDate(start_date.getDate() + 7);
                  if (start_date >= today) {
                    event.startDate = start_date;
                    this.actualUpcomingEvents.push(event);
                    break;
                  }
                } else if (event.durationTerm == "month") {
                  start_date.setMonth(start_date.getMonth() + 1);
                  if (start_date >= today) {
                    event.startDate = start_date;
                    this.actualUpcomingEvents.push(event);
                    break;
                  }
                }

              }
            }
          });
        });
      });
    });


  }

  /*
  private configHandler() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://goo.gl/EJJYq8',
      locale: 'auto',
      token: token => {
        this.pmt.processPayment(token);
      }
    });
  }
  

  openHandler() {
    this.handler.open({
      name: 'FireStarter',
      excerpt: 'PRO Subscription',
      amount: 1500
    });
  }
  */

  joinGroup() {
    if (this.user) {
      let dialogRef = this.dialog.open(RequestToJoinGroupComponent, {
        width: '90%',
        data: { grp: this.group }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (this.user.groupsJoined.indexOf(this.id) > -1) {
          this.showJoinGroup = false;
        }
      });
    } else {
      console.log("Login to join");
      this.data.routeBack = true;
      this.router.navigate(['/login']);
    }
  }
  mangeMembership() {

  }

  subscribe() {

  }


  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.subEvents.unsubscribe();
    this.subUser.unsubscribe();
  }

}
