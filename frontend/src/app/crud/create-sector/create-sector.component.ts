import { Component, OnInit } from '@angular/core';
import { Sector, Community, User, Group } from '../../interfaces/member';
import { FirebaseDataService } from '../../firebase-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.css']
})
export class CreateSectorComponent implements OnInit {

  constructor(private fbData:FirebaseDataService,private _formBuilder: FormBuilder) { }

  newSector:Sector = {};
  createSectorForm: FormGroup;
  private sub;

  ngOnInit() {
    this.createSectorForm = this._formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      bio: ['',Validators.required],
      whatToExpect: ['',Validators.required],
      duration: ['', Validators.required],
      searchString: ''
    });
  }
  createSector(){
    this.newSector.name = this.createSectorForm.value.name;
    this.newSector.description = this.createSectorForm.value.description;
    this.newSector.bio = this.createSectorForm.value.bio;
    this.newSector.whatToExpect = this.createSectorForm.value.whatToExpect;
    this.fbData.addSector(this.newSector);
  }

  commSearch:Community[];
  groupSearch:Group[];
  offset = new Subject<string>();
  results: Observable<any[]>;


  searchVal:string;
  lastKeypress: number = 0;

  search($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      //console.log(this.createSectorForm.value.searchString);
      this.fbData.searchCollection(String(this.createSectorForm.value.searchString),"groups","titleToLower",2).subscribe(data => this.groupSearch = data);
    }
    this.lastKeypress = $event.timeStamp;
    
  }
}
