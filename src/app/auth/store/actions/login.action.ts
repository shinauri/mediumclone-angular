import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/auth/store/actionTypes'
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'
import { CurrentUserSuccessActionProps } from 'src/app/auth/types/currentUserSeccessActionProps.type'

export type loginActionProps = { request: LoginRequestInterface }

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<loginActionProps>()
)

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<CurrentUserSuccessActionProps>()
)

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<RequestFailureActionProps>()
)
