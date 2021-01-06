import { Injectable } from '@angular/core'

import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from 'src/app/auth/store/actions/register.action'
import { AuthEffect } from 'src/app/auth/store/effects/auth.effect'
import { environment } from 'src/environments/environment'

@Injectable()
export class RegisterEffect extends AuthEffect {
    protected authUrl = environment.apiUrl + environment.endpoints.auth.register
    protected authAction
    protected authSuccessAction
    protected authFailureAction

    protected initializeActions(): void {
        this.authAction = registerAction
        this.authSuccessAction = registerSuccessAction
        this.authFailureAction = registerFailureAction
    }
}
