import { Action, createReducer, on } from '@ngrx/store'

import { routerNavigationAction } from '@ngrx/router-store'
import { EditArticleStateInterface } from 'src/app/editArticle/types/editArticleState.interface'
import {
    updateArticleAction,
    updateArticleFailureAction,
    updateArticleSuccessAction,
} from 'src/app/editArticle/store/actions/updateArticle.actions'
import {
    updateArticleFailureOperation,
    updateArticleOperation,
    updateArticleSuccessOperation,
} from 'src/app/editArticle/store/operations/updateArticleReducer.operations'
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from 'src/app/editArticle/store/actions/getArticleAction'
import {
    getArticleFailureOperation,
    getArticleOperation,
    getArticleSuccessOperation,
} from 'src/app/editArticle/store/operations/getArticleReducer.operations'

const initialState: EditArticleStateInterface = {
    isLoading: false,
    article: null,
    isSubmitting: false,
    validationErrors: null,
}

const editArticleReducer = createReducer(
    initialState,
    on(updateArticleAction, updateArticleOperation),
    on(updateArticleSuccessAction, updateArticleSuccessOperation),
    on(updateArticleFailureAction, updateArticleFailureOperation),
    on(getArticleAction, getArticleOperation),
    on(getArticleSuccessAction, getArticleSuccessOperation),
    on(getArticleFailureAction, getArticleFailureOperation),
    on(routerNavigationAction, (): EditArticleStateInterface => initialState)
)

export function reducers(
    state: EditArticleStateInterface,
    action: Action
): EditArticleStateInterface {
    return editArticleReducer(state, action)
}
