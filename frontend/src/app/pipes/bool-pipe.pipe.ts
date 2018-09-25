import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolPipe'
})
export class BoolPipePipe implements PipeTransform {

  transform(items: any, booly: any, param: any): any {
    if (items === undefined) return items;
    return items.filter(function (item) {
      return item[param] == booly;
    })
  }

}
