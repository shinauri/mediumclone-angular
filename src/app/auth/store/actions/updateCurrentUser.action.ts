import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/auth/store/actionTypes'
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'
import { CurrentUserSuccessActionProps } from 'src/app/auth/types/currentUserSeccessActionProps.type'

export type updateCurrentUserActionProps = {
    currentUserInput: CurrentUserInputInterface
}

export const updateCurrentUserAction = createAction(
    ActionTypes.UPDATE_CURRENT_USER,
    props<updateCurrentUserActionProps>()
)

export const updateCurrentUserSuccessAction = createAction(
    ActionTypes.UPDATE_CURRENT_USER_SUCCESS,
    props<CurrentUserSuccessActionProps>()
)

export const updateCurrentUserFailureAction = createAction(
    ActionTypes.UPDATE_CURRENT_USER_FAILURE,
    props<RequestFailureActionProps>()
)
