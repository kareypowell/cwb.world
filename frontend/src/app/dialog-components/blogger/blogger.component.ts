import { Component, OnInit, Inject } from '@angular/core';
import { blogPost, User } from '../../interfaces/member';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FirebaseDataService } from '../../firebase-data.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrls: ['./blogger.component.css']
})
export class BloggerComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  blogPost: blogPost = {};
  allPosts: blogPost[];
  editablePost: blogPost;
  isEditPane: boolean = false;

  constructor(public dialogRef: MatDialogRef<BloggerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fbData: FirebaseDataService, private auth: AuthService) { }

  ngOnInit() {
    this.fbData.getAllPostsInGroup(this.data.id).subscribe(data => {
      this.allPosts = data;
    })
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  titleRequired: boolean = false;
  excerptRequired: boolean = false;

  createPost() {
    if (this.blogPost.title && this.blogPost.title != "") {
      if (this.blogPost.excerpt && this.blogPost.excerpt != "") {
        this.blogPost.author = this.data.author_id;
        this.blogPost.title_url = this.blogPost.title.toLowerCase().split(' ').join('_');
        this.blogPost.group = this.data.id;
        this.blogPost.draft = false;
        this.blogPost.datePublished = new Date();
        this.fbData.addPost(this.blogPost);
        this.onNoClick(false);
      } else {
        this.excerptRequired = true;
      }
    } else {
      this.titleRequired = true;
    }

  }
  createDraft() {
    if (this.blogPost.title && this.blogPost.title != "") {
      this.blogPost.author = this.data.author_id;
      this.blogPost.title_url = this.blogPost.title.toLowerCase().split(' ').join('_');
      this.blogPost.group = this.data.id;
      this.blogPost.draft = true;
      this.blogPost.datePublished = null;
      this.fbData.addPost(this.blogPost);
      this.onNoClick(false);
    } else {
      this.titleRequired = true;
    }
  }
  editPost(post: blogPost) {
    this.editablePost = post;
    this.isEditPane = true;
  }
  updateDraft() {
    if (this.editablePost.title && this.editablePost.title != "") {
      this.editablePost.author = this.data.author_id;
      this.editablePost.title_url = this.editablePost.title.toLowerCase().split(' ').join('_');
      this.editablePost.draft = true;
      this.fbData.updatePost(this.editablePost);
    } else {
      this.titleRequired = true;
    }
  }
  sendEdit() {
    if (this.editablePost.title && this.editablePost.title != "") {
      if (this.editablePost.excerpt && this.editablePost.excerpt != "") {
        this.editablePost.title_url = this.editablePost.title.toLowerCase().split(' ').join('_');
        this.editablePost.draft = false;
        this.fbData.updatePost(this.editablePost);
      } else {
        this.excerptRequired = true;
      }
    } else {
      this.titleRequired = true;
    }
  }   
  deletePost(post: blogPost) {

  }
}
