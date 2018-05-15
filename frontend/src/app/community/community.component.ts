import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
//import { GroupFilterPipe } from '../group-filter.pipe';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  constructor(private data:DataTransferService) { }
  community: any =  this.data.community;
  
  ngOnInit() {
  }
  
  groups = [
    {
      'name': 'Code for me',
      'community': 'Education',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'education.jpg'
    },
    {
      'name': 'Signal Strength',
      'community': 'Education',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'business.jpg'
    },
    {
      'name': 'Code for me',
      'community': 'Careers',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'careers.jpg'
    },
    {
      'name': 'Code for me',
      'community': 'Non-Profit',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'non-profit.jpg'
    },
    {
      'name': 'Code for me',
      'community': 'Finance',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'finance.jpg'
    },
    {
      'name': 'Code for me',
      'community': 'Government',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'government.jpg'
    }
  ]

  setGroup(grp){
    
  }
}
