import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/shared/modules/comments/store/actionTypes'
import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'

export const getCommentsAction = createAction(
    ActionTypes.GET_COMMENTS,
    props<{ url: string }>()
)

export const getCommentsSuccessAction = createAction(
    ActionTypes.GET_COMMENTS_SUCCESS,
    props<{ comments: CommentInterface[] }>()
)

export const getCommentsFailureAction = createAction(
    ActionTypes.GET_COMMENTS_FAILURE,
    props<RequestFailureActionProps>()
)
