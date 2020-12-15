import { PopularTagsStateInterface } from 'src/app/shared/modules/popularTags/types/popularTagsState.interface'
import { PopularTagType } from 'src/app/shared/types/popularTag.type'

export const getPopularTagsOperation = (
    state: PopularTagsStateInterface
): PopularTagsStateInterface => ({
    ...state,
    isLoading: true,
})

export const getPopularTagsSuccessOperation = (
    state: PopularTagsStateInterface,
    action: { popularTags: PopularTagType[] }
): PopularTagsStateInterface => ({
    ...state,
    isLoading: false,
    data: action.popularTags,
})

export const getPopularTagsFailureOperation = (
    state: PopularTagsStateInterface
): PopularTagsStateInterface => ({
    ...state,
    isLoading: false,
})
