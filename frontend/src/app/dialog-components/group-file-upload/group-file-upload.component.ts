import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  constructor(public dialogRef: MatDialogRef<GroupFileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private storage: AngularFireStorage) { }

  ngOnInit() {
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
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(data => {
          console.log(data);
        })
      })
    ).subscribe()
    
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
