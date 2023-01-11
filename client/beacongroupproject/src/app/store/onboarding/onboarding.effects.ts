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
              return OnboardingAction.updateOnboardingSuccess({ response });
            } else {
              return OnboardingAction.updateOnboardingFailure({ error: "something wrong" });
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
        
      })
    ),
    {dispatch: false}
  )


  constructor(private onboardingService: OnboardingService,
      private actions$: Actions,
    ) {}
}
