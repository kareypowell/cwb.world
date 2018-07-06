import { Component, OnInit } from '@angular/core';
import { CreateAirRmsSpaceComponent } from '../../crud/create-air-rms-space/create-air-rms-space.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-host-partner-role-info',
  templateUrl: './host-partner-role-info.component.html',
  styleUrls: ['./host-partner-role-info.component.css']
})
export class HostPartnerRoleInfoComponent implements OnInit {

  constructor(private dialog:MatDialog) { }
  dataset = {};

  ngOnInit() {
  }


  createRmsSpace() {
    this.dataset = { }
    let dialogRef = this.dialog.open(CreateAirRmsSpaceComponent, {
      width: '99%',
      data: this.dataset
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

}
