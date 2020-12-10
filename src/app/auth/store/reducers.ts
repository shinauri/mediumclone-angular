import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { Action, createReducer, on } from '@ngrx/store'

import {
    registerAction,
    registerFailureAction,
    registerSuccessAction,
} from 'src/app/auth/store/actions/register.action'
import {
    registerOperation,
    registerSuccessOperation,
    registerFailureOperation,
} from 'src/app/auth/store/operations/auth.operations'

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null,
}

const authReducer = createReducer(
    initialState,
    on(registerAction, registerOperation),
    on(registerSuccessAction, registerSuccessOperation),
    on(registerFailureAction, registerFailureOperation)
)

export function reducers(
    state: AuthStateInterface,
    action: Action
): AuthStateInterface {
    return authReducer(state, action)
}
