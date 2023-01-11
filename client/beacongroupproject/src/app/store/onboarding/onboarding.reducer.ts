import {createReducer, on} from '@ngrx/store'
import { OnboardingAction } from './onboarding.actions'
import { Store } from '@ngrx/store'



const initialState = {
  employee: false
}




const OnboardingReducer = createReducer(
  initialState,
  on(OnboardingAction.updateOnboardingSuccess, (state, {response}): any => {
    console.log(response)
    return {
      ...state, 
      employee: response.data
    }
  })
)

export const onboardingReducer = (state, action) => {
  return OnboardingReducer(state, action)
}