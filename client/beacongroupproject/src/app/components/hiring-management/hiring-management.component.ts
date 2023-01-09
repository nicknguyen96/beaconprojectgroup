import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HrService } from 'src/app/services/hr.service';
import { HrActions } from '../../store/hr/hr.actions';
import { employeeList } from '../../store/hr/hr.selector';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<any>, private hrService: HrService) { }

  employeeList$ = this.store.select(employeeList);

  employeeListByCategory : any[] = [];

  tab = 'onboarding';

  setTab(value: string) {
    this.tab = value;
  }

  emailInviteForm = this.fb.group({
    email: ['']
  });

  onSelectOnboardingApplicationList(status: string){
    console.log(status);
    this.employeeList$.subscribe(employeeList => {
      this.employeeListByCategory = employeeList.filter(employee => employee.user.onboardingStatus == status);
    })
  }

  onInvite() {
    const { email } = this.emailInviteForm.getRawValue();
    console.log(email);

    this.store.dispatch(HrActions.sendemail({ email }));

  }

  ngOnInit(): void {
    this.store.dispatch(HrActions.getEmployeeList({ data: 'empty data' }));
    this.employeeList$.subscribe(employeeList => {
      // we want it to get all the employee in pending state always when first getting this page
      this.employeeListByCategory = employeeList.filter(employee => employee.user.onboardingStatus == 'Pending');
    })
  }

}
