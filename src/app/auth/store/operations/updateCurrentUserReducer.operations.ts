import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { CurrentUserSuccessActionProps } from 'src/app/auth/types/currentUserSeccessActionProps.type'

export const updateCurrentUserSuccessOperation = (
    state: AuthStateInterface,
    action: CurrentUserSuccessActionProps
): AuthStateInterface => ({
    ...state,
    currentUser: action.currentUser,
})
