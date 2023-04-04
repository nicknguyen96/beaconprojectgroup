import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, of, exhaustMap, map, tap, timeout} from 'rxjs'

import { AuthService } from 'src/app/services/auth.service'
import { AuthActions } from './auth.actions'
import { EmployeeService } from 'src/app/services/employee.service'
import { loadingAction } from '../loading/loading.action'

@Injectable()

export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password)
          .pipe(
            map((response: any) => {
              if (response.status == 200) {
                return AuthActions.loginSuccess({ response })
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
      map(({ response }) => {
        // saving the user in local storage
        localStorage.setItem('token', response.token)
        localStorage.setItem('employee', JSON.stringify(response.employee))
        localStorage.setItem('isHR', response.isHR)

        if (response.isHR == true || response.isHR == 'true') {
          this.router.navigateByUrl('/hr/hiringManagement')
        } else {
          this.router.navigateByUrl('/employee')
        }
        return loadingAction.doneLoading();
      })
    )
  )


  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      map(({ error }) => {
        alert('Invalid username and/or password.');
        return loadingAction.doneLoading();
      })
    )
  )

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap((action) => {
        return this.authService.logOut().pipe(
          map((data: any) => {
            if (data?.status == 200) {
              this.deleteLocal();
              this.router.navigateByUrl['/login'];
              return AuthActions.logoutSuccess({ response: "logged out successfully." });
            } else {
              return AuthActions.logoutFailure({ error: "something went wrong with logging you out." });
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

  uploadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.uploadFile),
      exhaustMap((action) => {
        return this.employeeService.uploadFile(action.form).pipe(
          map((response: any) => {
            if (response.status == 200) {
              return AuthActions.uploadFileSuccess({ response });
            } else {
              return AuthActions.uploadFileFail({ response });
            }
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService,
  ) { }
}
