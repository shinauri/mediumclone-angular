import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    loginAction,
    loginFailureAction,
    loginSuccessAction,
} from 'src/app/auth/store/actions/login.action'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthEffect } from 'src/app/auth/store/effects/auth.effect'
import { environment } from 'src/environments/environment'

@Injectable()
export class LoginEffect extends AuthEffect {
    readonly authUrl = environment.apiUrl + environment.endpoints.auth.login

    private redirectAfterSubmit = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/')
                })
            ),
        { dispatch: false }
    )

    private login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction),
            switchMap(({ request }) => {
                return this.authService
                    .auth(request, this.authUrl)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (currentUser: CurrentUserInterface) => {
        this.persistenceService.set(environment.token, currentUser.token)
        return loginSuccessAction({ currentUser })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            loginFailureAction({
                errors: errorResponse.error.errors,
            })
        )
    }
}
