import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  community: any = {};
  groupPassed: any = {}
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
      'imageUri': 'education.jpg',
      'sector': 'k to 5',
      'price':{
        'monthly':50,
        'quarterly':160,
        'sixmonthly':350,
        'fullPayment':650
      }
    },
    {
      'name': 'Signal Strength',
      'community': 'Education',
      'leader': 'Mark Beardly',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'business.jpg',
      'sector': 'Undergraduate',
      'price':{
        'monthly':50,
        'quarterly':160,
        'sixmonthly':350,
        'fullPayment':650
      }
    },
    {
      'name': 'Spanish Poetry EC',
      'community': 'Careers',
      'leader': 'Ellie Helmsley',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'careers.jpg',
      'sector': 'k to 5',
      'price':{
        'monthly':50,
        'quarterly':160,
        'sixmonthly':350,
        'fullPayment':650
      }
    },
    {
      'name': 'Basic Algebra',
      'community': 'Non-Profit',
      'leader': 'Sir 261',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'non-profit.jpg',
      'sector': 'k to 5',
      'price':{
        'monthly':50,
        'quarterly':160,
        'sixmonthly':350,
        'fullPayment':650
      }
    },
    {
      'name': 'Camping 101',
      'community': 'Finance',
      'leader': 'Obi Wan Kenobi',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'finance.jpg',
      'sector': 'k to 5',
      'price':{
        'monthly':50,
        'quarterly':160,
        'sixmonthly':350,
        'fullPayment':650
      }
    },
    {
      'name': 'Investment Strategies',
      'community': 'Government',
      'leader': 'Peter Griffin',
      'date': 'May 15, 2018',
      'description': 'This is a community for doing this and this and that for the betterment of this and this and that. You should join!',
      'imageUri': 'government.jpg',
      'sector': 'postgraduate',
      'price':{
        'monthly':50,
        'quarterly':160,
        'sixmonthly':350,
        'fullPayment':650
      }
    }
  ]
}
