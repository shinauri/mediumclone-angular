import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface'
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface'

export const getFeedOperation = (
    state: FeedStateInterface
): FeedStateInterface => ({
    ...state,
    isLoading: true,
})

export const getFeedSuccessOperation = (
    state: FeedStateInterface,
    action: { feed: GetFeedResponseInterface }
): FeedStateInterface => ({
    ...state,
    isLoading: false,
    data: action.feed,
})

export const getFeedFailureOperation = (
    state: FeedStateInterface
): FeedStateInterface => ({
    ...state,
    isLoading: false,
})
