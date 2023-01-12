import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectEmployee } from '../store/user/auth.selector';
import { BACKEND_URL } from '../utils/utils';
import { AuthActions } from '../store/user/auth.actions';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private store: Store, private router: Router, private http: HttpClient) { }

  employee$ = this.store.select(selectEmployee)


  onboardingIntercepter() {
    const token = localStorage.getItem('token')
    this.employee$.subscribe(employee => {
      if(!token) {
        alert('Please login before entering this page')
        this.router.navigate(['/'])
      }
      console.log(employee)
      console.log(employee?.details?.onboardingStatus)
      console.log(!(employee?.details?.onboardingStatus == "Approved"))
      if(!(employee?.details?.onboardingStatus == "Approved")) {
        // /* Redirecting the user to the onboarding page if the user is not onboarded. */
        this.router.navigate(['/employee/boarding'])
      }
    })
  } 

  // use in onboarding component to check if employee onboarding status is approved or not then move to employee main page if yes else stay
  onboardingApprove() {
    const token = localStorage.getItem('token')
    this.employee$.subscribe(employee => {
      if(!token) {
        alert('Please login before entering this page')
        this.router.navigate(['/login'])
      }
      console.log(employee)
      if(employee.details.onboardingStatus === "Approved") {
        // /* Redirecting the user to the onboarding page if the user is not onboarded. */
        this.router.navigate(['/employee']);
      }
    })
  }

  onboardingSubmit(employeeDetails: any): any {
    let employeeDetailsId: string;
    let employeeDetail: any; 
    this.store.select(selectEmployee).subscribe(employee => {
      employeeDetailsId = employee.details._id
      employeeDetail = employee.details
    })

    if(!employeeDetailsId) {
      return alert('Not logged in')
    }

    const employee: any = {
      employeeDetails,
      employeeDetailsId,
    }
      return this.http.put(`${BACKEND_URL}/user/updateDetails`,  employee )
  }

}