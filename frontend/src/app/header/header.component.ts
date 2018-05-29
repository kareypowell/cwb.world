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
    {title:'Hi this is Clara!',message:"I have sent the lesson notes to all students. Remember to call principle Sheperd for more directions. Thank you!"},
    {title:"Student loans due",message:"No loans will be repayed and you have lost all your money. I lack creativity. Lmao!"},
    {title:"Who let the dogs out?",message:"Sandra did. She sold the leashes to some dude from 44th Street."}
  ];
  notifications = [
    {title:"Adams asked to join jupita leage coding group",more:""},
    {title:"Adams asked to join jupita leage coding group",more:""},
    {title:"Adams asked to join jupita leage coding group",more:""},
    {title:"Adams asked to join jupita leage coding group",more:""},
    {title:"Adams asked to join jupita leage coding group",more:""}
  ];
  logout(){
    this.auth.logout();
  }
}
