import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { UserProfileStateInterface } from 'src/app/userProfile/types/userProfileState.interface'

export const userProfileFeatureSelector = createFeatureSelector<
    AppStateInterface,
    UserProfileStateInterface
>('userProfile')

export const isLoadingSelector = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
)

export const errorSelector = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.error
)

export const userProfileSelector = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.data
)
