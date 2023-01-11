import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEmployee, selectIsHR } from '../store/user/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private store: Store, private router: Router) {}

  isHR$ = this.store.select(selectIsHR) 

  checkIfHr() {
    this.isHR$.subscribe(hr => {
      if(!hr) {
        alert('Not an admin')
        return this.router.navigateByUrl('/')
      }
    })
  }


  checkIfEmployee() {
    this.isHR$.subscribe(hr => {
      if(hr) {
         
        alert("Not for hr")
        return this.router.navigateByUrl('/')
      }
    })
  }

  sendOnboarding() {
    
  }
}
 