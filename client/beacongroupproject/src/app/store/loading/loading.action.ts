import { createActionGroup, emptyProps} from "@ngrx/store";

export const loadingAction = createActionGroup({
    source: 'Loading State',
    events: {
        'loading': emptyProps(),
        'done loading': emptyProps(),
    }
})