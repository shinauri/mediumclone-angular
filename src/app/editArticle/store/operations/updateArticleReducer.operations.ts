import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { EditArticleStateInterface } from 'src/app/editArticle/types/editArticleState.interface'

export const updateArticleOperation = (
    state: EditArticleStateInterface
): EditArticleStateInterface => ({
    ...state,
    isSubmitting: true,
})

export const updateArticleSuccessOperation = (
    state: EditArticleStateInterface
): EditArticleStateInterface => ({
    ...state,
    isSubmitting: false,
})

export const updateArticleFailureOperation = (
    state: EditArticleStateInterface,
    action: { errors: BackendErrorsInterface }
): EditArticleStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
})
