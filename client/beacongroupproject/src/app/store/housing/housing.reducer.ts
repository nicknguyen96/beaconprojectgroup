import { createReducer, on } from '@ngrx/store';
import { HousingActions } from './housing.actions';

export interface House {
    address: string,
    landlord: any,
    tenants: any,
    summary: any,
}

export const initialState: House = {
    address: '',
    landlord: {},
    tenants: [],
    summary: {}
}

const HousingReducer = createReducer(
    initialState,

    on(HousingActions.gethouseSuccess, (state, action: any) => {
        console.log(action.response.data)
        return action.response.data
    }),

    on(HousingActions.createReportSuccess, (state, action) => {
        const newHouse = JSON.parse(JSON.stringify(state));

        newHouse.summary.reports.push(action.response.data);

        return newHouse;
    }),
)

export const housingReducer = (state:any, action:any) => {
    return HousingReducer(state,action);
}