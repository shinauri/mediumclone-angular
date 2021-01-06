import { Injectable } from '@angular/core'

import {
    loginAction,
    loginFailureAction,
    loginSuccessAction,
} from 'src/app/auth/store/actions/login.action'
import { AuthEffect } from 'src/app/auth/store/effects/auth.effect'
import { environment } from 'src/environments/environment'

@Injectable()
export class LoginEffect extends AuthEffect {
    protected authUrl = environment.apiUrl + environment.endpoints.auth.login
    protected authAction
    protected authSuccessAction
    protected authFailureAction

    protected initializeActions(): void {
        this.authAction = loginAction
        this.authSuccessAction = loginSuccessAction
        this.authFailureAction = loginFailureAction
    }
}
