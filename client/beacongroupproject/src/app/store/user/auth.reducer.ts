import {createReducer, on} from '@ngrx/store'
import { AuthActions } from './auth.actions' 

interface User {
  token: string | null 
  isHR: boolean,
  employee: object
  loginError?: string
}


export const initialState: User = {
  token: null,
  isHR: false,
  employee: {},
  loginError: '',
}

const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { Response }): any => {
    return {
      ...state,
      token: Response.token,
      isHr: Response.isHR,
      userid: Response.userid
    }
  }),
  on(AuthActions.loginFailure, (state, {error}): any => {
    return {
      ...state,
      loginError: error,
      token: null,
      userid: null,
      isHR: false,
    }
  })
)

export const authReducer = (state: User, action) => {
  return AuthReducer(state, action)
}