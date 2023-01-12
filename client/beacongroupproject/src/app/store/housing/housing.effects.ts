import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core"
import { HousingActions } from "./housing.actions"
import { exhaustMap, map } from "rxjs";
import { HousingService } from "src/app/services/housing.service";

@Injectable()
export class HousingEffects {
    constructor(
        private actions$: Actions,
        private housingService: HousingService
    ) { }

    getHouse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HousingActions.gethouse),
            exhaustMap((action: any) => {
                return this.housingService.getHouse(action.houseid).pipe(
                    map((response: any) => {
                        if (response.status == 200) {
                            return HousingActions.gethouseSuccess({ response });
                        } else {
                            return HousingActions.gethouseFail({ response });
                        }
                    })
                )
            })
        )
    })

    createReport$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HousingActions.createReport),
            exhaustMap((action: any) => {
                const { title, description, houseid } = action
                return this.housingService.createReport(title, description, houseid).pipe(
                    map((response: any) => {
                        if (response.status == 201) {
                            console.log('success')
                            return HousingActions.createReportSuccess({ response });
                        } else {
                            console.log('fail')
                            return HousingActions.createReportFail({ response });
                        }
                    })
                )
            })
        )
    })
}