import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FirebaseDataService } from '../../firebase-data.service';
import { Group } from '../../interfaces/member';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css']
})
export class GroupHomeComponent implements OnInit {
  id: string = "";
  group: Group;
  constructor(private route: ActivatedRoute, private fbData: FirebaseDataService) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.id = this.route.snapshot.params['id'];
    }
    this.fbData.getSpecificGroup(this.id).subscribe(data =>{
      this.group = data;
    })
  }

}
