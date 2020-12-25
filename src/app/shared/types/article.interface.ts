import { ProfileInterface } from 'src/app/shared/types/profile.interface'

export interface ArticleInterface {
    title: string
    description: string
    body: string
    author: ProfileInterface
    slug: string
    favorited: boolean
    favoritesCount: number
    tagList: string[]
    createdAt: string
    updatedAt: string
}
