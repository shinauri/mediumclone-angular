import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { AuthService } from 'src/app/auth/services/auth.service'
import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { environment } from 'src/environments/environment'

@Injectable()
export abstract class AuthEffect {
    protected abstract authUrl: string
    protected abstract authAction
    protected abstract authSuccessAction
    protected abstract authFailureAction

    protected afterSubmitRedirectUrl = '/'
    private redirectAfterSubmit$: Observable<Action | unknown>
    private auth$: Observable<Action | unknown>

    protected abstract initializeActions(): void

    constructor(
        protected actions$: Actions,
        protected authService: AuthService,
        protected persistenceService: PersistenceService,
        protected router: Router
    ) {
        this.initializeActions()
        this.auth$ = this.auth()
        this.redirectAfterSubmit$ = this.redirectAfterSubmit()
    }

    private redirectAfterSubmit(): Observable<Action | unknown> {
        return createEffect(
            () =>
                this.actions$.pipe(
                    ofType(this.authSuccessAction),
                    tap(() => {
                        this.router.navigateByUrl(this.afterSubmitRedirectUrl)
                    })
                ),
            { dispatch: false }
        )
    }

    private auth(): Observable<Action | unknown> {
        return createEffect(() =>
            this.actions$.pipe(
                ofType(this.authAction),
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
    }

    private successCallback = (currentUser: CurrentUserInterface) => {
        this.persistenceService.set(environment.token, currentUser.token)
        return this.authSuccessAction({ currentUser })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            this.authFailureAction({
                errors: errorResponse.error.errors,
            })
        )
    }
}
