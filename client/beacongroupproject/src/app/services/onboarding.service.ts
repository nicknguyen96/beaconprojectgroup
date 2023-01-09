import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEmployee } from '../store/user/user.selector';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private store: Store, private router: Router) { }

  employee$ = this.store.select(selectEmployee)


  onboardingIntercepter() {
    const token = localStorage.getItem('token')
    this.employee$.subscribe(employee => {
      if(!token) {
        alert('Please login before entering this page')
        return this.router.navigateByUrl('/')
      }
      if(!employee.info || employee.info.onboardingStatus !== "Aprroved") {
        // /* Redirecting the user to the onboarding page if the user is not onboarded. */
        return this.router.navigateByUrl('/employee/boardingPage')
      }
    })
  }
s

}