import { ArticleStateInterface } from 'src/app/article/types/articleState.interface'
import { GetArticleResponseInterface } from 'src/app/shared/types/getArticleResponse.interface'

export const getArticleOperation = (
    state: ArticleStateInterface
): ArticleStateInterface => ({
    ...state,
    isLoading: true,
})

export const getArticleSuccessOperation = (
    state: ArticleStateInterface,
    action: GetArticleResponseInterface
): ArticleStateInterface => ({
    ...state,
    isLoading: false,
    data: action.article,
})

export const getArticleFailureOperation = (
    state: ArticleStateInterface
): ArticleStateInterface => ({
    ...state,
    isLoading: false,
})
