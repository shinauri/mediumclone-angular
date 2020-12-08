import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from 'src/app/auth/store/actions/register.action'
import { AuthService } from 'src/app/auth/services/auth.service'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'

const successCallback = (currentUser: CurrentUserInterface) => {
    return registerSuccessAction({ currentUser })
}

const errorCallback = (errorResponse: HttpErrorResponse) => {
    return of(
        registerFailureAction({
            errors: errorResponse.error.errors,
        })
    )
}

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({ request }) => {
                return this.authService
                    .register(request)
                    .pipe(map(successCallback), catchError(errorCallback))
            })
        )
    )

    constructor(private actions$: Actions, private authService: AuthService) {}
}
