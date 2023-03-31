import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { OnboardingAction } from "./onboarding.actions";
import { OnboardingService } from "src/app/services/onboarding.service";
import { exhaustMap, map, tap } from "rxjs";

@Injectable()

export class OnboardingEffects {
  onboarding$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(OnboardingAction.updateOnboarding),
      exhaustMap((action) => {
       return  this.onboardingService.onboardingSubmit(action.employeeDetails)
        .pipe(
          map((response: any) => {
            if (response?.status == 200) {
              return OnboardingAction.updateOnboardingSuccess({employeeDetails : response.data});
            } else {
              return OnboardingAction.updateOnboardingFailure();
            }
          })
        )
        })
    )
  })
  
  onboardingSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(OnboardingAction.updateOnboardingSuccess),
      tap(response => {
        console.log(response);
        const employee = localStorage.getItem('employee');
        if (employee){
          let employeeObj = JSON.parse(employee);
          employeeObj.details = response.employeeDetails;
          localStorage.setItem('employee', JSON.stringify(employeeObj));
        }
      })
    ),
    {dispatch: false}
  )


  constructor(private onboardingService: OnboardingService,
      private actions$: Actions,
    ) {}
}
