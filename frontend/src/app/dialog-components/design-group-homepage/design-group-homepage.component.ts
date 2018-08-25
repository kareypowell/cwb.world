import { Component, OnInit, Inject } from '@angular/core';
import { pageContent } from '../../interfaces/member';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {NgForm} from '@angular/forms';
import { FirebaseDataService } from '../../firebase-data.service';

@Component({
  selector: 'app-design-group-homepage',
  templateUrl: './design-group-homepage.component.html',
  styleUrls: ['./design-group-homepage.component.css']
})
export class DesignGroupHomepageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DesignGroupHomepageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fbData: FirebaseDataService) { }

  pageContent:any;

  pageComponens:pageContent[] = [];
  public config: PerfectScrollbarConfigInterface = {};

  components:pageContent[] = [
    {
      elementHTMLContent:"",
      elementName: "",
      elementValue: ""
    },
  ];

  ngOnInit() {
    if(this.data.grp.homePage){
      console.log(this.data.grp.homePage);
      this.pageContent = this.data.grp.homePage;
    }
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  updateGroupPage(){
    this.fbData.updateGroup(this.data.id,{"homePage":this.pageContent});
    this.onNoClick(false);
  }
}
