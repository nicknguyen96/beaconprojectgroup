import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { HrActions } from 'src/app/store/hr/hr.actions';
import { selectEmployee } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store, private employeeService: EmployeeService) {}

  employee$ = this.store.select(selectEmployee);

  ngOnInit() {
    this.authService.getEmployee();
  }

  emailInviteForm = new FormBuilder().group({
    email: ''
  });

  public onInvite(): void {
    const { email } = this.emailInviteForm.getRawValue();
    console.log(email);
    
    this.store.dispatch(HrActions.getHousingList({data: 'empty list'}));
    
  }
  
}
