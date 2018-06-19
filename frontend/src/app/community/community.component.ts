import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseDataService } from '../firebase-data.service';
import { Group, Community, User } from '../interfaces/member';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {

  constructor(public fbData:FirebaseDataService, private route:ActivatedRoute) { }
  private sub;
  private sub2;
  private sub3;
  unsub3:boolean = false;
  groups: Group[];
  creator:User;
  community:Community;
  ngOnInit() {
    this.sub = this.fbData.communityCollection.doc(this.route.snapshot.params['id']).valueChanges().subscribe(data => 
      {
        this.community = data;
        if(this.community.createdBy){
          this.sub3 = this.fbData.userCollection.doc(this.community.createdBy).valueChanges().subscribe(data => this.creator = data);
          this.unsub3 = true;
        }else{
          this.creator = {};
          this.creator.firstName = "--";
          this.creator.lastname = "";
        }
      });
    this.sub2 = this.fbData.getSpecificItems(this.route.snapshot.params['id']).subscribe(data => this.groups = data);

  }

  showFilterDiv:boolean = false;
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    if(this.unsub3){
      this.sub3.unsubscribe();
    }
  }
}
