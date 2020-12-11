import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from 'src/app/auth/store/actions/register.action'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthEffect } from 'src/app/auth/store/effects/auth.effect'
import { environment } from 'src/environments/environment'

@Injectable()
export class RegisterEffect extends AuthEffect {
    private redirectAfterSubmit = createEffect(
        () =>
            this.actions$.pipe(
                ofType(registerSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/')
                })
            ),
        { dispatch: false }
    )

    private register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({ request }) => {
                return this.authService
                    .register(request)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (currentUser: CurrentUserInterface) => {
        this.persistenceService.set(environment.token, currentUser.token)
        return registerSuccessAction({ currentUser })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            registerFailureAction({
                errors: errorResponse.error.errors,
            })
        )
    }
}
