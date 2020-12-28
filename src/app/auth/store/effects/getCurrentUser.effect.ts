import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from 'src/app/auth/services/auth.service'
import { PersistenceService } from 'src/app/shared/services/persistence.service'
import {
    getCurrentUserAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/getCurrentUser.action'
import { environment } from 'src/environments/environment'

@Injectable()
export class GetCurrentUserEffect {
    private getCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCurrentUserAction),
            switchMap(() => {
                const token = this.persistenceService.get(environment.token)

                if (!token) {
                    return of(getCurrentUserFailureAction())
                }

                const url = environment.apiUrl + environment.endpoints.auth.user
                return this.authService
                    .getCurrentUser(url)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (currentUser: CurrentUserInterface) => {
        return getCurrentUserSuccessAction({ currentUser })
    }

    private errorCallback = () => {
        return of(getCurrentUserFailureAction())
    }

    constructor(
        protected actions$: Actions,
        protected authService: AuthService,
        protected persistenceService: PersistenceService
    ) {}
}
