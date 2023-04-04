import { createReducer, on } from "@ngrx/store";
import { loadingAction } from "./loading.action";

export interface LoadingInterface {
    isLoading: boolean;
}

const initialState : LoadingInterface= {
    isLoading: false,
}

const _loadingReducer = createReducer(
    initialState,
    on(loadingAction.loading, (state, ) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(loadingAction.doneLoading, (state, ) => {
        return {
            ...state,
            isLoading: false
        }
    })
)

export const loadingReducer = (state: any, action: any) => {
    return _loadingReducer(state, action);
}