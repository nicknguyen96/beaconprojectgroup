import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HrActions } from 'src/app/store/hr/hr.actions';
import { employeeList } from 'src/app/store/hr/hr.selector';
import { Observable } from 'rxjs';
import { HrService } from 'src/app/services/hr.service';
import { FormBuilder } from '@angular/forms';

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
    private fb : FormBuilder) { }
  tab = 'inprocess';
  employeeList$: Observable<any>;

  setTab(tab: string) {
    if (this.tab == 'inprocess') {
      this.tab = 'all';
    } else {
      this.tab = 'inprocess';
    }
  }

  feedbackForm = this.fb.group({
    message: ['']
  });

  onSubmit(type: string, fileName: string, employeeid : string){
    const { message } = this.feedbackForm.getRawValue();
    console.log(type, fileName, employeeid, message);
  }

  getFile(fileName : string){
    this.HrService.getFile(fileName);
  }

  ngOnInit(): void {
    this.store.dispatch(HrActions.getEmployeeList({ data: 'getting data' }));
    this.employeeList$ = this.store.select(employeeList);
  }
}
