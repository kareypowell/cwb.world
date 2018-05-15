import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupFilter',
  pure: false
})
export class GroupFilterPipe implements PipeTransform {
  transform(groups: any[], filter: any): any {
    if (!groups || !filter) {
      return groups;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return groups.filter(group => group.community.indexOf(filter.community) !== -1);
  }
}