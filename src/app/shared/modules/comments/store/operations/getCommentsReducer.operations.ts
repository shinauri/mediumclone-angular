import { CommentsStateInterface } from 'src/app/shared/modules/comments/types/commentsStateInterface'
import { GetCommentsResponseInterface } from 'src/app/shared/modules/comments/types/getCommentsResponce.interface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'

export const getCommentsOperation = (
    state: CommentsStateInterface
): CommentsStateInterface => ({
    ...state,
    isLoadingComments: true,
    comments: null,
})

export const getCommentsSuccessOperation = (
    state: CommentsStateInterface,
    action: GetCommentsResponseInterface
): CommentsStateInterface => ({
    ...state,
    isLoadingComments: false,
    comments: action.comments,
})

export const getCommentsFailureOperation = (
    state: CommentsStateInterface,
    action: RequestFailureActionProps
): CommentsStateInterface => ({
    ...state,
    isLoadingComments: false,
    comments: null,
    getCommentsError: action.errors,
})
