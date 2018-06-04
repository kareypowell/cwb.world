import { Component, OnInit } from '@angular/core';
import { Sector, Community } from '../../interfaces/member';
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
      searchString: [10,Validators.required]
    });
  }
  createSector(){
    this.newSector.name = this.createSectorForm.value.name;
    this.newSector.description = this.createSectorForm.value.description;
    this.newSector.bio = this.createSectorForm.value.bio;
    this.newSector.whatToExpect = this.createSectorForm.value.whatToExpect;
    this.fbData.addSector(this.newSector);
  }

  commSearch:Observable<Community>;
  offset = new Subject<string>();
  results: Observable<any[]>;

  onkeyup(e) {
    this.offset.next(e.target.value.toLowerCase());
    this.search();
  }
  
  search(){
    //this.results = this.fbData.getCommunity(this.offset);
    this.fbData.getCommunity(String(this.createSectorForm.value.searchString)).subscribe(data => console.log(data));
  }
}
