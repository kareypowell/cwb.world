import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseDataService } from '../../firebase-data.service';
import { blogPost } from '../../interfaces/member';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  id:string;
  post: blogPost;
  postBody: any;
  constructor(private route: ActivatedRoute, private fbData: FirebaseDataService, public _sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.id = this.route.snapshot.params['id'];
    }
    this.fbData.getSpecificPost(this.id).subscribe(data => {
      this.post = data;
      //this.postBody =this._sanitizer.bypassSecurityTrustHtml(this.post.body)
    })

  }

}
