import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { FirebaseDataService } from '../firebase-data.service';
import { Group, Community } from '../interfaces/member';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {

  constructor(private data:DataTransferService, private fbData:FirebaseDataService, private route:ActivatedRoute) { }
  community: object = this.data.community;
  private sub;
  private sub2;
  groups: Group[];
  communityy:Community;
  ngOnInit() {
    this.sub = this.fbData.communityCollection.doc(this.route.snapshot.params['id']).valueChanges().subscribe(data => this.communityy = data);
    this.sub2 = this.fbData.getSpecificItems(this.route.snapshot.params['id']).subscribe(data => this.groups = data);

  }
  

  showFilterDiv:boolean = false;
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
