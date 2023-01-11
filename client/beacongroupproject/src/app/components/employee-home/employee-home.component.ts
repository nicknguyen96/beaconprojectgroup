import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { selectEmployee } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent {

  constructor(private authService: AuthService, private store: Store, private employeeService: EmployeeService) {}
  
  employee$ = this.store.select(selectEmployee);

    ngOnInit() {
    this.authService.getEmployee();
    this.authService.userIsLoggedIn();
  }
}
