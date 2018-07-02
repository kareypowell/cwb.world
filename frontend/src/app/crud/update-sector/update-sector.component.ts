import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // get sector Info

    // create form and prefil data
  }

  updateSector(){
    
  }
}
