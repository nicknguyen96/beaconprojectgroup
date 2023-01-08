import { Injectable } from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { catchError, of, exhaustMap, map } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { AuthActions } from './auth.actions'

@Injectable()

export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map((response: any) => AuthActions.loginSuccess(response),
          catchError(error => of(AuthActions.loginFailure(error)))
        )
      )
    ))
  );
 
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}

