import { Actions } from '@ngrx/effects'
import { AuthService } from 'src/app/auth/services/auth.service'
import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable()
export abstract class AuthEffect {
    constructor(
        protected actions$: Actions,
        protected authService: AuthService,
        protected persistenceService: PersistenceService,
        protected router: Router
    ) {}
}
