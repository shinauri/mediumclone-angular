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
    getCurrentUserAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/getCurrentUser.action'
import { updateCurrentUserSuccessAction } from 'src/app/auth/store/actions/updateCurrentUser.action'
import { logoutAction } from 'src/app/auth/store/actions/sync.action'
import {
    authStartOperation,
    authSuccessOperation,
    authFailureOperation,
} from 'src/app/auth/store/operations/authReducer.operations'
import {
    getCurrentUserOperation,
    getCurrentUserSuccessOperation,
    getCurrentUserFailureOperation,
} from 'src/app/auth/store/operations/getCurrentUserReducer.operations'
import { updateCurrentUserSuccessOperation } from 'src/app/auth/store/operations/updateCurrentUserReducer.operations'
import { logoutOperation } from 'src/app/auth/store/operations/logoutReducer.operations'

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoggedIn: null,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
}

const authReducer = createReducer(
    initialState,
    on(registerAction, authStartOperation),
    on(registerSuccessAction, authSuccessOperation),
    on(registerFailureAction, authFailureOperation),
    on(loginAction, authStartOperation),
    on(loginSuccessAction, authSuccessOperation),
    on(loginFailureAction, authFailureOperation),
    on(getCurrentUserAction, getCurrentUserOperation),
    on(getCurrentUserSuccessAction, getCurrentUserSuccessOperation),
    on(getCurrentUserFailureAction, getCurrentUserFailureOperation),
    on(updateCurrentUserSuccessAction, updateCurrentUserSuccessOperation),
    on(logoutAction, logoutOperation(initialState))
)

export function reducers(
    state: AuthStateInterface,
    action: Action
): AuthStateInterface {
    return authReducer(state, action)
}
