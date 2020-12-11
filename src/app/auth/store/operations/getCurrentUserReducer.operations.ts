import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'

export const getCurrentUserStartOperation = (
    state: AuthStateInterface
): AuthStateInterface => ({
    ...state,
    isLoading: true,
})

export const getCurrentUserSuccessOperation = (
    state: AuthStateInterface,
    action: { currentUser: CurrentUserInterface }
): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
})

export const getCurrentUserFailureOperation = (
    state: AuthStateInterface
): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    currentUser: null,
})
