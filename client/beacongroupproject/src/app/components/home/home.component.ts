import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { HrActions } from 'src/app/store/hr/hr.actions';
import { selectAuthState } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private store: Store, private employeeService: EmployeeService) {}

  employee : any;

  employee$ = this.store.select(selectAuthState).subscribe((data) => {
    this.employee = data;
  });

  ngOnInit() {
    this.authService.getEmployee();
    if (this.authService.userIsLoggedIn()) {
      if (this.employee.isHR == false) {
        this.router.navigateByUrl('/employee');
      }
      else {
        this.router.navigateByUrl('/hr/hiringManagement');
      }
    }
  }

  
}
