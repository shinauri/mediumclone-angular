import { createAction, props } from '@ngrx/store'

import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'
import { ActionTypes } from 'src/app/shared/modules/comments/store/actionTypes'
import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'

export const deleteCommentAction = createAction(
    ActionTypes.DELETE_COMMENT,
    props<{ url: string; comment: CommentInterface }>()
)

export const deleteCommentSuccessAction = createAction(
    ActionTypes.DELETE_COMMENT_SUCCESS,
    props<{ commentId: number }>()
)

export const deleteCommentFailureAction = createAction(
    ActionTypes.DELETE_COMMENT_FAILURE,
    props<RequestFailureActionProps>()
)
