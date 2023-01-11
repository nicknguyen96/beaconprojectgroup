import { createActionGroup, props } from '@ngrx/store';

export const HrActions = createActionGroup({
    source: "[HR Component] HR",
    events: {
        "sendEmail": props<{ email: string }>(),
        "sendEmail Success": props<{ response: any }>(),
        "sendEmail Fail": props<{ response: any }>,

        "get employee list": props<{ data: any }>(),
        "get employee list Success": props<{ response: any }>(),
        "get employee list Fail": props<{ response: any }>(),
        
        "update onboarding status": props<{ onboardingStatus: string, employeeid: string, message: string }>(),
        "update onboarding status Success": props<{ response: any }>(),
        "update onboarding status Fail": props<{ response: any }>(),

        "get housing list": props<{ data: any }>(),
        "get housing list Success": props<{ response: any }>(),
        "get housing list Fail": props<{ response: any }>(),
    }
})