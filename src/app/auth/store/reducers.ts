import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { Action, createReducer, on } from '@ngrx/store'

import { registerAction } from 'src/app/auth/store/actions/register.action'

const initialState: AuthStateInterface = {
    isSubmitting: false,
}

const authReducer = createReducer(
    initialState,
    on(
        registerAction,
        (state): AuthStateInterface => ({
            ...state,
            isSubmitting: true,
        })
    )
)

export function reducers(state: AuthStateInterface, action: Action): any {
    console.log(authReducer(state, action))
    return authReducer(state, action)
}
