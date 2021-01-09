import { Action, createReducer, on } from '@ngrx/store'

import { UserProfileStateInterface } from 'src/app/userProfile/types/userProfileState.interface'
import {
    getUserProfileAction,
    getUserProfileFailureAction,
    getUserProfileSuccessAction,
} from 'src/app/userProfile/store/actions/getUserProfile.action'
import {
    getUserProfileFailureOperation,
    getUserProfileOperation,
    getUserProfileSuccessOperation,
} from 'src/app/userProfile/store/operations/getUserProfileReducer.operations'

const initialState: UserProfileStateInterface = {
    isLoading: false,
    data: null,
    error: null,
}

const userProfileReducer = createReducer(
    initialState,
    on(getUserProfileAction, getUserProfileOperation),
    on(getUserProfileSuccessAction, getUserProfileSuccessOperation),
    on(getUserProfileFailureAction, getUserProfileFailureOperation)
)

export function reducers(
    state: UserProfileStateInterface,
    action: Action
): UserProfileStateInterface {
    return userProfileReducer(state, action)
}
