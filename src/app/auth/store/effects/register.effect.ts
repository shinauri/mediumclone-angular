import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from 'src/app/auth/store/actions/register.action'
import { AuthService } from 'src/app/auth/services/auth.service'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { PersistenceService } from 'src/app/shared/services/persistence.service'

@Injectable()
export class RegisterEffect {
    redirectAfterSubmit = createEffect(
        () =>
            this.actions$.pipe(
                ofType(registerSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/')
                })
            ),
        { dispatch: false }
    )

    register$ = createEffect(() =>
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

    successCallback = (currentUser: CurrentUserInterface) => {
        this.persistenceService.set('accessToken', currentUser.token)
        return registerSuccessAction({ currentUser })
    }

    errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            registerFailureAction({
                errors: errorResponse.error.errors,
            })
        )
    }

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private persistenceService: PersistenceService,
        private router: Router
    ) {}
}
