import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { User } from '../interfaces/member';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User;
  constructor( public auth: AuthService) { }
  ngOnInit() {
    this.auth.user$.subscribe(data => this.user = data);
  }
  messages = [
  ];
  notifications = [
  ];
  popItem(not){
    this.notifications.splice(this.notifications.indexOf(not),1);
  }
  popMessage(mess){
    this.messages.splice(this.messages.indexOf(mess),1);
  }
  logout(){
    this.auth.logout();
  }
}
