import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GroupFileUploadComponent } from '../../dialog-components/group-file-upload/group-file-upload.component';
import { ActivatedRoute } from '@angular/router';
import { Files, User, Group } from '../../interfaces/member';
import { FirebaseUploadService } from '../../services/firebase-upload.service';
import { FirebaseDataService } from '../../firebase-data.service';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  allFiles: Files[];
  user: User;
  group: Group;

  showUploadButton:boolean = false; // change to false by default, set to true if user is group lead
  id: string;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private fs: FirebaseUploadService, private fbData: FirebaseDataService, private auth: AuthService) { }

  ngOnInit() {
    this.id = this.route.parent.snapshot.params['id'];
    this.auth.user$.subscribe(data => {
      this.user = data;
      this.fbData.getSpecificGroup(this.id).subscribe(data => {
        this.group = data;
        if(this.user){
          if(this.group.groupLead === this.user.uid){
            this.showUploadButton = true;
          }else{
            this.showUploadButton = false;
          }
        }
      })
    })
    this.fs.getFilesInGroup(this.id).subscribe(data => {
      this.allFiles = data;
    })
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
