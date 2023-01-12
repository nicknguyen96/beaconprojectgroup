import { createActionGroup, props } from '@ngrx/store';
import { House } from './housing.reducer';

export const HousingActions = createActionGroup({
    source: "[Housing Component]",
    events: {
        "getHouse": props<{ houseid : string }>(),
        "getHouse Success": props<{ response: House }>(),
        "getHouse Fail": props<{ response: any }>(),

        "create report": props<{title: string, description: string, houseid: string}>(),
        "create report Success": props<{ response : any }>(),
        "create report Fail": props<{ response : any }>(),

        "create comment": props<{description: string, reportid: string, employeeid: string}>(),
        "create comment Success": props<{response : any}>(),
        "create comment Fail": props<{ response : any }>(),

    }
})