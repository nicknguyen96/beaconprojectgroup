import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { selectEmployee } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent {

  constructor(private router: Router, private authService: AuthService, private store: Store, private employeeService: EmployeeService, private onboardingService: OnboardingService) { }

  employee$ = this.store.select(selectEmployee);

  ngOnInit() {
    this.onboardingService.onboardingIntercepter();
    this.authService.getEmployee();
    if(!this.authService.userIsLoggedIn()) { 
      alert('You must be logged in to access this page!');
      this.router.navigateByUrl('/login');
    }
  }
}
