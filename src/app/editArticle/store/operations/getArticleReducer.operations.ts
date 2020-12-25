import { EditArticleStateInterface } from 'src/app/editArticle/types/editArticleState.interface'
import { GetArticleResponseInterface } from 'src/app/shared/types/getArticleResponse.interface'

export const getArticleOperation = (
    state: EditArticleStateInterface
): EditArticleStateInterface => ({
    ...state,
    isLoading: true,
})

export const getArticleSuccessOperation = (
    state: EditArticleStateInterface,
    action: GetArticleResponseInterface
): EditArticleStateInterface => ({
    ...state,
    isLoading: false,
    article: action.article,
})

export const getArticleFailureOperation = (
    state: EditArticleStateInterface
): EditArticleStateInterface => ({
    ...state,
    isLoading: false,
})
