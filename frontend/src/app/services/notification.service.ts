import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'firebase';

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  apiTestURL: string = "https://api.cwb.world/api/v1";
  apiLiveURL: string = "https://api.cwb.world/api/v1";

  constructor(private httpClient: HttpClient) {}

  public ping() {
    return this.httpClient.get(`${this.apiTestURL}/test`);
  }

  public pong() {
    let users: { name: string; email: string }[] = [
      { name: "Karey", email: "kareypowell@gmail.com" }
      // { "name": "Chiibu", "email": "chiibukk@gmail.com" },
      // { "name": "Donovan", "email": "info@read2me.us" },
    ];

    return this.httpClient.post(`${this.apiTestURL}/test`, { users: users });
  }

  // send new user sign up email
  public signUp(name: string, email: string) {
    return this.httpClient.post(`${this.apiLiveURL}/sign-up`, {
      name: name,
      email: email
    });
  }

  // send new group member email to group lead.
  public newGroupMember(name: string, email: string, groupName: string) {
    return this.httpClient.post(`${this.apiLiveURL}/new-member`, {
      name: name,
      email: email,
      groupName: groupName
    });
  }

  // send new group member email to group lead.
  public userJoinedGroup(name: string, email: string, groupName: string) {
    return this.httpClient.post(`${this.apiLiveURL}/joined-group`, {
      name: name,
      email: email,
      groupName: groupName
    });
  }

  // send email to sector lead.
  public sendSectorLeadEmail(name: string, email: string) {
    return this.httpClient.post(`${this.apiLiveURL}/sector-lead`, {
      name: name,
      email: email
    });
  }

  /**
   * send email to all memebers when a new event is created.
   */
  public sendNewEventEmail(groupHostName: string, eventName: string, eventID: string, groupID: string, startDate: Date, endDate: Date, url: string, memberEmail: string, memberName: string) {
    return this.httpClient.post(`${this.apiLiveURL}/new-event`, {
      groupHostName: groupHostName,
      eventName: eventName,
      eventID: eventID,
      groupID: groupID,
      startDate: startDate,
      endDate: endDate,
      url: url,
      memberName: memberName,
      memberEmail: memberEmail
    });
  }

  /**
   * send event registration details to user
   */
  public eventRegistrationEmail(memberName: string, eventName: string, startDate: Date, endDate: Date, email: string, eventID: string, groupID: string, url: string, description: string) {
    return this.httpClient.post(`${this.apiLiveURL}/event-registration`, {
      memberName: memberName,
      eventName: eventName,
      startDate: startDate,
      endDate: endDate,
      email: email,
      eventID: eventID,
      groupID: groupID,
      url: url,
      description: description
    });
  }
}
