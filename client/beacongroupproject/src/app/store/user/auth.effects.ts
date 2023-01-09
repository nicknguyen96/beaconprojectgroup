import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'

import { catchError, of, exhaustMap, map, tap, switchMap, Observable, mergeMap, EMPTY } from 'rxjs'

import { AuthService } from 'src/app/services/auth.service'
import { AuthActions } from './auth.actions'

@Injectable()

export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password)
          .pipe(
          map((response: any) => AuthActions.loginSuccess({response}),
          catchError(error => of(AuthActions.loginFailure({error})))
        )
      )
    ))
  );

  loginSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(({response}) => {
      // saving the user in local storage
      localStorage.setItem('token', JSON.stringify(response.token))
      localStorage.setItem('employee', JSON.stringify(response.employee))
      localStorage.setItem('isHR', JSON.stringify(response.isHR))
      alert('Successfully logged in' + response.employee.fistName)
      this.router.navigateByUrl('/')
    })
    ), {dispatch: false}
  )
  

  loginFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({error}) => {
        alert('Couldnt sign in' + error)
      })
    ),
    {dispatch: false}
  )

  // getEmployee$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.getEmployee),
  //       exhaustMap(async (response) => this.authService.getEmployee(response)))
  //       .pipe(
  //         map((response: any) => AuthActions.getEmployeeSuccess({response})),
  //         catchError((error) => of(AuthActions.getEmployeeFailure(error)))
  //       )
  // )


  // // // we want to get the local storage first before we can began
  // getEmployeeSuccess$ = createEffect(() =>
  //         this.actions$.pipe(
  //           ofType(AuthActions.getEmployeeSuccess),
  //           tap(() => {
  //             this.router.navigateByUrl('/')
  //           })
  //      ), {
  //       dispatch: false
  //      }
  // )
  
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}

