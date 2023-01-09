import { createReducer, on } from '@ngrx/store';
import { HrActions } from './hr.actions';

export interface HR {
    email: string,
    isSent: boolean,
    message: string,
    employeeList: any[],
}



export const initialState: HR = {
    email: '',
    isSent: false,
    message: '',
    employeeList: [],
}

const HrReducer = createReducer(
    initialState,
    on(HrActions.sendemailSuccess, (state, action) => {
        return {
            ...state,
            isSent: true,
        }
    }),

    on(HrActions.sendemailFail, (state, action: any) => {
        return {
            ...state,
            message: action.message
        }
    }),

    on(HrActions.getEmployeeListSuccess, (state: any, action: any) => {
        console.log(action.response.data);
        return {
            ...state,
            employeeList: action.response.data,
        }
    }),

    on(HrActions.getEmployeeListFail, (state, action: any) => {
        return {
            ...state,
            employeeList: []
        }
    })
)

export const hrReducer = (state: any, action: any) => {
    return HrReducer(state, action);
}