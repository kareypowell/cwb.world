import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchVal: any,parameter:any): any {
    if (searchVal === undefined || searchVal ==="" || searchVal=="all") return items;
	
	return items.filter(function(item){
		return item[parameter].toLowerCase().includes(searchVal.toLowerCase());
  })
  }

}
