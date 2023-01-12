import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HrService } from 'src/app/services/hr.service';
import { selectAuthState, selectEmployee } from 'src/app/store/user/auth.selector';
import { BACKEND_URL } from 'src/app/utils/utils';
import { HrActions } from '../../store/hr/hr.actions';
import { employeeList } from '../../store/hr/hr.selector';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private store: Store<any>) { }

  public employee : any;

  employee$ = this.store.select(selectAuthState).subscribe((data) => {
    this.employee = data;
  });
  // public employee$ = this.store.select(selectEmployee);
  public employeeList$ = this.store.select(employeeList);
  public employeeListByCategory: any[] = [];
  public fileURL: string = '';
  public tab = 'onboarding';

  setTab(value: string) {
    this.tab = value;
  }

  emailInviteForm = this.fb.group({
    email: ['']
  });

  onSelectOnboardingApplicationList(status: string) {
    console.log(status);
    this.employeeList$.subscribe(employeeList => {
      this.employeeListByCategory = employeeList.filter(employee => employee.user.onboardingStatus == status);
    })
  }

  onInvite() {
    const { email } = this.emailInviteForm.getRawValue();
    console.log(email);

    this.store.dispatch(HrActions.sendemail({ email }));
    this.employeeList$.subscribe(employeeList => {
      this.employeeListByCategory = employeeList.filter(employee => employee.user.onboardingStatus == 'Pending');
    })
  }

  ngOnInit(): void {
    console.log('Current User:', this.employee);
    console.log(this.employee.isHR);
    if (this.employee.isHR == false) {
      this.router.navigateByUrl('/forbidden');
    } 
    else {
      this.store.dispatch(HrActions.getEmployeeList({ data: 'empty data' }));
      this.employeeList$.subscribe(employeeList => {
        // we want it to get all the employee in pending state always when first getting this page
        this.employeeListByCategory = employeeList.filter(employee => employee.user.onboardingStatus == 'Pending');
      })
    }
  }

}
