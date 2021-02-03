import { ProfileInterface } from 'src/app/shared/types/profile.interface'

export interface CommentInterface {
    author: ProfileInterface
    id: number
    body: string
    createdAt: string
    updatedAt: string
}
