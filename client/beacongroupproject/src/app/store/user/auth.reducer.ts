import { createReducer, on } from '@ngrx/store'
import { AuthActions } from './auth.actions'

export interface Employee {
  token: string | boolean
  isHR: boolean,
  employee: any,
  loginError?: string
}


export const initialState: Employee = {
  token: false,
  isHR: false,
  employee: false,
  loginError: '',
}

const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { response }): Employee => {
    return {
      ...state,
      token: response.token,
      isHR: response.isHR,
      employee: response.employee
    }
  }),
  on(AuthActions.loginFailure, (state, { error }): Employee => {
    return {
      ...state,
      loginError: error,
      token: false,
      isHR: false,
      employee: false,
    }
  }),
  on(AuthActions.getEmployee, (state, { data }): Employee => {
    return {
      ...state,
      token: data.token,
      isHR: data.isHR,
      employee: data.employee

    }
  }),
  on(AuthActions.logoutSuccess, (state: any, action: any): Employee => {
    return {
      ...state,
      token: false,
      isHR: false,
      employee: null
    }
  }),

  on(AuthActions.uploadFileSuccess, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.employee.details = action.response.data;
    const newEmployee = JSON.parse(localStorage.getItem('employee'));
    newEmployee.details = action.response.data;
    localStorage.setItem('employee', JSON.stringify(newEmployee))
    return newState;
  }),

)
export const authReducer = (state: Employee, action) => {
  return AuthReducer(state, action)
}