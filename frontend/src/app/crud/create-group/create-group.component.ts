import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  createGroupForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }
  filteredDuration: Observable<string[]>;
  myControl: FormControl = new FormControl();
  ngOnInit() {
    this.filteredDuration = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );

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
  createGroup(){
    console.log(this.createGroupForm.value)
    console.log(this.myControl.value);
  }
}
