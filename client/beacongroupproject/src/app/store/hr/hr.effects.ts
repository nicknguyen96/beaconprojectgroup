import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { HrActions } from './hr.actions';
import { exhaustMap, map } from 'rxjs';
import { HrService } from '../../services/hr.service';

@Injectable()
export class HrEffects {
    constructor(private actions$: Actions, private hrService: HrService) { }
    sendEmai$ = createEffect((): any => {
        console.log(this.actions$);
        return this.actions$.pipe(
            ofType(HrActions.sendemail),
            exhaustMap((action) => {
                console.log(action);
                return this.hrService.sendInvitationEmail(action.email).pipe(
                    map((data: any) => {
                        console.log(data);
                        if (data?.status == 200) {
                            console.log(data);
                            return HrActions.sendemailSuccess({ response: data });
                        } else {
                            return HrActions.sendemailFail();
                        }
                    })
                )
            })
        )
    })

    getEmployeeList$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(HrActions.getEmployeeList),
            exhaustMap((action) => {
                console.log(action);
                return this.hrService.getEmployeeList().pipe(
                    map((data: any) => {
                        console.log(data);
                        if (data.status == 200) {
                            return HrActions.getEmployeeListSuccess({ response: data });
                        } else {
                            return HrActions.getEmployeeListFail({ response: data })
                        }
                    })
                )
            })
        )
    })
}