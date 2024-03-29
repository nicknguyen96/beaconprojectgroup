import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { HrActions } from './hr.actions';
import { exhaustMap, map, tap } from 'rxjs';
import { HrService } from '../../services/hr.service';
import { Router } from '@angular/router';
import { BACKEND_URL } from 'src/app/utils/utils';
import { loadingAction } from '../loading/loading.action';

@Injectable()
export class HrEffects {
    constructor(private actions$: Actions, private hrService: HrService, private router: Router) { }
    sendEmai$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(HrActions.sendemail),
            exhaustMap((action) => {
                return this.hrService.sendInvitationEmail(action.email).pipe(
                    map((data: any) => {
                        if (data?.status == 200) {
                            alert('Success! Email has been sent to the target email.');
                            return HrActions.sendemailSuccess({ response: data });
                        } else {
                            return HrActions.sendemailFail();
                        }
                    })
                )
            })
        )
    });

    sendEmailSuccess$ = createEffect(() :any => {
        return this.actions$.pipe(
            ofType(HrActions.sendemailSuccess),
            map((action : any) => loadingAction.doneLoading())
        )
    });

    sendEmailFail$ = createEffect(() :any => {
        return this.actions$.pipe(
            ofType(HrActions.sendemailFail),
            map((action : any) => loadingAction.doneLoading())
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

    updateOnBoardingStatus$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HrActions.updateOnboardingStatus),
            exhaustMap((action) => {
                console.log(action);
                const { onboardingStatus, employeeid, message } = action;
                return this.hrService.updateOnBoardingStatus(onboardingStatus, employeeid, message).pipe(
                    map((data: any) => {
                        console.log(data);

                        if (data.status == 200) {
                            alert('update onboarding status successfully');
                            return HrActions.updateOnboardingStatusSuccess({ response: { onboardingStatus, employeeid, message } });
                        } else {
                            alert('something wrong, please try again');
                            return HrActions.updateOnboardingStatusFail({ response: data });
                        }
                    })
                )
            })
        )
    })

    updateOnBoardRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HrActions.updateOnboardingStatusSuccess),
            tap((action: any) => {
                const { onboardingStatus, employeeid, message } = action.response;
                console.log(action);
                window.close();
            }),

        )
    }, { dispatch: false });

    getHousingList$ = createEffect(() => 
        this.actions$.pipe(
            ofType(HrActions.getHousingList),
            exhaustMap(action => 
                this.hrService.getHousingList().pipe(
                    map((data: any) => {
                        if (data.status == 200) {
                            return HrActions.getHousingListSuccess({ response: data.data });
                        } else {
                            return HrActions.getHousingListFail({ response: data.data })
                        }
                    })
                )
            )
        )
    );

    deleteHousing$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HrActions.deleteHousing),
            exhaustMap(action => 
                this.hrService.deleteHousing(action.id).pipe(
                    map((data: any) => {
                        if (data.status == 200) {
                            return HrActions.deleteHousingSuccess({ id: data.id });
                        } else {
                            return HrActions.deleteHousingFail({ id: data.id });
                        }
                    })
                )
            )
        )
    );

    addHousing$ = createEffect(() => 
        this.actions$.pipe(
            ofType(HrActions.addHousing),
            exhaustMap(action =>
                this.hrService.addHousing(action.houseInfo).pipe(
                    map((data: any) => {
                        if (data.status == 200) {
                            return HrActions.addHousingSuccess({ response: data.data });
                        } else {
                            return HrActions.addHousingFail({ message: data.message });
                        }
                    })
                )
            )
        )
    )

    updateFileStatus$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HrActions.updateFileStatus),
            exhaustMap((action) => {
                const { employeeid, fileName, message, status } = action;
                return this.hrService.updateFileStatus(employeeid, fileName, message, status).pipe(
                    map((response: any) => {
                        if (response.status == 200) {
                            return HrActions.updateFileStatusSuccess({ response });
                        } else {
                            return HrActions.updateFileStatusFail({ response });
                        }
                    })
                )
            })
        )
    })

    updateFileStatusSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HrActions.updateFileStatusSuccess),
            tap((action) => {
                alert("Update File Status Success")
            })
        )
    }, { dispatch: false })
}