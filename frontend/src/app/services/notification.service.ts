import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  apiTestURL: string = "http://cwb-world-api.test/api";
  apiLiveURL: string = "https://cwb-world-api.appspot.com/api/v1";

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

  public signUp(name: string, email: string) {
    return this.httpClient.post(`${this.apiLiveURL}/sign-up`, {
      name: name,
      email: email
    });
  }

  public newGroupMember(name: string, email: string, groupName: string) {
    return this.httpClient.post(`${this.apiLiveURL}/new-member`, {
      name: name,
      email: email,
      groupName: groupName
    });
  }
}
