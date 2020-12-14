import { ProfileInterface } from 'src/app/shared/types/profile.interface'

export interface ArticleInterface {
    author: ProfileInterface
    body: string
    title: string
    description: string
    slug: string
    favorited: boolean
    favoritesCount: number
    tagList: string[]
    createdAt: string
    updatedAt: string
}
