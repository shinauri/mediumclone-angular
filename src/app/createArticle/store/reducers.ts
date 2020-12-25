import { Action, createReducer, on } from '@ngrx/store'

import { CreateArticleStateInterface } from 'src/app/createArticle/types/createArticleState.interface'
import {
    createArticleAction,
    createArticleFailureAction,
    createArticleSuccessAction,
} from 'src/app/createArticle/store/actions/createArticle.actions'
import {
    createArticleFailureOperation,
    createArticleOperation,
    createArticleSuccessOperation,
} from 'src/app/createArticle/store/operations/createArticleReducer.operations'
import { routerNavigationAction } from '@ngrx/router-store'

const initialState: CreateArticleStateInterface = {
    isSubmitting: false,
    validationErrors: null,
}

const createArticleReducer = createReducer(
    initialState,
    on(createArticleAction, createArticleOperation),
    on(createArticleSuccessAction, createArticleSuccessOperation),
    on(createArticleFailureAction, createArticleFailureOperation),
    on(routerNavigationAction, (): CreateArticleStateInterface => initialState)
)

export function reducers(
    state: CreateArticleStateInterface,
    action: Action
): CreateArticleStateInterface {
    return createArticleReducer(state, action)
}
