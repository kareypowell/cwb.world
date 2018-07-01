import { Injectable } from '@angular/core';
import { Group } from './interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  activeLink = 0;
  createEventGroup: Group;
  constructor() { }
  
}
