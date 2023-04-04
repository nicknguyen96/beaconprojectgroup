import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoadingInterface } from "./loading.reducer";

export const selectLoadingState = createFeatureSelector('loading') 

export const selectLoading = createSelector(selectLoadingState, (state: LoadingInterface) => state.isLoading);