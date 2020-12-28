import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from 'src/app/auth/services/auth.service'
import { environment } from 'src/environments/environment'
import {
    updateCurrentUserAction,
    updateCurrentUserFailureAction,
    updateCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/updateCurrentUser.action'

@Injectable()
export class UpdateCurrentUserEffect {
    readonly authUrl = environment.apiUrl + environment.endpoints.auth.user

    private updateCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCurrentUserAction),
            switchMap(({ currentUserInput }) => {
                return this.authService
                    .updateCurrentUser(currentUserInput, this.authUrl)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (currentUser: CurrentUserInterface) => {
        return updateCurrentUserSuccessAction({ currentUser })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            updateCurrentUserFailureAction({
                errors: errorResponse.error.errors,
            })
        )
    }

    constructor(
        protected actions$: Actions,
        protected authService: AuthService
    ) {}
}
