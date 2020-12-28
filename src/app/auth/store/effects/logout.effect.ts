import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { logoutAction } from 'src/app/auth/store/actions/sync.action'
import { tap } from 'rxjs/operators'
import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { Router } from '@angular/router'

@Injectable()
export class LogoutEffect {
    private logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logoutAction),
                tap(() => {
                    this.persistenceService.set('accessToken', '')
                    this.router.navigateByUrl('/')
                })
            ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        protected persistenceService: PersistenceService,
        private router: Router
    ) {}
}
