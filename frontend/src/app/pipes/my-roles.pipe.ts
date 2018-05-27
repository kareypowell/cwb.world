import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myRole'
})
export class MyRolesPipe implements PipeTransform {

  transform(value: any, roles:any): any {
    return value.filter(function(item){
      if(roles[item]['viewValue']){ // get actual parameter instead of viewValue as a string
        return true
      }
      //return item.viewValue.toLowerCase().includes(user.roles.value);
    })
  }

}
