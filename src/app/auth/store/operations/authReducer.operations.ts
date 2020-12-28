import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { CurrentUserSuccessActionProps } from 'src/app/auth/types/currentUserSeccessActionProps.type'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'

export const authStartOperation = (
    state: AuthStateInterface
): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
})

export const authSuccessOperation = (
    state: AuthStateInterface,
    action: CurrentUserSuccessActionProps
): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
})

export const authFailureOperation = (
    state: AuthStateInterface,
    action: RequestFailureActionProps
): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
})
