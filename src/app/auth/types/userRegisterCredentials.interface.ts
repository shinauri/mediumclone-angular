import { UserCredentialsInterface } from 'src/app/auth/types/userCredentials.interface'

export interface UserRegisterCredentialsInterface
    extends UserCredentialsInterface {
    username: string
}
