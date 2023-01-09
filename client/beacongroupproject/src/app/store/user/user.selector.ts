import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Employee } from "./auth.reducer";

export const selectAuthState = createFeatureSelector('auth')

export const selectEmployee = createSelector(selectAuthState, (state: Employee) => state.employee)
export const selectToken = createSelector(selectAuthState, (state: Employee) => state.token)
export const isHR = createSelector(selectAuthState, (state: Employee) => state.isHR)
