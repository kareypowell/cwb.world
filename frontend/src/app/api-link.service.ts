import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiLinkService {

  constructor(private http:Http) { }

  getUsers() {

  }
}
