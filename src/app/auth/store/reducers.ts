import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { Action, createReducer, on } from '@ngrx/store'

import { registerAction } from 'src/app/auth/store/actions/register.action'
import { registerOperation } from 'src/app/auth/store/operations/auth.operations'

const initialState: AuthStateInterface = {
    isSubmitting: false,
}

const authReducer = createReducer(
    initialState,
    on(registerAction, registerOperation)
)

export function reducers(
    state: AuthStateInterface,
    action: Action
): AuthStateInterface {
    return authReducer(state, action)
}
