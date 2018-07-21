import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreak'
})
export class LinebreakPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace('10','<br>');
  }

}
