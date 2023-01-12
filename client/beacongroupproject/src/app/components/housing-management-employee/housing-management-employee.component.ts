import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HousingActions } from 'src/app/store/housing/housing.actions';
import { selectHousing } from 'src/app/store/housing/housing.selector';
import { selectEmployee } from '../../store/user/auth.selector'

@Component({
  selector: 'app-housing-management-employee',
  templateUrl: './housing-management-employee.component.html',
  styleUrls: ['./housing-management-employee.component.scss']
})
export class HousingManagementEmployeeComponent implements OnInit {
  constructor(private store: Store, private fb: FormBuilder) { }

  employee$: Observable<any>;
  houseid: string = '';
  house$: Observable<any>;

  tab: string = 'detail';

  setTab(tab: string) {
    if (!(tab == this.tab)) {
      this.tab = (this.tab == 'detail' ? 'report' : 'detail');
    }
  }

  reportForm = this.fb.group({
    title: [''],
    description: ['']
  })

  saveReport() {
    const { title, description } = this.reportForm.getRawValue();
    console.log(title, description);
    this.store.dispatch(HousingActions.createReport({ title, description, houseid: this.houseid }));
  }

  ngOnInit(): void {
    this.house$ = this.store.select(selectHousing);
    this.employee$ = this.store.select(selectEmployee);
    this.store.select(selectEmployee).subscribe(employee => {
      this.houseid = employee.details.housing
      this.store.dispatch(HousingActions.gethouse({ houseid: employee.details.housing }))
    });
  }
}
