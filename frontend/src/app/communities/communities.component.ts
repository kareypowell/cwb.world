import { Component, OnInit,OnDestroy } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { FirebaseDataService } from '../firebase-data.service';
import { Community } from '../interfaces/member';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent implements OnInit,OnDestroy {

  constructor(private data:DataTransferService,private fbData:FirebaseDataService) { 
  }
  private sub;
  communities: Community[];

  ngOnInit() {
    this.sub = this.fbData.communitiesFromDB$.subscribe(data => this.communities = data);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

