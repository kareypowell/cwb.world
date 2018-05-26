import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private data: DataTransferService) { }

  ngOnInit() {
  }

  searchVal = "";
  communities = [
    {value: 'education', viewValue: 'Education'},
    {value: 'careers', viewValue: 'Careers'},
    {value: 'business', viewValue: 'Business'},
    {value: 'non-profit', viewValue: 'Non-Profit'},
    {value: 'wellness', viewValue: 'Wellness'},
    {value: 'government', viewValue: 'Government'},
    {value: 'art-and-entertainment', viewValue: 'Art and Entertainment'},
    {value: 'investment', viewValue: 'Investment'},
    {value: 'hollywood', viewValue: 'Hollywood'}
  ];
  sectors = [
    {value: 'pre-k', viewValue: 'Pre K'},
    {value: 'k-5-grade', viewValue: 'K - 5th Grade'},
    {value: '5-8-grade', viewValue: '5th Grade - 8th Grade'},
    {value: 'high-school', viewValue: 'High School'},
    {value: 'undergrad', viewValue: 'Undergraduate'},
    {value: 'postgrad', viewValue: 'Postgraduate'}
  ];

  groups = this.data.groups;
  currentGroup = this.groups[0];
  displayGroupInfo(grp){
    this.currentGroup = grp;
  }
}
