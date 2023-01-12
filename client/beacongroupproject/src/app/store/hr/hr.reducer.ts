import { createReducer, on } from '@ngrx/store';
import { HrActions } from './hr.actions';
import { employeeList } from './hr.selector';

export interface HR {
    email: string,
    isSent: boolean,
    message: string,
    employeeList: any[],
    housingList: any[]
}



export const initialState: HR = {
    email: '',
    isSent: false,
    message: '',
    employeeList: [],
    housingList: []
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
    }),

    on(HrActions.updateOnboardingStatusSuccess, (state, action: any) => {
        let newEmployeeList = JSON.parse(JSON.stringify(state.employeeList));

        console.log("newEmployeeList === state.employeeList ", newEmployeeList === state.employeeList);

        const { onboardingStatus, employeeid, message } = action;

        for (let i = 0; i < newEmployeeList.length; i++) {
            if (newEmployeeList[i]._id == employeeid) {
                newEmployeeList[i].user.onboardingStatus = onboardingStatus;
                newEmployeeList[i].user.onboardingMessage = message;
                break;
            }
        }

        return {
            ...state,
            employeeList: newEmployeeList,
        };
    }),

    on(HrActions.updateOnboardingStatusFail, (state, action: any) => {
        return {
            ...state,
        }
    }),

    on(HrActions.getHousingListSuccess, (state, action: any) => {
        return {
            ...state,
            housingList: action.response
        }
    }),

    on(HrActions.getHousingListFail, (state) => {
        return state
    }),

    on(HrActions.updateFileStatusSuccess, (state, action) => {
        const newState = { ...state }
        console.log(newState);
        return state
    }),

    on(HrActions.updateFileStatusFail, (state, action) => {
        return state
    }),

)

export const hrReducer = (state: any, action: any) => {
    return HrReducer(state, action);
}