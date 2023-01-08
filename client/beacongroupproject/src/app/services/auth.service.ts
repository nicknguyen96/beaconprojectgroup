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
      tap((data: any) => {
        // 
        const stringifiedToken: string = JSON.stringify(data.token)
        const stringfiedEmployee: string = JSON.stringify(data.employee)
        localStorage.setItem('token', stringifiedToken)
        localStorage.setItem('employee', stringfiedEmployee)
        this.store.dispatch(AuthActions.loginSuccess(data)), catchError(data => 
        data.status)
      }))}
}
