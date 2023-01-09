import {createActionGroup, props} from '@ngrx/store'

export const AuthActions = createActionGroup({
  source: "[Login Component] Login",
  events: {
    "Login": props<{ email: string, password: string }>(),
    "Login Success": props<{response: any}>(),
    "Login Failure": props<{error: string}>(),
    "Get Employee": props<{data: any}>()
  }
})