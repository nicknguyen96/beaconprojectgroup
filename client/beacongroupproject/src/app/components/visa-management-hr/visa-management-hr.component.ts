import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HrActions } from 'src/app/store/hr/hr.actions';
import { employeeList } from 'src/app/store/hr/hr.selector';
import { Observable } from 'rxjs';
import { HrService } from 'src/app/services/hr.service';
import { FormBuilder } from '@angular/forms';
import { selectAuthState } from 'src/app/store/user/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visa-management-hr',
  templateUrl: './visa-management-hr.component.html',
  styles: [
  ]
})
export class VisaManagementHrComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private HrService: HrService,
    private router: Router,
    private fb: FormBuilder) { }
  tab = 'inprocess';
  employeeList$: Observable<any>;
  public employee : any;

  employee$ = this.store.select(selectAuthState).subscribe((data) => {
    this.employee = data;
  });

  setTab(tab: string) {
    if (this.tab == tab) return;
    if (this.tab == 'inprocess') {
      this.tab = 'all';
    } else {
      this.tab = 'inprocess';
    }
  }

  feedbackForm = this.fb.group({
    message: ['']
  });

  onSubmit(type: string, fileName: string, employeeid: string) {
    const { message } = this.feedbackForm.getRawValue();
    console.log(type, fileName, employeeid, message);
  }

  getFile(fileName: string) {
    this.HrService.getFile(fileName);
  }

  ngOnInit(): void {
    console.log('Current User:', this.employee);
    console.log(this.employee.isHR);
    if (this.employee.isHR == false) {
      this.router.navigateByUrl('/forbidden');
    } 
    else {
      this.store.dispatch(HrActions.getEmployeeList({ data: 'getting data' }));
      this.employeeList$ = this.store.select(employeeList);
    }
  }

  sendNotification(email: string) {
    this.store.dispatch(HrActions.sendemail({ email }));
  }

  updateFileStatus(employeeid: string, fileName: string, status: string) {
    const { message } = this.feedbackForm.getRawValue();
    console.log(employeeid, fileName, message, status)
    this.store.dispatch(HrActions.updateFileStatus({ employeeid, fileName, message, status }))
  }
}
