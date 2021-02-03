import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { CommentsStateInterface } from 'src/app/shared/modules/comments/types/commentsStateInterface'
import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'

export const deleteCommentOperation = (
    state: CommentsStateInterface,
    action: { url: string; comment: CommentInterface }
): CommentsStateInterface => ({
    ...state,
    isLoadingDeleteComment: true,
    deletedCommentsIds: [...state.deletedCommentsIds, action.comment.id],
})

export const deleteCommentSuccessOperation = (
    state: CommentsStateInterface,
    action: { commentId: number }
): CommentsStateInterface => ({
    ...state,
    isLoadingDeleteComment: false,
    comments: state.comments.filter(
        (comment) => action.commentId !== comment.id
    ),
    deletedCommentsIds: [...state.deletedCommentsIds].filter(
        (id) => action.commentId !== id
    ),
})

export const deleteCommentFailureOperation = (
    state: CommentsStateInterface,
    action: RequestFailureActionProps
): CommentsStateInterface => ({
    ...state,
    isLoadingDeleteComment: false,
    deleteCommentsErrors: [
        ...[...state.deleteCommentsErrors].filter(
            (error) =>
                Number(error.commentId) !== Number(action.errors.commentId)
        ),
        action.errors,
    ],
    deletedCommentsIds: [...state.deletedCommentsIds].filter(
        (id) => Number(action.errors.commentId) !== id
    ),
})
