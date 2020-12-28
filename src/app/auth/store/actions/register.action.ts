import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/auth/store/actionTypes'
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface'
import { CurrentUserSuccessActionProps } from 'src/app/auth/types/currentUserSeccessActionProps.type'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'

export type RegisterActionProps = { request: RegisterRequestInterface }

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<RegisterActionProps>()
)

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<CurrentUserSuccessActionProps>()
)

export const registerFailureAction = createAction(
    ActionTypes.REGISTER_FAILURE,
    props<RequestFailureActionProps>()
)
