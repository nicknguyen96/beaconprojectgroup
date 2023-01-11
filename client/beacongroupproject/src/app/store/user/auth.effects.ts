import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, of, exhaustMap, map, tap, switchMap, Observable, mergeMap, EMPTY, exhaust } from 'rxjs'

import { AuthService } from 'src/app/services/auth.service'
import { AuthActions } from './auth.actions'
import { OnboardingService } from 'src/app/services/onboarding.service'

@Injectable()

export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password)
          .pipe(
            map((response: any) => {
              console.log(response);
              console.log(response.status);
              if (response.status == 200) {
                return AuthActions.loginSuccess({ response });
              }
              else {
                return AuthActions.loginFailure({ error: response.message });
              }
            },
              catchError(error => of(AuthActions.loginFailure({ error }))))
          )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ response }) => {
        // saving the user in local storage
        console.log(response);
        localStorage.setItem('token', response.token)
        localStorage.setItem('employee', JSON.stringify(response.employee))
        localStorage.setItem('isHR', response.isHR)

        alert('Successfully logged in' + response.employee.email)
        if (response.isHR == true || response.isHR == 'true') {
          this.router.navigateByUrl('/hr/visaManagement')
        } else {
          this.router.navigateByUrl('/employee')
        }
      })
    ), { dispatch: false }
  )


  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => {
        alert('Invalid username and/or password.');
      })
    ),
    { dispatch: false }
  )

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap((action) => {
        return this.authService.logOut().pipe(
          map((data: any) => {
            console.log(data);
            if (data?.status == 200) {
              this.deleteLocal();
              return AuthActions.logoutSuccess({ response: "something right" });
            } else {
              return AuthActions.logoutFailure({ error: "something wrong" });
            }
          })
        )
      })
    )
  })
  
  deleteLocal() {
    localStorage.removeItem('employee')
    localStorage.removeItem('isHR')
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private onboardingService: OnboardingService,
  ) { }
}
