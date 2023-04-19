import { Component, Input, OnInit } from '@angular/core';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  public employeeData: any[] = [];  // will store original employee data
  public filteredEmployeeData: any[] = [];  // will store filtered results
  public tableHeaders: string[] = []; // list of table headers
  public ageDropdown: string[] = [];  // list of age dropdown options
  public sortingOrder: number = 0;
  public selectedAgeRange: string = '';
  public searchTerm: string = '';
  private searchPipe = new SearchPipe();

  constructor() { }
  
  ngOnInit(): void {
    this.filteredEmployeeData = this.employeeData;
    this.getDataInsights(this.filteredEmployeeData);
  }

  /**
   * Sorts Employee data based on employee_salary
   * @param sortOrder Order of sorting asc, des etc
   */

  public sortEmployeeData(sortOrder: number) {
    this.sortingOrder = sortOrder;
    // Changing sorting direction everytime
    if(sortOrder == 0) {
      // No sorting
      this.filteredEmployeeData = this.filteredEmployeeData.sort((employeeOne, employeeTwo) => employeeOne.id - employeeTwo.id)
    } else if(sortOrder == 1) {
      // Ascending sort
      this.filteredEmployeeData = this.filteredEmployeeData.sort((employeeOne, employeeTwo) => employeeOne.employee_salary - employeeTwo.employee_salary)
    } else {
      // Descending sort
      this.filteredEmployeeData = this.filteredEmployeeData.sort((employeeOne, employeeTwo) => employeeTwo.employee_salary - employeeOne.employee_salary)
    }
  }

  /**
   * Extracts relevant display information from the original data list header list, age drop down options etc
   * @param employeeData original employee data
   */
  private getDataInsights(employeeData: any[]) {
    if(employeeData && employeeData.length > 0) {
      // Assumes that all objects have all keys in common
      this.tableHeaders = Object.keys(employeeData[0])
    }

    // Calculating age dropdown options
    let maxAge = Math.max(...employeeData.map(employee => employee.employee_age))
    let startingAge = 0;
    while(startingAge < maxAge) {
      this.ageDropdown.push(`${startingAge}-${startingAge+20}`);
      startingAge = startingAge + 20;
    }
  }

  /**
   * Filters the employees based on the dropdown value of age selected
   */
  public filterByAge() {
    const ageRange = this.selectedAgeRange;
    if(!ageRange) {
      // If age range value is empty
      this.filteredEmployeeData = this.employeeData;
    } else {
      const [minimumAge, maximumAge] = ageRange.split('-');
      this.filteredEmployeeData = this.employeeData.filter((employee) => employee.employee_age > minimumAge && employee.employee_age <= maximumAge);
    }
    // Resetting the search term after a new filter selection
    this.searchTerm = '';
  }

  /**
   * Searches and employee from the masterlist
   */
  
  public searchEmployee() {
    this.selectedAgeRange = '';
    this.filteredEmployeeData = this.searchPipe.transform(this.searchTerm, this.employeeData);
  }
}
