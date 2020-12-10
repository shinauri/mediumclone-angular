import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

export const startOperation = (
    state: AuthStateInterface
): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
})

export const successOperation = (
    state: AuthStateInterface,
    action: { currentUser: CurrentUserInterface }
): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
})

export const failureOperation = (
    state: AuthStateInterface,
    action: { errors: BackendErrorsInterface }
): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
})
