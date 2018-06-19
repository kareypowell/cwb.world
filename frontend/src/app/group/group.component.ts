import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FirebaseDataService } from '../firebase-data.service';
import { Group } from '../interfaces/member';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  constructor(private fbData: FirebaseDataService, private route: ActivatedRoute) { }
  id:string;
  group:Group;
  private sub1;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.sub1 = this.fbData.groupCollection.doc(this.id).valueChanges().subscribe(data => this.group = data);
    
  }

  ngOnDestroy():void{
    this.sub1.unsubscribe();
  }

}
