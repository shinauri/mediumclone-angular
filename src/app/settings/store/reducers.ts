import { Action, createReducer, on } from '@ngrx/store'

import { SettingsStateInterface } from 'src/app/settings/types/settingsState.interface'

import {
    updateCurrentUserAction,
    updateCurrentUserFailureAction,
    updateCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/updateCurrentUser.action'
import {
    updateCurrentUserFailureOperation,
    updateCurrentUserOperation,
    updateCurrentUserSuccessOperation,
} from 'src/app/settings/store/operations/updateCurrentUserReducer.operations'

const initialState: SettingsStateInterface = {
    isSubmitting: false,
    validationErrors: null,
}

const settingsReducer = createReducer(
    initialState,
    on(updateCurrentUserAction, updateCurrentUserOperation),
    on(updateCurrentUserSuccessAction, updateCurrentUserSuccessOperation),
    on(updateCurrentUserFailureAction, updateCurrentUserFailureOperation)
)

export function reducers(
    state: SettingsStateInterface,
    action: Action
): SettingsStateInterface {
    return settingsReducer(state, action)
}
