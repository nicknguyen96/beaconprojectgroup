import {createReducer, on} from '@ngrx/store'
import { OnboardingAction } from './onboarding.actions'
import { Store } from '@ngrx/store'



const initialState = {
  employee: false
}




const OnboardingReducer = createReducer(
  initialState,
  on(OnboardingAction.updateOnboardingSuccess, (state, action): any => {
    console.log(action.employeeDetails);
    const newState = JSON.parse(JSON.stringify(state));
    console.log(state, newState);
    return newState;
  })
)

export const onboardingReducer = (state, action) => {
  return OnboardingReducer(state, action)
}