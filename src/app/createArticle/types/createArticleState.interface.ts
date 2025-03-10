import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

export interface CreateArticleStateInterface {
    isSubmitting: boolean
    validationErrors: BackendErrorsInterface | null
}
