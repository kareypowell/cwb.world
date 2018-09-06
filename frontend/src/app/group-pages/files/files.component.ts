import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GroupFileUploadComponent } from '../../dialog-components/group-file-upload/group-file-upload.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  showUploadButton:boolean = true; // change to false by default, set to true if user is group lead
  id: string;
  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.parent.snapshot.params['id'];
  }

  uploadFileDialog(){
    let dialogRef = this.dialog.open(GroupFileUploadComponent, {
      width: '99%',
      data: {groupId: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }
}
