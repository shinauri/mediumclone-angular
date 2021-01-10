import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/shared/modules/follow/store/actionTypes'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'

export const followAction = createAction(
    ActionTypes.FOLLOW,
    props<{ isFollowed: boolean; url: string }>()
)

export const followSuccessAction = createAction(
    ActionTypes.FOLLOW_SUCCESS,
    props<{ profile: ProfileInterface }>()
)

export const followFailureAction = createAction(ActionTypes.FOLLOW_FAILURE)
