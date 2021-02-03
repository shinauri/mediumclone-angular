import { createAction, props } from '@ngrx/store'

import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'
import { ActionTypes } from 'src/app/shared/modules/comments/store/actionTypes'
import { CommentInputInterface } from 'src/app/shared/modules/comments/components/commentForm/types/commentInput.interface'

export const postCommentAction = createAction(
    ActionTypes.POST_COMMENT,
    props<{ url: string; comment: CommentInputInterface }>()
)

export const postCommentSuccessAction = createAction(
    ActionTypes.POST_COMMENT_SUCCESS,
    props<{ comment: CommentInterface }>()
)

export const postCommentFailureAction = createAction(
    ActionTypes.POST_COMMENT_FAILURE,
    props<RequestFailureActionProps>()
)
