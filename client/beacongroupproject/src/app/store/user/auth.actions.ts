import { createActionGroup, props } from '@ngrx/store'

export const AuthActions = createActionGroup({
  source: "[Employee Component] Employee",
  events: {
    "Login": props<{ email: string, password: string }>(),
    "Login Success": props<{ response: any }>(),
    "Login Failure": props<{ error: string }>(),
    "Get Employee": props<{ data: any }>(),
    "Logout": props<{ response: any }>(),
    "Logout Success": props<{ response: any }>(),
    "Logout Failure": props<{ error: any }>(),

    "upload file": props<{ form : FormData }>(),
    "upload file Success": props<{ response : any }>(),
    "upload file Fail": props<{ response: any }>(),
  }
})