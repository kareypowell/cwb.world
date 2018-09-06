import { Component, OnInit, SecurityContext  } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FirebaseDataService } from '../../firebase-data.service';
import { Group, User } from '../../interfaces/member';
import { MatDialog } from '@angular/material';
import { DesignGroupHomepageComponent } from '../../dialog-components/design-group-homepage/design-group-homepage.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css']
})
export class GroupHomeComponent implements OnInit {
  id: string = "";
  group: Group;
  homePageContent: any = "";
  showEditHomePage: boolean = false;
  user: User;
  showDefault: boolean = false;

  constructor(private _sanitizer: DomSanitizer,private route: ActivatedRoute, private fbData: FirebaseDataService, public dialog: MatDialog,  private auth: AuthService) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.id = this.route.snapshot.params['id'];
    }
    this.fbData.getSpecificGroup(this.id).subscribe(data =>{
      this.group = data;
      this.auth.user$.subscribe(data => {
        this.user = data;
        if(this.user){
          if(this.user.uid === this.group.groupLead){
            this.showEditHomePage = true;
          }
        }
      });
      
      if(this.group.homePage){
        this.homePageContent = this._sanitizer.bypassSecurityTrustHtml(this.group.homePage);
        this.showDefault = false;
      }else{
        this.showDefault = true;
      }
    })
  }

  openDialog(): void {

    let dialogRef = this.dialog.open(DesignGroupHomepageComponent, {
      width: '99%',
      data: { id: this.id, grp: this.group}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

}
