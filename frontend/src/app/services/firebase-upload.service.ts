import { Injectable } from '@angular/core';
import { Files } from '../interfaces/member';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUploadService {

  uploadsCollection: AngularFirestoreCollection<Files>

  constructor(private afs: AngularFirestore) {
    this.uploadsCollection = this.afs.collection("uploads");
   }

  addFileToDB(file: Files){
    this.uploadsCollection.add(file).then(()=>console.log("added file details to db")).catch(error => console.log(error))
  }

  getFilesInGroup(groudId: string){
    return this.afs.collection('uploads', ref => ref
      .where('groudId', '==', groudId))
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Files;
          data.uid = a.payload.doc.id;
          return data;
        })
      }));
  }
  
}
