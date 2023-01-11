import { createActionGroup, props } from "@ngrx/store";


export const OnboardingAction = createActionGroup({
  source: "[OnboardingState], onboarding",
  events: {
    'Update Onboarding': props<{employeeDetails: any}>(),
    'Update Onboarding Success': props<{response: any}>(),
    'Update Onboarding Failure': props<{error: any}>()
  }
})