import { ArticleStateInterface } from 'src/app/article/types/articleState.interface'
import { ArticleInterface } from 'src/app/shared/types/article.interface'

export const getArticleOperation = (
    state: ArticleStateInterface
): ArticleStateInterface => ({
    ...state,
    isLoading: true,
})

export const getArticleSuccessOperation = (
    state: ArticleStateInterface,
    action: { article: ArticleInterface }
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
