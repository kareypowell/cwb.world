import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseUploadService } from '../../services/firebase-upload.service';
import { Files } from '../../interfaces/member';

@Component({
  selector: 'app-group-file-upload',
  templateUrl: './group-file-upload.component.html',
  styleUrls: ['./group-file-upload.component.css']
})

export class GroupFileUploadComponent implements OnInit {


  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  public config: PerfectScrollbarConfigInterface = {};
  selectedFiles: FileList;
  uploadedFile: Files = {};
  allFiles: Files[];

  constructor(public dialogRef: MatDialogRef<GroupFileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private storage: AngularFireStorage, private fileStoreDB: FirebaseUploadService) { }

  ngOnInit() {
    this.fileStoreDB.getFilesInGroup(this.data.groupId).subscribe(data => {
      this.allFiles = data;
    })
  }


  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }
  private subUrl;
  startUpload() {
    // The File object
    const file = this.selectedFiles[0];

    // The storage path
    const path = `groups/${this.data.groupId}/files/${file.name}`;
    const fileRef = this.storage.ref(path);

    // The main task
    const task = this.storage.upload(path, file);

    // Progress monitoring
    this.percentage = task.percentageChanges();
    //this.snapshot   = this.task.snapshotChanges()

    // The file's download URL

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL()
          .subscribe(data => {
            this.downloadURL = data;
            this.uploadedFile.name = file.name;
            this.uploadedFile.isPrivate = false;
            this.uploadedFile.url = data;
            this.uploadedFile.groudId = this.data.groupId;
            this.uploadedFile.dateCreated = new Date();
            this.fileStoreDB.addFileToDB(this.uploadedFile);
          })
      })
    ).subscribe()

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


  activateWarnIndex: number;

  deleteFile(url: string, id: string) {
    this.storage.storage.refFromURL(url).delete().then(() => {
      this.fileStoreDB.removeFileFromDB(id);
    })
  }
  public showWarning: boolean = false;
  confirm(url: string, id: string) {
    this.deleteFile(url, id);
  }
  cancel() {
    this.showWarning = false;
  }
}
