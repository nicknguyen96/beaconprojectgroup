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
        this.router.navigate(['/'])
      }
      console.log(employee)
      console.log(employee?.details?.onboardingStatus);
      console.log(!(employee?.details?.onboardingStatus == "Approved"));
      console.log('EMPLOYEE APP STATUS:', employee?.details?.onboardingStatus);
      if((employee?.details?.onboardingStatus == "Never submitted")) {
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
        this.router.navigate(['/login'])
      }
      console.log(employee)
      if(employee.details.onboardingStatus != "Never submitted") {
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

  
  onboardingUploadFile(event : any, fileType : string): void {
      if (event.target.files && event.target.files[0]) {
          const selectedFile: File = event.target.files[0];
          
          const form = new FormData();

          let employee: any; 
          this.employee$.subscribe(data => {
            employee = data
          })
  
          form.append('image', selectedFile, `${fileType}-${employee.email}`);
          form.append('employeeid', employee.id);
          console.log(form);
  
          form.forEach(img => {
            console.log(img);
          })
  
          this.http.put(`${BACKEND_URL}/user/uploadFile`, form)
          .subscribe(res => {
            console.log(res)
          })
        }
      
  }

}