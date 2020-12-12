import { Action, createReducer, on } from '@ngrx/store'

import {
    getFeedAction,
    getFeedFailureAction,
    getFeedSuccessAction,
} from 'src/app/shared/modules/feed/store/actions/getFeed.action'
import {
    getFeedFailureOperation,
    getFeedOperation,
    getFeedSuccessOperation,
} from 'src/app/shared/modules/feed/store/operations/feedReducer.operations'
import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface'

const initialState: FeedStateInterface = {
    isLoading: false,
    error: null,
    data: null,
}

const feedReducer = createReducer(
    initialState,
    on(getFeedAction, getFeedOperation),
    on(getFeedSuccessAction, getFeedSuccessOperation),
    on(getFeedFailureAction, getFeedFailureOperation)
)

export function reducers(
    state: FeedStateInterface,
    action: Action
): FeedStateInterface {
    return feedReducer(state, action)
}
