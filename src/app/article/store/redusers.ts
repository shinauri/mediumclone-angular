import { Action, createReducer, on } from '@ngrx/store'
import { routerNavigationAction } from '@ngrx/router-store'

import { ArticleStateInterface } from 'src/app/article/types/articleState.interface'
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from 'src/app/article/store/actions/getArticle.action'
import {
    getArticleOperation,
    getArticleFailureOperation,
    getArticleSuccessOperation,
} from 'src/app/article/store/operations/articleReducer.operations'

const initialState: ArticleStateInterface = {
    isLoading: false,
    error: null,
    data: null,
}

const articleReducer = createReducer(
    initialState,
    on(getArticleAction, getArticleOperation),
    on(getArticleSuccessAction, getArticleSuccessOperation),
    on(getArticleFailureAction, getArticleFailureOperation),
    on(routerNavigationAction, (): ArticleStateInterface => initialState)
)

export function reducers(
    state: ArticleStateInterface,
    action: Action
): ArticleStateInterface {
    return articleReducer(state, action)
}
