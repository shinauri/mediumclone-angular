import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

export interface AuthStateInterface {
    isSubmitting: boolean
    isLoggedIn: boolean | null
    isLoading: boolean
    currentUser: CurrentUserInterface | null
    validationErrors: BackendErrorsInterface | null
}
