import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface'
import { PopularTagsStateInterface } from 'src/app/shared/modules/popularTags/types/popularTagsState.interface'
import { ArticleStateInterface } from 'src/app/article/types/articleState.interface'
import { CreateArticleStateInterface } from 'src/app/createArticle/types/createArticleState.interface'
import { EditArticleStateInterface } from 'src/app/editArticle/types/editArticleState.interface'
import { SettingsStateInterface } from 'src/app/settings/types/settingsState.interface'
import { UserProfileStateInterface } from 'src/app/userProfile/types/userProfileState.interface'
import { CommentsStateInterface } from 'src/app/shared/modules/comments/types/commentsStateInterface'

export interface AppStateInterface {
    auth: AuthStateInterface
    feed: FeedStateInterface
    popularTags: PopularTagsStateInterface
    article: ArticleStateInterface
    createArticle: CreateArticleStateInterface
    editArticle: EditArticleStateInterface
    settings: SettingsStateInterface
    userProfile: UserProfileStateInterface
    comments: CommentsStateInterface
}
