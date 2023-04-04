import {createReducer, on} from '@ngrx/store'
import { OnboardingAction } from './onboarding.actions'

const initialState = {
  employee: false
}

const OnboardingReducer = createReducer(
  initialState,
  on(OnboardingAction.updateOnboardingSuccess, (state, action): any => {
    const newState = JSON.parse(JSON.stringify(state));
    return newState;
  })
)

export const onboardingReducer = (state : any, action: any) => {
  return OnboardingReducer(state, action)
}