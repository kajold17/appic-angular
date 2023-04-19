import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(searchValue: string, employeeMasterList: any[]): any[] {
    return employeeMasterList.filter(employee => employee.employee_name.toLowerCase().includes(searchValue.toLowerCase()))
  }
}
