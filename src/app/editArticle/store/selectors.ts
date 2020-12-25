import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { EditArticleStateInterface } from 'src/app/editArticle/types/editArticleState.interface'

export const editArticleFeatureSelector = createFeatureSelector<
    AppStateInterface,
    EditArticleStateInterface
>('editArticle')

export const isSubmittingSelector = createSelector(
    editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) =>
        editArticleState.isSubmitting
)

export const isLoadingSelector = createSelector(
    editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
)

export const articleSelector = createSelector(
    editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.article
)

export const validationErrorsSelector = createSelector(
    editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) =>
        editArticleState.validationErrors
)
