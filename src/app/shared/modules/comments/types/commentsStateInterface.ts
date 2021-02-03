import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

export interface CommentsStateInterface {
    isLoadingComments: boolean
    getCommentsError: BackendErrorsInterface | null
    comments: CommentInterface[] | null
    isLoadingDeleteComment: boolean
    deleteCommentsErrors: BackendErrorsInterface[]
    deletedCommentsIds: number[]
    isSubmittingComment: boolean
    postComment: CommentInterface
    postCommentError: BackendErrorsInterface | null
}
