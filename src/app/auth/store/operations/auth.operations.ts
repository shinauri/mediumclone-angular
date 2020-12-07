import { AuthStateInterface } from 'src/app/auth/types/authState.interface'

export const registerOperation = (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
})
