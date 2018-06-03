import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FirebaseDataService } from '../../firebase-data.service';
import { Group, GrpMember } from '../../interfaces/member';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  createGroupForm: FormGroup;
  allGroups:Group[];

  constructor(private _formBuilder: FormBuilder, private fbData: FirebaseDataService) { }

  filteredDuration: Observable<string[]>;
  myControl: FormControl = new FormControl();
  private subs;

  ngOnInit() {
    this.filteredDuration = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
      this.subs = this.fbData.getGroups().subscribe(data=>this.allGroups = data);

      this.createGroupForm = this._formBuilder.group({
        grpName: ['',Validators.required],
        description: ['',Validators.required],
        bio: ['',Validators.required],
        whatToExpect: ['',Validators.required],
        duration: ['', Validators.required],
        streetAdd: ['',Validators.required],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zip: ['',Validators.required],
        email: ['',[Validators.required, Validators.email]],
        profilePublic: ['']
      });
  }

  options = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight'
  ];

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
  newGroup:Group;
  newMember:GrpMember;
  createGroup(){
    this.newMember = {};
    this.newGroup = {};
    this.newGroup.title = this.createGroupForm.value.grpName;
    this.newMember.uid = "34ggfbbr4";
    console.log(this.newMember);
    //this.newGroup.members.push(this.newMember);
    //this.fbData.addGroup(this.newGroup);
  }
}
