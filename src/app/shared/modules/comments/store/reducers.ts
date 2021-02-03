import { Action, createReducer, on } from '@ngrx/store'

import { routerNavigationAction } from '@ngrx/router-store'
import { CommentsStateInterface } from 'src/app/shared/modules/comments/types/commentsStateInterface'
import {
    getCommentsAction,
    getCommentsFailureAction,
    getCommentsSuccessAction,
} from 'src/app/shared/modules/comments/store/actions/getComments.aections'
import {
    getCommentsFailureOperation,
    getCommentsOperation,
    getCommentsSuccessOperation,
} from 'src/app/shared/modules/comments/store/operations/getCommentsReducer.operations'
import {
    deleteCommentAction,
    deleteCommentFailureAction,
    deleteCommentSuccessAction,
} from 'src/app/shared/modules/comments/store/actions/deleteComment.action'
import {
    deleteCommentFailureOperation,
    deleteCommentOperation,
    deleteCommentSuccessOperation,
} from 'src/app/shared/modules/comments/store/operations/deleteCommentReducer.operations'
import {
    postCommentAction,
    postCommentFailureAction,
    postCommentSuccessAction,
} from 'src/app/shared/modules/comments/store/actions/postComment.actions'
import {
    postCommentFailureOperation,
    postCommentOperation,
    postCommentSuccessOperation,
} from 'src/app/shared/modules/comments/store/operations/postCommentReducer.operations'

const initialState: CommentsStateInterface = {
    isLoadingComments: false,
    comments: null,
    getCommentsError: null,
    isLoadingDeleteComment: false,
    deleteCommentsErrors: [],
    deletedCommentsIds: [],
    isSubmittingComment: false,
    postComment: null,
    postCommentError: null,
}

const editArticleReducer = createReducer(
    initialState,
    on(getCommentsAction, getCommentsOperation),
    on(getCommentsSuccessAction, getCommentsSuccessOperation),
    on(getCommentsFailureAction, getCommentsFailureOperation),
    on(deleteCommentAction, deleteCommentOperation),
    on(deleteCommentSuccessAction, deleteCommentSuccessOperation),
    on(deleteCommentFailureAction, deleteCommentFailureOperation),
    on(postCommentAction, postCommentOperation),
    on(postCommentSuccessAction, postCommentSuccessOperation),
    on(postCommentFailureAction, postCommentFailureOperation),
    on(routerNavigationAction, (): CommentsStateInterface => initialState)
)

export function reducers(
    state: CommentsStateInterface,
    action: Action
): CommentsStateInterface {
    return editArticleReducer(state, action)
}
