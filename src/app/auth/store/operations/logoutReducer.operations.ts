import { AuthStateInterface } from 'src/app/auth/types/authState.interface'

export const logoutOperation = (initialState: AuthStateInterface) => {
    return (): AuthStateInterface => ({
        ...initialState,
        isLoggedIn: false,
    })
}
