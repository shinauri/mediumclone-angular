import { CreateArticleStateInterface } from 'src/app/createArticle/types/createArticleState.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

export const createArticleOperation = (
    state: CreateArticleStateInterface
): CreateArticleStateInterface => ({
    ...state,
    isSubmitting: true,
})

export const createArticleSuccessOperation = (
    state: CreateArticleStateInterface
): CreateArticleStateInterface => ({
    ...state,
    isSubmitting: false,
})

export const createArticleFailureOperation = (
    state: CreateArticleStateInterface,
    action: { errors: BackendErrorsInterface }
): CreateArticleStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
})
