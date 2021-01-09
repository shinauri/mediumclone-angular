import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    getUserProfileAction,
    getUserProfileFailureAction,
    getUserProfileSuccessAction,
} from 'src/app/userProfile/store/actions/getUserProfile.action'
import { UserProfileService } from 'src/app/userProfile/services/userProfile.service'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'

@Injectable()
export class GetUserProfileEffect {
    private getUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserProfileAction),
            switchMap(({ url }) => {
                return this.userProfileService
                    .getUserProfile(url)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (profile: ProfileInterface) => {
        return getUserProfileSuccessAction({ profile })
    }

    private errorCallback = (errorPage: string) => {
        return of(getUserProfileFailureAction({ errorPage }))
    }

    constructor(
        private actions$: Actions,
        private userProfileService: UserProfileService
    ) {}
}
