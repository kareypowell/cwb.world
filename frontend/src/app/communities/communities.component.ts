import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent implements OnInit {

  constructor(private data:DataTransferService) { }
  communities = [
    {
      'name': 'Education',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'education.jpg'
    },
    {
      'name': 'Business',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'business.jpg'
    },
    {
      'name': 'Careers',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'careers.jpg'
    },
    {
      'name': 'Non-Profit',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'non-profit.jpg'
    },
    {
      'name': 'Finance',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'finance.jpg'
    },
    {
      'name': 'Government',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'government.jpg'
    }
  ]
  ngOnInit() {
  }

  setCommunity(comm){
    this.data.community = comm;
  }
}
