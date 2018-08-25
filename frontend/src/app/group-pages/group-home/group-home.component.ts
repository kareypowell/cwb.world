import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FirebaseDataService } from '../../firebase-data.service';
import { Group } from '../../interfaces/member';
import { MatDialog } from '@angular/material';
import { DesignGroupHomepageComponent } from '../../dialog-components/design-group-homepage/design-group-homepage.component';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css']
})
export class GroupHomeComponent implements OnInit {
  id: string = "";
  group: Group;
  constructor(private route: ActivatedRoute, private fbData: FirebaseDataService, public dialog: MatDialog) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.id = this.route.snapshot.params['id'];
    }
    this.fbData.getSpecificGroup(this.id).subscribe(data =>{
      this.group = data;
    })
  }

  openDialog(): void {

    let dialogRef = this.dialog.open(DesignGroupHomepageComponent, {
      width: '99%',
      data: { id: this.id, grp: this.group}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

}
