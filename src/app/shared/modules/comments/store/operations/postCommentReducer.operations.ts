import { CommentsStateInterface } from 'src/app/shared/modules/comments/types/commentsStateInterface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'
import { CreateCommentResponseInterface } from 'src/app/shared/modules/comments/types/createCommentResponse.interface'

export const postCommentOperation = (
    state: CommentsStateInterface
): CommentsStateInterface => ({
    ...state,
    isSubmittingComment: true,
    postComment: null,
})

export const postCommentSuccessOperation = (
    state: CommentsStateInterface,
    action: CreateCommentResponseInterface
): CommentsStateInterface => ({
    ...state,
    isSubmittingComment: false,
    postComment: action.comment,
    comments: [action.comment, ...state.comments],
})

export const postCommentFailureOperation = (
    state: CommentsStateInterface,
    action: RequestFailureActionProps
): CommentsStateInterface => ({
    ...state,
    isSubmittingComment: false,
    postCommentError: action.errors,
})
