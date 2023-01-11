import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { employeeList } from '../../store/hr/hr.selector';
import { HrActions } from '../../store/hr/hr.actions';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/app/utils/utils';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-onboarding-detail-page',
  templateUrl: './onboarding-detail-page.component.html',
  styleUrls: ['./onboarding-detail-page.component.scss']
})
export class OnboardingDetailPageComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb : FormBuilder) { }

  employeeList$ = this.store.select(employeeList);

  employee: any;

  employeeid = this.route.snapshot.paramMap.get('employeeid');

  fileURL: string = '';

  reviewFile(fileName: string) {
    console.log(fileName);
    this.http.get(`${BACKEND_URL}/user/getFile/${fileName}`).subscribe((data: any) => {
      console.log(data);
      if (data.status === 200) {
        window.open(data.data, "_blank")
      } else {
        alert("Something wrong when getting this file")
      }
    })
  }

  feedbackForm = this.fb.group({
    message: ['']
  });

  onSubmit(type: string){
    const { message } = this.feedbackForm.getRawValue();
    this.store.dispatch(HrActions.updateOnboardingStatus({onboardingStatus: type, employeeid: this.employeeid, message}));
    
  }

  ngOnInit(): void {
    this.store.dispatch(HrActions.getEmployeeList({ data: 'empty data' }));
    this.employeeList$.subscribe(employeeList => {
      this.employee = (employeeList.find(employee => employee._id === this.employeeid));
    })
  }
}
