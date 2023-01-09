import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { BACKEND_URL } from '../utils/utils';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/user/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private store: Store) { }

  login(email: string, password: string) {
    return this.http.post(`${BACKEND_URL}/auth/login`, {email, password}).pipe(
      tap((data) => {
        this.store.dispatch(AuthActions.login({email, password}));
      })
    )
  } 

  getEmployee() {
    let token = localStorage.getItem('token')
    let employee =  JSON.parse(localStorage.getItem('employee'))
    let isHR = localStorage.getItem('isHR')
    const data = {
      token, employee, isHR
    }
    this.store.dispatch(AuthActions.getEmployee({data}))
  }
}