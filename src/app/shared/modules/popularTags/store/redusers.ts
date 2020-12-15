import { Action, createReducer, on } from '@ngrx/store'

import { PopularTagsStateInterface } from 'src/app/shared/modules/popularTags/types/popularTagsState.interface'
import {
    getPopularTagsAction,
    getPopularTagsFailureAction,
    getPopularTagsSuccessAction,
} from 'src/app/shared/modules/popularTags/store/actions/getPopularTags.action'
import {
    getPopularTagsFailureOperation,
    getPopularTagsOperation,
    getPopularTagsSuccessOperation,
} from 'src/app/shared/modules/popularTags/store/operations/getPopularTagsReducer.operations'

const initialState: PopularTagsStateInterface = {
    isLoading: false,
    error: null,
    data: null,
}

const popularTagsReducer = createReducer(
    initialState,
    on(getPopularTagsAction, getPopularTagsOperation),
    on(getPopularTagsSuccessAction, getPopularTagsSuccessOperation),
    on(getPopularTagsFailureAction, getPopularTagsFailureOperation)
)

export function reducers(
    state: PopularTagsStateInterface,
    action: Action
): PopularTagsStateInterface {
    return popularTagsReducer(state, action)
}
