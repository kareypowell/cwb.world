import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  community: any = {};
  constructor() { }
  groups = [
    {
      'name': 'More to Story EC',
      'community': 'Education',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': "Explore the ideas and inspiration behind of your favorite books as you connect with authors,\
      illustrators, and champions\
      of children’s, middle grade,\
      and young adult books.\
      As readers, know there’s\
      always more to the story.\
        Here’s your chance to\
      find out!",
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
      'name': 'Spanish Poetry EC',
      'community': 'Careers',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'careers.jpg'
    },
    {
      'name': 'Basic Algebra',
      'community': 'Non-Profit',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'non-profit.jpg'
    },
    {
      'name': 'Camping 101',
      'community': 'Finance',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'finance.jpg'
    },
    {
      'name': 'Investment Strategies',
      'community': 'Government',
      'leader': 'Donovan',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'government.jpg'
    }
  ]
}
