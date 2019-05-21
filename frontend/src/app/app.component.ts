import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationService } from './services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private auth: AuthService, private router: Router, private notify: NotificationService) { }
  
  private subs;

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    /* this.notify.pong().subscribe((res) => {
      console.log(res);
    }); */
  }
}
