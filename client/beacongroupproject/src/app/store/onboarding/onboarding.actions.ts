import { createActionGroup, props, emptyProps } from "@ngrx/store";


export const OnboardingAction = createActionGroup({
  source: "[OnboardingState], onboarding",
  events: {
    'Update Onboarding': props<{employeeDetails: any}>(),
    'Update Onboarding Success': props<{employeeDetails : any}>(),
    'Update Onboarding Failure': emptyProps()
  }
})