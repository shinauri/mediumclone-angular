import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { CommentsStateInterface } from 'src/app/shared/modules/comments/types/commentsStateInterface'

export const commentsFeatureSelector = createFeatureSelector<
    AppStateInterface,
    CommentsStateInterface
>('comments')

// Get Comments Selector

export const isLoadingCommentsSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.isLoadingComments
)

export const commentsSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.comments
)

export const getCommentsErrorSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.getCommentsError
)

// Delete Comment Selectors

export const deleteCommentSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.deletedCommentsIds
)

export const isLoadingDeleteCommentSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) =>
        commentsState.isLoadingDeleteComment
)

export const deleteCommentErrorSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) =>
        commentsState.deleteCommentsErrors
)

// Post Comment Selectors

export const postCommentSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.postComment
)

export const isSubmittingCommentSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.isSubmittingComment
)

export const postCommentErrorSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.postCommentError
)
