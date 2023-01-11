import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HR } from './hr.reducer'

export const selectHrState = createFeatureSelector('hr');

export const employeeList = createSelector(selectHrState,(state: HR) => state.employeeList);

export const housingList = createSelector(selectHrState, (state: HR) => state.housingList);