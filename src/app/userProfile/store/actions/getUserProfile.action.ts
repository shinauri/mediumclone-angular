import { createAction, props } from '@ngrx/store'
import { ActionTypes } from 'src/app/userProfile/store/actionTypes'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'

export const getUserProfileAction = createAction(
    ActionTypes.GET_USER_PROFILE,
    props<{ url: string }>()
)

export const getUserProfileSuccessAction = createAction(
    ActionTypes.GET_USER_PROFILE_SUCCESS,
    props<{ profile: ProfileInterface }>()
)

export const getUserProfileFailureAction = createAction(
    ActionTypes.GET_USER_PROFILE_FAILURE,
    props<{ errorPage: string }>()
)
