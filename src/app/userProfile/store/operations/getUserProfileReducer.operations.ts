import { UserProfileStateInterface } from 'src/app/userProfile/types/userProfileState.interface'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'
import { GetUserProfileResponseInterface } from 'src/app/shared/types/getUserProfileResponse.interface'

export const getUserProfileOperation = (
    state: UserProfileStateInterface
): UserProfileStateInterface => ({
    ...state,
    isLoading: true,
    error: null,
})

export const getUserProfileSuccessOperation = (
    state: UserProfileStateInterface,
    action: GetUserProfileResponseInterface
): UserProfileStateInterface => ({
    ...state,
    isLoading: false,
    data: action.profile,
    error: null,
})

export const getUserProfileFailureOperation = (
    state: UserProfileStateInterface,
    action: any
): UserProfileStateInterface => ({
    ...state,
    isLoading: false,
    error: action.errorPage.error,
})
