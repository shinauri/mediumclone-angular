import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/auth/store/actionTypes'
import { UserRegisterCredentials } from 'src/app/auth/types/userRegisterCredentials.interface'

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<UserRegisterCredentials>()
)
