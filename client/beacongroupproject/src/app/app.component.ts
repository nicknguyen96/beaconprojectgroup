import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';
import { OnboardingService } from './services/onboarding.service';
import { AuthActions } from './store/user/auth.actions';
import { selectAuthState, selectEmployee, selectToken } from './store/user/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store, private employeeService: EmployeeService) { }
  title = 'beacongroupproject';

  employee : any;

  employee$ = this.store.select(selectAuthState).subscribe((data) => {
    console.log(data);
    this.employee = data;
  });

  logout() {
    const response: any = {
      state: false
    }
    this.store.dispatch(AuthActions.logout(response))
  }

  ngOnInit() {
    this.authService.getEmployee()
    // this.authService.userIsLoggedIn()
  }
}