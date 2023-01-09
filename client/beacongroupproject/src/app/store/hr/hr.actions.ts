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
    }
})