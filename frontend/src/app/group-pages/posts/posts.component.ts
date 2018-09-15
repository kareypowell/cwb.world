import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../auth-service';
import { User, Group, blogPost } from '../../interfaces/member';
import { ActivatedRoute } from '@angular/router';
import { FirebaseDataService } from '../../firebase-data.service';
import { BloggerComponent } from '../../dialog-components/blogger/blogger.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  user: User;
  group: Group;
  id:string = "";
  posts: blogPost[];
  showCreatePost: boolean = false;
  constructor(public dialog: MatDialog,  private auth: AuthService, private route: ActivatedRoute, private fbData: FirebaseDataService) { }

  ngOnInit() {
    /*
    if(this.route.snapshot.params['id']){
      this.id = this.route.snapshot.params['id'];
    }
    */
    this.id = this.route.parent.parent.snapshot.params['id'];
    this.fbData.getSpecificGroup(this.id).subscribe(data =>{
      this.group = data;
      this.auth.user$.subscribe(data => {
        this.user = data;
        if(this.user){
          if(this.user.uid === this.group.groupLead){
            this.showCreatePost = true;
          }
        }
      });
      this.fbData.getAllPostsInGroup(this.id).subscribe(data => {
        this.posts = data;
        this.posts.forEach(post => {
          let stub = post.body.match("<img(.*)>");
          if(stub){
            post.thumbnailImg = "<img " + stub[1] + " >";
          }else{
            post.thumbnailImg = '<img src=".././../../assets/images/cwb-logo.png" alt="post thumbnail" class="full-width">'
          }
        })
      });
      
      /*
      if(this.group.homePage){
        this.homePageContent = this._sanitizer.bypassSecurityTrustHtml(this.group.homePage);
        this.showDefault = false;
      }else{
        this.showDefault = true;
      }*/
    })
  }

  createPost(): void {

    let dialogRef = this.dialog.open(BloggerComponent, {
      width: '99%',
      data: { id: this.id, grp: this.group, author_id: this.user.uid}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

}
