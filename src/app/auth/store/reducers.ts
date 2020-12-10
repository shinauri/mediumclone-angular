import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { Action, createReducer, on } from '@ngrx/store'

import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from 'src/app/auth/store/actions/register.action'
import {
    loginAction,
    loginFailureAction,
    loginSuccessAction,
} from 'src/app/auth/store/actions/login.action'
import {
    startOperation,
    successOperation,
    failureOperation,
} from 'src/app/auth/store/operations/reducer.operations'

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null,
}

const authReducer = createReducer(
    initialState,
    on(registerAction, startOperation),
    on(registerSuccessAction, successOperation),
    on(registerFailureAction, failureOperation),
    on(loginAction, startOperation),
    on(loginSuccessAction, successOperation),
    on(loginFailureAction, failureOperation)
)

export function reducers(
    state: AuthStateInterface,
    action: Action
): AuthStateInterface {
    return authReducer(state, action)
}
